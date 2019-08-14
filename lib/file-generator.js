const fs = require('fs')

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);
  const CURR_DIR = process.cwd()

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);
    // NPM recursively goes through nested directories and renames .gitignore files to .npmignore
    if (file === '.npmignore') file = '.gitignore';

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
}

module.exports ={
    createDirectoryContents: createDirectoryContents
}
