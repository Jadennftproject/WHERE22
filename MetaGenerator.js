const fs = require('fs')

const pathToFiles = 'E:\\Data\\images'
const newPathToFiles = 'E:\\Data\\'
const files = fs.readdirSync(pathToFiles)

for (const file of files) {
    if (file.endsWith('.png')) {
        var splitarray = file.split("_")
        
        var paddedNumber = splitarray[0]

        // rename file
        /*fs.rename(pathToFiles + "\\" + file, pathToFiles + "\\" + paddedNumber + ".png", function(err, result) {
            if(err) console.log('error', err);
        })*/

        // generate metadata json file
        var intNum = parseInt(paddedNumber)
        var metaDict = {
            "animation_url": "",
            "description": "",
            "name": "24hrs NFT",
            "attributes":[
                {
                    "trait_type" : "Number",
                    "value" : paddedNumber
                }
                ],
            "image": ""
        }

        var dictString = JSON.stringify(metaDict)
        // solidity doesn't prepend with 0's, so name it just the number.json
        fs.writeFile(newPathToFiles + "\\metadata\\" + intNum + ".json", dictString, function(err, result) {
            if(err) console.log('error', err);
        })
    }
}