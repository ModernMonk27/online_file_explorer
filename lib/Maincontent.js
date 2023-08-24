const path = require('path');
const fs = require('fs');
const calculateSizeD = require("./sizecalculate.js");

const BuildMaincontent = (fullStaticPath,pathname) => {

    let bodycontent = "";

    let items;

    try{
        items = fs.readdirSync(fullStaticPath);
        console.log(items);
    }catch(err){
        console.log(`fs.readdirsyn errror : ${err}`);
        return `<div class = "alert alert-danger">server.respond error..</div>`;
    }
    

    items.forEach(item => {

        let itemdetails = {};

        let itemfullpath = path.join(fullStaticPath, item);

        try{
            itemdetails.stats = fs.lstatSync(itemfullpath);
            console.log(itemdetails.stats);
        }catch(err){
            console.log(`lstat error ${err}`);
        }

        if(itemdetails.stats.isDirectory()){
            itemdetails.icon = `<ion-icon name="folder"></ion-icon>`;
            [itemdetails.sizeit, itemdetails.sizebyt] = calculateSizeD(itemfullpath);
        }else if(itemdetails.stats.isFile()){
            itemdetails.icon = `<ion-icon name="document"></ion-icon>`;
            // [itemdetails.sizeit, itemdetails.sizebyt] = calculateSizeF();
        };

        const link = path.join(pathname, item);

        bodycontent += `<tr>
        <td>${itemdetails.icon}<a href="${link}">${item}</a></td>
        <td>${itemdetails.sizeit}</td>
        <td>2022</td>
</tr>`;

    });

    return bodycontent;

};
 
module.exports = BuildMaincontent;