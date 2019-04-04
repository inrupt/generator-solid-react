import React, {Component} from 'react';
import { namedNode } from '@rdfjs/data-model';
import data from '@solid/query-ldflex';
import ProfileShape from '@contexts/profile-shape.json';
import { UpdateContext } from '@inrupt/solid-react-components';
import { entries } from '@utils';

import { FormUi } from './form.component';


let beforeContext = {};

/**
 * We are using ldflex to fetch profile data from a solid pod.
 * ldflex libary is using json-LD for this reason you will see async calls
 * when we want to get a field value, why ? becuase they are expanded the data
 * this means the result will have a better format to read on Javascript.
 * for more information please go to: https://github.com/solid/query-ldflex
 */

export class ProfileForm extends Component {
  constructor (props) {
    super (props);

    this.state = {
      isLoading: false,
      formFields: [],
      newLinkNodes: [],
      updatedFields: {}
    };
  }
  async componentDidMount () {
    await this.fetchProfile ();
  }

  async componentDidUpdate(prevProps: Readonly<P>): void {
    if (prevProps.webId !== this.props.webId) {
      await this.fetchProfile();
    }

    if (this.context.timestamp !== beforeContext.timestamp) {
      await this.fetchProfile();

      beforeContext = this.context;
    }
  }

  setDefaultData = () => {
    this.setState ({formFields: [...this.state.formFields], updatedFields: {}});
  };

  onCancel = () => {
    this.props.onCancel ();
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
          icon: dataset.icon
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
      /**
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

      /**
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
        isLoading: false,
      });
      this.props.exitEditMode();
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
   * Fetch Profile Shape data
   */
  fetchProfile = async () => {
    try {
      if (this.props.webId) {
        /**
         * We fetch profile shape from context/profile-shape.json
         * profile-shape.json has all the fields that we want to print
         * we are using icons on each field to mapping with the UI design.
         */
        const { profile } = ProfileShape;
        // We are fetching profile card document
        const user = data[this.props.webId];

        /**
         * We run each shapes on profile-shape.json and access to each
         * field value, in case that node field value point to another
         * node blank we acces using multidimensional array if not we
         * access by a basic array.
         */
        const formFields = await Promise.all(
          profile.map(async field => {
            return {
              ...field,
              ...(await this.getNodeValue(user, field)),
            };
          })
        );
        this.setState({ profile, formFields });
      }
    } catch (error) {
      this.props.toastManager.add (['Error', error.message], {
        appearance: 'error',
      });
    }
  };
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
    let node;
    let nodeParentUri;
    // If node is a pointer to another node will get the value
    if (field.nodeBlank) {
      let parentNode = await user[field.property];
      // If the node link doesn't exist will create a new one.
      nodeParentUri =
        (parentNode && parentNode.value) ||
        (await this.createNewLinkNode (field.property));

      node = await user[field.property][field.nodeBlank];
    } else {
      node = await user[field.property];
    }

    return {
      action: 'update',
      value: (node && node.value) || '',
      nodeParentUri,
    };
  };
  render () {
    const { state: { formFields, updatedFields }, props: { webId, mode }, onInputChange, onCancel, onSubmit } = this;

    return <FormUi {...{ formFields, mode, updatedFields, onInputChange, onCancel, onSubmit, webId }} />;
  }
}

ProfileForm.contextType = UpdateContext;

export default ProfileForm;
