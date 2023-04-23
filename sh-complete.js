const prompt = require('prompt');
const inflection = require('inflection');
const fs = require('fs');

prompt.start();

prompt.message = null;

var schema = {
  properties: {
    model: {
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Name must be only letters, spaces, or dashes',
      required: true,
      description: 'Please enter the model name eg User'
    },
    model_path: {
      description: 'please enter path eg admin/users',
      required: true
    },
      mfields: {
          description: 'please enter model fields separate by coma eg name,description',
          required: true
      },
      tfields: {
          description: 'please enter Table fields separate by coma eg id,name,description',
          required: true
      }
  }
};
prompt.start();
// const currentDir = process.cwd() + '/src/views/';
let model_name = ''
let model_path = ''
let fname = ''
let dir = ''
let fullpath = ''
let uname = ''
let models = ''
let uppercasep = ''
let mfields = ''
let tfields = ''
prompt.get(schema, function (err, result) {
   model_name = inflection.singularize(result.model.toLowerCase())
   model_path = result.model_path.toLowerCase()
   uname = model_name.charAt(0).toUpperCase() + model_name.slice(1)
   models = inflection.pluralize(model_name)
    uppercasep = models.charAt(0).toUpperCase() + models.slice(1)
   dir = 'src/views/' + model_path + '/'
   const nameP = models.charAt(0).toUpperCase() + models.slice(1)
   fname =  nameP + '.vue'
   fullpath = dir + '/' + fname
    //model fields
    mfields =  result.mfields.toLowerCase().toString()
    mfields = "'"+ mfields.replace(/,/g, "','").replace(/ /g,'') + "'";
    //table fields
    tfields =  result.tfields.toLowerCase().toString()
    tfields = "'"+ tfields.replace(/,/g, "','").replace(/ /g,'') + "'";
    createMainFile()
    createStoreFile()
    createViewFile()
    createRoutesFile()
});

function createMainFile() {
    //create main with table file and populate with data
    fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) throw err;
        //create main file and populate with data
        fs.readFile('template/modal_model.txt', 'utf8', (err, data) => {
          if (err) throw err;
          let newData = data.replace(/model/g, model_name).
               replace(/pname/g,models ).
               replace(/tfields/g,tfields ).
               replace(/mfields/g,mfields ).
               replace(/uppercasep/g,uppercasep ).
                replace(/uname/g,uname );
          fs.writeFile(fullpath, newData, 'utf8', (err) => {
            if (err) throw err;
          });
        });
    });
}
function createStoreFile(){
    //create store file
    let storePath = dir + model_name
    let storeFullPath = storePath + '/Store.vue'
    fs.mkdir(storePath, { recursive: true }, (err) => {
        if (err) throw err;
        fs.readFile('template/store.txt', 'utf8', (err, data) => {
            if (err) throw err;
            let newData = data.replace(/model/g, model_name).
            replace(/pname/g,models ).
            replace(/tfields/g,tfields ).
            replace(/mfields/g,mfields ).
            replace(/uname/g,uname );
            fs.writeFile(storeFullPath, newData, 'utf8', (err) => {
                if (err) throw err;
            });
        });
    });
}
function createViewFile() {
    //create view file
    let viewPath = dir + model_name
    let viewFullPath = viewPath + '/View.vue'
    fs.mkdir(viewPath, { recursive: true }, (err) => {
        if (err) throw err;
        fs.readFile('template/view.txt', 'utf8', (err, data) => {
            if (err) throw err;
            let newData = data.replace(/model/g, model_name).
            replace(/pname/g,models ).
            replace(/tfields/g,tfields ).
            replace(/mfields/g,mfields ).
            replace(/uname/g,uname );
            fs.writeFile(viewFullPath, newData, 'utf8', (err) => {
                if (err) throw err;
            });
        });
    });
}

function createRoutesFile() {
    //create view file
    let routesPath = 'src/router/' + models
    let routesFullPath = routesPath + '/'+ models + '.js'
    fs.mkdir(routesPath, { recursive: true }, (err) => {
        if (err) throw err;
        fs.readFile('template/router.txt', 'utf8', (err, data) => {
            if (err) throw err;
            let newData = data.replace(/model/g, model_name).
            replace(/pname/g,models ).
            replace(/tfields/g,tfields ).
            replace(/uppercasep/g,uppercasep ).
            replace(/mfields/g,mfields ).
            replace(/uname/g,uname );
            fs.writeFile(routesFullPath, newData, 'utf8', (err) => {
                if (err) throw err;
                console.log(`happy sh-coding`);
            });
        });
    });
}
