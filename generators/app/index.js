const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const figlet = require("figlet");
const path = require("path");
const mkdirp = require("mkdirp");
const glob = require("glob");
const voca = require("voca");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    const done = this.async();
    this.log(chalk.cyan.bold("Welcome to the \n Solid React Generator"));

    return this.prompt([
      {
        type: "input",
        name: "appName",
        message: "Please enter your application name :",
        store: true,
        validate: appName => {
          const pass = appName.match(/^[^\d\s!@£$%^&*()+=]+$/);
          if (pass) {
            return true;
          }
          return `${chalk.red(
            'Provide a valid "App name", digits and whitespaces not allowed'
          )}`;
        },
        default: voca.kebabCase(this.appname) // Default to current folder name
      },
      {
        type: "input",
        name: "appVersion",
        message: "version:",
        store: true,
        validate: appVersion => {
          const pass = appVersion.match(/^\d{1,2}\.\d{1,2}\.\d{1,2}$/);
          if (pass) {
            return true;
          }
          return `${chalk.red("Provide a valid version (ex: 0.1.0)")}`;
        },
        default: "0.1.0"
      },
      {
        type: "list",
        name: "isPrivate",
        message: "Is it private?",
        choices: ["false", "true"],
        default: "false"
      }
    ]).then(answers => {
      this.props = answers;
      done();
    });
  }

  writing() {
    const { appName, appVersion, isPrivate } = this.props;
    const pkgJson = {
      name: appName,
      version: appVersion,
      private: isPrivate === "true"
    };

    this.log(chalk.blue(this.templatePath("package.json")));
    const fromTemplateFiles = glob.sync(this.templatePath("./*"), {
      ignore: ["**/node_modules", "**/dist"],
      dot: true
    });
    
    if (path.basename(this.destinationPath()) !== appName) {
      this.log("Creating folder...");
      mkdirp(appName);
      this.destinationRoot(this.destinationPath(appName));
    }

    this.log("Copying app directory...");

    this.fs.copyTpl(fromTemplateFiles, this.destinationRoot(), {
      title: voca.titleCase(appName)
    });
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);

  }

  install() {
    this.log("Installing dependencies...");
    this.npmInstall();
    this.completed = true;
  }

  end() {
    if (this.completed) {
      this.log("Installation complete. Welcome to Solid");
      this.log(
        chalk.bold.blue(
          figlet.textSync("SOLID", {
            font: "3D-ASCII",
            horizontalLayout: "full",
            verticalLayout: "full"
          })
        )
      );
      return;
    }
  }
};
