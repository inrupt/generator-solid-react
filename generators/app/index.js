const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const figlet = require('figlet');
const path = require('path');
const mkdirp = require('mkdirp');
const glob = require('glob');
const voca = require('voca');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    const done = this.async();
    this.log(yosay(chalk.cyan.bold('Welcome to the \n Solid React Generator')));

    return this.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'Please enter your application name :',
        store: true,
        validate: name => {
          const pass = name.match(/^[^\d\s!@£$%^&*()+=]+$/);
          if (pass) {
            return true;
          }
          return `${chalk.red('Provide a valid "App name", digits and whitespaces not allowed')}`;
        },
        default: voca.kebabCase(this.appname) // Default to current folder name
      }
    ]).then(answers => {
      this.props = answers;
      done();
    });
  }

  writing() {

    this.log(chalk.blue(JSON.stringify(this.props.appName)));
    this.log(chalk.cyan(JSON.stringify(this.destinationPath())));
    this.log(chalk.cyan(JSON.stringify(this.templatePath("./*"))));


    const pkgJson = {}

    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    const fromTemplateFiles = glob.sync(this.templatePath('./*'), {
      ignore: ['**/node_modules', '**/dist'],
      dot: true
    });
    this.log('Copying app directory...');
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log('Creating folder...');
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }

    this.log(this.templatePath());
    this.log(this.destinationPath());

    this.fs.copyTpl(
      fromTemplateFiles,
      this.destinationRoot(),
      {
        name: this.props.name
      }
    );
  }

  install() {
    this.log('Installing dependencies...');
    this.npmInstall();
    this.completed = true;
  }

  end() {
    if (this.completed) {
      this.log('Installation complete. Welcome to Solid');
      this.log(
        chalk.bold.blue(
          figlet.textSync('- Solid -', {
            font: '3D-ASCII',
            horizontalLayout: 'full',
            verticalLayout: 'full'
          })
        )
      );
      return;
    }
  }
};
