import React, {Component} from 'react';
import {namedNode} from '@rdfjs/data-model';
import {withWebId} from '@inrupt/solid-react-components';
import {withToastManager} from 'react-toast-notifications';
import data from '@solid/query-ldflex';
import ProfileShape from '@contexts/profile-shape.json';
import ProfileShex from '@contexts/profile-shex.json';
import { entries } from '@utils';
import ProfileComponent from './profile.component';

const defaulProfilePhoto = '/img/icon/empty-profile.svg';

/**
 * We are using ldflex to fetch profile data from a solid pod.
 * ldflex libary is using json-LD for this reason you will see async calls
 * when we want to get a field value, why ? becuase they are expanded the data
 * this means the result will have a better format to read on Javascript.
 * for more information please go to: https://github.com/solid/query-ldflex
 */

export class Profile extends Component {
  constructor (props) {
    super (props);

    this.state = {
      formMode: true,
      isLoading: false,
      photo: defaulProfilePhoto,
      formFields: [],
      newLinkNodes: [],
      updatedFields: {}
    };
  }
  async componentDidMount () {
    this.setState ({isLoading: true});
    await this.fetchPhoto ();
    await this.fetchProfile ();
    this.setState ({isLoading: false});
  }

  changeFormMode = () => {
    this.setState ({formMode: !this.state.formMode, updatedFields: {}});
  };
  setDefaultData = () => {
    this.setState ({formFields: [...this.state.formFields]});
  };
  onCancel = () => {
    this.changeFormMode ();
    this.setDefaultData ();
  };

  /**
   * All input changes values will add it into the updatedFields state.
   * This object will be run like an iterator, later on. We are using a flag to know
   * when to update or delete fields into PODS.
   */
  onInputChange = (e: Event) => {
    const { target: input, target: { dataset } } = e;
    const name = input.name;
    const value = input.value;
    const key = input.id;
    let action = 'update';

    if (value === '') {
      action = this.state.formFields.find (
        field => field.property === name && field.value !== ''
      )
        ? 'delete'
        : action;
    }

    this.setState ({ updatedFields: {
      ...this.state.updatedFields,
      [name]: {
        value,
        action,
        property: name,
        nodeParentUri: dataset.nodeparenturi || null,
        nodeBlank: dataset.nodeblank || null,
        label: dataset.label,
        icon: dataset.icon,
        key
      }
    }});
  };
  /**
   * onSubmit will send all the updated fields to POD
   * fields that was not updated will be not send it.
   */
  onSubmit = async (e: Event, successMessage: String) => {
    try {
      e.preventDefault ();
      let node;
      let updatedFields = [];

      this.setState ({isLoading: true});
      /*
       * Solid server has an issue on concurrent updates,
       * so to fix this we have to await one change, and only when it is done,
       * fire the next field update.
       * more info about the issue: https://github.com/solid/node-solid-server/issues/1106
      */

      for await (const [key, field] of entries(this.state.updatedFields)) {
          node = data.user[key];

          if (field.nodeBlank) {
            node = data[field.nodeParentUri][field.nodeBlank];
          }

          if (field.action === 'update') {
            await node.set(field.value);
          } else {
            await node.delete();
          }

          updatedFields = [
            ...updatedFields,
            {
              ...field
            },
        ];
      }

      /*
       * We need to update formFields with new fields states
       * we are using these states to know if field need to delete, update or create
       * on POD and know if fields were updated by the user on the profile.
      */
      const updatedFormField = this.state.formFields.map (
        field => updatedFields.find (f => f.label === field.label) || field
      );

      this.setState ({
        formFields: updatedFormField,
        updatedFields: {},
        formMode: true,
        isLoading: false,
      });

      this.props.toastManager.add (['', successMessage], {
        appearance: 'success',
      });
    } catch (error) {
      this.props.toastManager.add (['Error', error.message], {
        appearance: 'error',
      });
      this.setState ({isLoading: false});
    }
  };
  /**
   * Fetch profile photo from card
   */
  fetchPhoto = async () => {
    try {
      // We are fetching profile card document
      const user = data[this.props.webId];
      // We access to document node using a node name
      let image = await user.image;
      let hasImage = true;
      // If image is not present on card we try with hasPhoto
      if (!image) {
        /**
         * hasPhoto is a new context that ldflex doesn't having
         * we need to add it manually.
         * if you want to know more about context please go to:
         * https://github.com/digitalbazaar/jsonld.js
         */
        image = await user.vcard_hasPhoto;

        hasImage = false;
      }

      this.setState ({
        photo: (image && image.value) || defaulProfilePhoto,
        hasImage,
      });
    } catch (error) {
      this.props.toastManager.add (['Error', error.message], {
        appearance: 'error',
      });
    }
  };
  /**
   * updatedPhoto will update the photo url on vcard file
   * this function will check if user has image or hasPhoto node if not
   * will just update it, the idea is use image instead of hasPhoto
   * @params{String} uri photo url
   */
  updatePhoto = async (uri: String, message: String) => {
    try {
      const {user} = data;
      this.state.hasImage
        ? await user.image.set (uri)
        : await user.image.add (uri);

      this.props.toastManager.add (['', message], {
        appearance: 'success',
      });
    } catch (error) {
      this.props.toastManager.add (['Error', error.message], {
        appearance: 'error',
      });
    }
  };
  /**
   * Fetch Profile Shape data
   */
  fetchProfile = async () => {
    try {
      const user = data[this.props.webId];
      const shapes = ProfileShex.shapes;
      //search for the ID of the shape, "UserProfile", which would be the whole shape URL + #foo
      const profile = ProfileShex.shapes.find(shape => shape.id === 'http://example.com#UserProfile');
      let expressions = [[]];

      profile.expression.expressions.forEach(async (exp) => {
        if (exp.type !== 'OneOf') {
          if (typeof exp.valueExpr === 'string') {
            //Get shape used here
            let shape = shapes.find(shape => shape.id === exp.valueExpr);
            let newExprs = [];

            shape.expression.expressions.forEach((shapeExp) => {
              newExprs.push(shapeExp);
            });

            expressions.push(newExprs);
          } else {
            expressions[0].push(exp);
          }
        }
      });

      //Create a two dimensional array, to logically group different shapes in the form
      if(profile.type === 'Shape' && profile.expression.type === 'EachOf') {
        let formFields = await expressions.reduce(async (output, fields) => {
          let fieldValues = await Promise.all(
            fields.map(async field => {
              return {
                ...(await this.getNodeValue(user, field))
              }
            })
          );
          return output.concat(fieldValues);
          //return [...output, fieldValues];
        }, []);

        //console.log(formFields);
        this.setState({profile, formFields});
      }
    } catch (error) {
      console.log(error);
       this.props.toastManager.add (['Error', error.message], {
        appearance: 'error',
      });
    }
  };

  /**
   * Nest function - takes the profile shape and walks through expressions formatting the data into an array
   * if the expression is a link to another shape, then call it again with the new expression
   */
  formatNestedShape = (expression, expressions, shapes) => {
    try {
      if (!expression || !expression.valueExpr || expression.type === 'OneOf') { return; }

      // Check expression valueExpr for object or string
      if (typeof expression.valueExpr === 'string') {
        const newShape = shapes.find(shape => shape.id === expression.valueExpr);
        if(newShape.type === 'Shape') {
          newShape.expression.expressions.forEach((exp) => {
            exp.referenceNode = true;
            this.formatNestedShape(exp, expressions, shapes);
          });
        }
      } else {
        expressions.push(expression);
        return;
      }
    } catch(err) {
      console.log(err);
    }
  }


  /**
   * Create a new node link on vcard document.
   * @params{String} property
   * Property param will be the name of node
   */
  createNewLinkNode = async (property: String) => {
    const id = `#id${Date.parse (new Date ())}`;
    await data.user[property].add (namedNode (id));
    // @TODO: add from ldflex should return this value instead of create by our self
    return `${this.props.webId.split ('#')[0]}${id}`;
  };
  /**
   * getNodeValue will return node value and uri in case that node points to nodeBlank
   * nodeParentUri is a workaround to fix blank node update fields on ldflex
   * @params{Object} user
   * @params{Object} field
   */
  getNodeValue = async (user: Object, field: Object) => {
    if(field.type === 'OneOf') { return; }
    const annotations = field.annotations;
    let newField = {};
    if (annotations) {
      annotations.map(note => {
        let key = note.predicate.substr(note.predicate.indexOf('#') + 1);
        newField[key] = note.object.value;
      });
    }
    newField.property = field.predicate;

    let node;
    let nodeParentUri;
    // If node is a pointer to another node will get the value
    if (field.referenceNode) {
      let parentNode = await user[newField.property];
      // If the node link doesn't exist will create a new one.
      nodeParentUri =
        (parentNode && parentNode.value) ||
        (await this.createNewLinkNode (newField.property));

      node = await user[newField.property][newField.nodeBlank];
    } else {
      node = await user[newField.property];
    }


    return {
      ...newField,
      action: 'update',
      value: (node && node.value) || '',
      nodeParentUri,
    };
  };
  render () {
    return (
      <ProfileComponent
        webId={this.props.webId}
        formFields={this.state.formFields}
        updatedFields={this.state.updatedFields}
        formMode={this.state.formMode}
        onInputChange={this.onInputChange}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        updatePhoto={this.updatePhoto}
        photo={this.state.photo}
        changeFormMode={this.changeFormMode}
        isLoading={this.state.isLoading}
        toastManager={this.props.toastManager}
      />
    );
  }
}

export default withWebId (withToastManager (Profile));

