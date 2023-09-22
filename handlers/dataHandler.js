const fs = require('fs');
const path = require('path')

// implement readData function
const readDataFromFile = (filePath) => {
    const data = fs.readFileSync(path.join(__dirname,filePath),err=>{if(err){
        throw err
}
return JSON.parse(data);

})
};

// implement writeData function
// const writeDataToFile = (filePath, data) => {
// };
const writeDataToFile = (filePath, data) => {
    // console.log(path.join(__dirname, filePath))
    fs.writeFileSync(path.join(__dirname, filePath), JSON.stringify(data,null,2), err => {
        if (err) {
        throw err;
        }
        console.log(data);
        // file written successfully
        // res.json(data);
    });
};

module.exports = {
    readDataFromFile,
    writeDataToFile
};
