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

        itemdetails.name = item;

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

        // create time details

        itemdetails.timestamp = parseInt(itemdetails.stats.mtimeMs);
        console.log(itemdetails.timestamp);

        // convert time to date 

        itemdetails.date = new Date(itemdetails.timestamp);

        itemdetails.date = itemdetails.date.toLocaleString();
        console.log(itemdetails.date);

        const link = path.join(pathname, item);

        bodycontent += `<tr data-name = "${itemdetails.name}" data-size = "${itemdetails.sizeit}" data-time = "${itemdetails.timestamp}">
        <td>${itemdetails.icon}<a href="${link}">${item}</a></td>
        <td>${itemdetails.sizeit}</td>
        <td>${itemdetails.date}</td>
</tr>`;

    });

    return bodycontent;

};
 
module.exports = BuildMaincontent;