# Website Portfolio

Version history for my website as I learn and add tools to my tool chain

## Tools

Currently using the following tools to write code & build website:

#### Base

  * [Sublime Text 3](http://sublimetext.com): Text editor of choice
  * [Node.js](http://nodejs.org): Tool chain backbone
  * [Bower](http://bower.io): Download and update packages
  * [Grunt](http://gruntjs.com/): Build files
  * [Foundation](http://foundation.zurb.com): Responsive framework
  * [Git](https://github.com): File versioning and bash cmd

#### Add-ons - Development

  * [Foundation](http://foundation.zurb.com) and all its dependencies (Bower)
    * jQuery
    * jQuery Cookie
    * Modernizr
  * [iScroll](http://iscrolljs.com/) - For parallax, and scrolling options on mobile
  * Sublime Text 3 Plugins - Using [Package Control](https://sublime.wbond.net) within Sublime unless otherwise specified

    |     Name     |                    Description                    |
    |--------------|---------------------------------------------------|
    [AdvancedNewFile](https://sublime.wbond.net/packages/AdvancedNewFile) | File & Folder creation inside ST
    [Alignment](https://sublime.wbond.net/packages/Alignment) | Aligning selections to the same indent
    [BracketHighlighter](https://sublime.wbond.net/packages/BracketHighlighter) | Highlights brackets when inside and shows them in gutter
    [Clickable URLs](https://sublime.wbond.net/packages/Clickable%20URLs) | Allows opening URLs from within ST
    [ColorPicker](https://sublime.wbond.net/packages/ColorPicker) | Choose colours from a popup right at colour codes
    [CSScomb JS](https://sublime.wbond.net/packages/CSScomb) | Aplhabetically sort and beautify SCSS
    [Default File Type](https://sublime.wbond.net/packages/Default%20File%20Type) | File creation with syntax set
    [DocBlockr](https://sublime.wbond.net/packages/DocBlockr) | Docmentation made easy & smart for all kinds of syntaxes
    [Emmet](https://sublime.wbond.net/packages/Emmet) | Create entire HTML files in a few lines using auto-completions &
    [Emmet Css Snippets](https://sublime.wbond.net/packages/Emmet%20Css%20Snippets) | Emmet for CSS
    [Gist](https://sublime.wbond.net/packages/Gist) | Create Git Gists directly from ST
    [Git](https://sublime.wbond.net/packages/Git) | File/Folder syncing with Git from ST
    [Modific](https://sublime.wbond.net/packages/Modific) - Show Git sync status in the gutter
    [SCSS](https://sublime.wbond.net/packages/SCSS) | SCSS Syntax for ST
    [SFTP](https://sublime.wbond.net/packages/SFTP) | SFTP/FTP abilities within ST + work with remote files
    [SideBarEnhancements](https://sublime.wbond.net/packages/SideBarEnhancements) | Enchances sidebar with multiple file/folder options
    [SublimeLinter](https://sublime.wbond.net/packages/SublimeLinter) | Linting framework for ST
    [SublimeLinter-contrib-scss-lint](https://sublime.wbond.net/packages/SublimeLinter-contrib-scss-lint) | SCSS linting connector
    [SublimeLinter-jshint](https://sublime.wbond.net/packages/SublimeLinter-jshint) | JS linting connector
    [Theme - Flatland](https://sublime.wbond.net/packages/Theme%20-%20Flatland) | Current theme in use
    [Theme - Spacegray](https://sublime.wbond.net/packages/Theme%20-%20Spacegray) | The other theme I switch to every now and then

#### Add-ons - Tool Chain

    |     Name     |                    Description                    |
    |--------------|---------------------------------------------------|
    [Grunt Tasks](https://www.npmjs.org/package/load-grunt-tasks) | Shortens Gruntfile by loading tasks directly from Grunt saved in `package.json`
    [Grunt Watch](https://github.com/gruntjs/grunt-contrib-watch) | Watches for changes to files then builds
    [Grunt Newer](https://github.com/tschaub/grunt-newer) | Builds only files that are changed
    [Grunt Sass](https://github.com/sindresorhus/grunt-sass) | Sass/Scss preprocessor
    [Grunt Autoprefixer](https://github.com/ai/autoprefixer) | Adds browser prefixes to Scss output
    [Grunt Concat](https://github.com/gruntjs/grunt-contrib-concat) | Concats all JS libs
    [Grunt Uglify](https://github.com/gruntjs/grunt-contrib-uglify) | Uglifies the above
    [Grunt Imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) | Compresses images (jpg, png, gif only)
    [Grunt Clean](https://github.com/gruntjs/grunt-contrib-clean) | Cleans any folder on-command
    [Grunt Copy](https://github.com/gruntjs/grunt-contrib-copy) |  Copies files to/from folders on-command
    [Grunt Notify](https://github.com/dylang/grunt-notify) | Combined with Snarl for desktop notifications of errors and/or build complete
    [Time Grunt](https://github.com/sindresorhus/time-grunt) | Displays time taken by each task in grunt build cycle


## Directory Strucutre (excluding auto-created folders/files i.e. bower_components, .bowerrc etc.)

  * `assets/` - All development/pre-final processed files go inside their respective folders here
    * `css`
    * `js`
    * `img`
  * `public`
    * `build` - All final & processed files go here
  * `scss/` - Scss files go here
  * `tmp` - Any tmp files before final processing go here for holding, cleaned later
  * `.scss-lint.yml` - Config file for Sublimelint 3 Scss linter
