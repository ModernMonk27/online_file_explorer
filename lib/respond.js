//require node modules
const url = require('url');
const path = require('path');
const fs = require('fs');

//file import
const BuildbreadCrumb = require('./Breadcrumb.js');
const BuildMaincontent = require('./Maincontent.js');
//static base bath: location of your static folder
const staticBasePath = path.join(__dirname, '..', 'static');


//respond to a request
//Following is function passed to createServer used to creater the server
const respond = (request, response) => {

    //before working with the pathname, you need to decode it
    let pathname = url.parse(request.url, true).pathname;

    //if favicon.ico stop
    if(pathname === '/favicon.ico'){
        return false;
    }

    pathname = decodeURIComponent(pathname);


    //get the corresponding full static path located in the static folder
    const fullStaticPath = path.join(staticBasePath, pathname);

    //Can we find something in fullStaticPath?

    //no: send '404: File Not Found!'
    if(!fs.existsSync(fullStaticPath)){
        console.log(`${fullStaticPath} does not exist`);
        response.write('404: File not found!');
        response.end();
        return false;
    }

    //We found something
    //is it a file or directory?
    let stats;
    try{
        stats = fs.lstatSync(fullStaticPath);
    }catch(err){
        console.log(`lstatSync Error: ${err}`);
    }


    //It is a directory:
    if(stats.isDirectory()){
        //get content from the template index.html
        let data = fs.readFileSync(path.join(staticBasePath, 'project_files/index.html'), 'utf-8');

        //build the page title
        console.log(pathname);
        let pathElements = pathname.split('/').reverse();
        pathElements = pathElements.filter(element => element !== '');
        let folderName = pathElements[0];
        if(folderName === undefined){
            folderName = 'Home';
        }
        console.log(folderName);

        const navbarmine = BuildbreadCrumb(pathname);

        const maincontent = BuildMaincontent(fullStaticPath,pathname);

     
        //fill the template data with: the page title, breadcrumb and table rows (main_content)
        data = data.replace('Bootstrap demo', folderName);
        data = data.replace('pathname', navbarmine);
        data = data.replace("maincontent",maincontent);

        //print data to the webpage
        response.statusCode = 200;
        response.write(data);
        return response.end();
    }

    //Is is not a directory but not a file either
    //send: 401: Access denied!
    if(!stats.isFile()){
        response.statusCode = 401;
        response.write('401: Access denied!');
        console.log('not a file!');
        return response.end();
    }

    
}
module.exports = respond;
