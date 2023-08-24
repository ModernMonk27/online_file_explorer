const path = require("path");

const BuildbreadCrumb = pathname =>{

    let pathchunks = pathname.split('/').filter(element => element !== "");
    console.log(`pathchunks are ${pathchunks}`);

    let BreadCrumb = `<li class="breadcrumb-item"><a href="#">Home</a></li>`;

    let link = "/";
    console.log(`pathchunks are ${pathchunks}`);

    pathchunks.forEach((item, index) => {
        link = path.join(link, item);
        if (index !== pathchunks.lenght - 1){
            BreadCrumb += `<li class="breadcrumb-item"><a href="${link}">${item}</a></li>`;
        }
        else{
            BreadCrumb += `<li class="breadcrumb-item active" aria-current="page">${item}</li>`;
        }
    });

    return BreadCrumb;

    
}

module.exports = BuildbreadCrumb;