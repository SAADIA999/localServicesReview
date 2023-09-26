const fs = require('fs');
const path = require('path')

// implement readData function
// const readDataFromFile = (filePath) => {
//     const data = fs.readFileSync(path.join(__dirname,filePath),'UTF-8',err=>{if(err){
//         throw err
// }
// // console.log(data)
// return JSON.parse(data);


// })
// };

//  the enw Read datA FromFile Function 
const readDataFromFile = (filePath) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, filePath), 'UTF-8');
        return JSON.parse(data);
    } catch (err) {
        throw err;
    }
}
//  the new Version of teh function 
const writeDataToFile = (filePath, newData) => {
    let existingData;
    try {
        // Read existing data from the file
        existingData = readDataFromFile(filePath);
    } catch (error) {
        existingData = [];
    }
    existingData.push(newData);

    // Write the updated data back to the file
    fs.writeFileSync(path.join(__dirname, filePath), JSON.stringify(existingData, null, 2), err => {
        if (err) {
            throw err;
        }
        console.log(newData);
    });
}



module.exports = {
    readDataFromFile,
    writeDataToFile
};
