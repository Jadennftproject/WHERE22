import { NFTStorage, File } from 'nft.storage'
import fs from 'fs'
// var fs = require('fs');
const client = new NFTStorage({ token: 'NFT_STORAGE_TOKEN' })

var directory = 'C:\\Users\\Spencer\\Documents\\Files\\metadata'

var fileList = []

async function findFiles() {
    console.log('finding files')
    var files = fs.readdirSync(directory);
    
    for(const temp of files) {
        console.log(temp)
        var fileName = directory + '\\' + temp
        fileList.push(new File([fs.readFileSync(fileName)], temp))
    }
    for (const t of fileList) {
      console.log(t.name)
    }
    var result = await client.storeDirectory(fileList);
    console.log(result)
}

async function check() {
  console.log("running check")
  for (const t of fileList) {
    console.log(t.name)
  }
  console.log(fileList.length)
}

findFiles()
// check()