
const { execSync} = require("child_process");

const calculateSizeD = folderpath =>{

    const pakkapath = folderpath.replace(/\s/g, '\ ');
    console.log(pakkapath);

    const sizefile = execSync(` dir /s "${pakkapath}"`).toString();

    

    const logic = sizefile.split(" ");

    const logic_second = logic.reverse();

    const Filtered_logic = logic_second.filter(items => items !== "");

    const final_size = Filtered_logic[6];



    console.log(final_size);
    console.log(sizefile);

    
    // console.log(sizefile.substring(2430,2525));

    // const finalsize = sizefile.substring(2430,2525);

    // const splited_size = finalsize.split(/\s+/);
    // console.log(splited_size[3]);

    // const final_splite = splited_size[3];



    return [`${final_size}Bytes`, "1000*1000"];

};

module.exports = calculateSizeD;