const Generator = require('yeoman-generator');
const chalk = require('chalk');
const figlet = require('figlet');
const path = require('path');
const mkdirp = require('mkdirp');
const voca = require('voca');

const fileList = [
    // ROOT FILES
    { src: 'README.md' },
    { src: 'package.json' },
    // SRC ROOT FILES
    { src: 'src/App.js' },
    { src: 'src/App.styled.js' },
    { src: 'src/App.test.js' },
    { src: 'src/i18n.js' },
    { src: 'src/index.css' },
    { src: 'src/index.js' },
    { src: 'src/serviceWorker.js' },
    // CONFIG FILES
    { src: 'config/**', dest: 'config' },
    { src: 'scripts/**', dest: 'scripts' },
    // PUBLIC FILES
    { src: 'public/**', dest: 'public' },
    // TEST FILES
    { src: 'test/**', dest: 'test' },
    // COMPONENTS
    { src: 'src/components/**', dest: 'src/components' },
    // CONSTANTS
    { src: 'src/constants/**', dest: 'src/constants' },
    // CONTEXTS
    { src: 'src/contexts/**', dest: 'src/contexts' },
    // HIGHER ORDER COMPONENTS
    { src: 'src/hocs/**', dest: 'src/hocs' },
    // HOOKS
    { src: 'src/hooks/**', dest: 'src/hooks' },
    // LAYOUTS
    { src: 'src/layouts/**', dest: 'src/layouts' },
    // SERVICES
    { src: 'src/services/**', dest: 'src/services' },
    // UTILS
    { src: 'src/utils/**', dest: 'src/utils' },
    // DEFAULT CONTAINERS
    { src: 'src/containers/Login/**', dest: 'src/containers/Login' },
    {
        src: 'src/containers/PageNotFound/**',
        dest: 'src/containers/PageNotFound',
    },
    { src: 'src/containers/Register/**', dest: 'src/containers/Register' },
    { src: 'src/containers/Welcome/**', dest: 'src/containers/Welcome' },
];

module.exports = class extends Generator {
    prompting() {
        const done = this.async();
        this.log(chalk.cyan.bold('Welcome to the \n Solid React Generator'));

        return this.prompt([
            {
                type: 'input',
                name: 'appName',
                message: 'Please enter your application name :',
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
                default: voca.kebabCase(this.appname), // Default to current folder name
            },
            {
                type: 'confirm',
                name: 'appInstalled',
                message:
                    'Would you like a sample application installed? \nNOTE: First time users may benefit from a full sample application as a living example of Solid development:',
            },
            {
                type: 'input',
                name: 'appVersion',
                message: 'Initial version:',
                store: true,
                validate: appVersion => {
                    const pass = appVersion.match(
                        /^\d{1,2}\.\d{1,2}\.\d{1,2}$/
                    );
                    if (pass) {
                        return true;
                    }
                    return `${chalk.red(
                        'Provide a valid version (ex: 0.1.0)'
                    )}`;
                },
                default: '0.1.0',
            },
            {
                type: 'list',
                name: 'isPrivate',
                message: 'Is this application private?',
                choices: ['false', 'true'],
                default: 'false',
            },
        ]).then(answers => {
            this.props = answers;
            done();
        });
    }

    writing() {
        const { appName, appVersion, isPrivate, appInstalled } = this.props;
        const pkgJson = {
            name: appName,
            version: appVersion,
            private: isPrivate === 'true',
        };

        // FINALIZE FILES TO INSTALL
        this.log('Processing Configuration...');
        if (appInstalled) {
            fileList.push(
                { src: 'src/containers/index.js' },
                { src: 'src/routes.js' },
                {
                    src: 'src/constants/navigation.js',
                    dest: 'src/constants/navigation.js',
                },
                {
                    src: 'src/containers/Profile/**',
                    dest: 'src/containers/Profile',
                },
                {
                    src: 'src/containers/TicTacToe/**',
                    dest: 'src/containers/TicTacToe',
                },
                { src: '.env' }
            );
        } else {
            fileList.push(
                { src: 'src/_routes.lite.js', dest: 'src/routes.js' },
                {
                    src: 'src/containers/_index.lite.js',
                    dest: 'src/containers/index.js',
                },
                {
                    src: 'src/constants/_navigation.lite.js',
                    dest: 'src/constants/navigation.js',
                },
                { src: '.env.lite', dest: '.env' },
                {
                    src: 'src/components/AuthNavBar/_auth-nav-bar.lite.js',
                    dest: 'src/components/AuthNavBar/auth-nav-bar.component.js',
                }
            );
        }

        this.log(chalk.blue(this.templatePath('package.json')));

        if (path.basename(this.destinationPath()) !== appName) {
            this.log('Creating folder...');
            mkdirp(appName);
            this.destinationRoot(this.destinationPath(appName));
        }

        this.log('Copying app directory...');

        // EXTEND PACKAGE.JSON WITH USER PROMPTS
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

        this.log(this.templatePath());

        // WRITE NEW FILES BASED ON USER PROMPTS
        fileList.forEach(newFile => {
            return this.fs.copyTpl(
                this.templatePath(newFile.src),
                this.destinationPath(newFile.dest || newFile.src),
                { title: voca.titleCase(appName) }
            );
        });
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
                    figlet.textSync('SOLID', {
                        font: '3D-ASCII',
                        horizontalLayout: 'full',
                        verticalLayout: 'full',
                    })
                )
            );
        }
    }
};
