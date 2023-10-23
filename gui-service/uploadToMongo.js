var mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://arabia:9hI55M1QTCfbjrxJ@cluster0.xleuu3g.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('Connected!'));
const fileSchema = new Schema({
    name:String,
    data: Buffer, 
});
const File = mongoose.model('File', fileSchema);

const fs = require('fs');
const path = require ('path');
const filepath = './data/CIDT_SH_20V_20231009_827_ChillDN20.json';
const filename = 'CIDT_SH_20V_20231009_827_ChillDN20.json';
async function uploadFileToMongo(filepath, filename) {
    const data = fs.readFileSync(filepath);
    const file = new File({ name: filename, data });
    await file.save();

}
uploadFileToMongo(filepath, filename)
    .then(() => console.log('File Uploaded'))
    .catch(err => console.log('Error', err));
const { rejects } = require('assert');
const fs = require('fs');
const { MongoClient, GridFSBucket } = require('mongodb');


const uri='mongodb+srv://arabia:9hI55M1QTCfbjrxJ@cluster0.xleuu3g.mongodb.net/?retryWrites=true&w=majority';
const dbName= 'test';
const collectionName= 'Admin';

const filepath = './data/CIDT_SH_20V_20231009_827_ChillDN20.json';
const filename = 'CIDT_SH_20V_20231009_827_ChillDN20.json';

async function uploadFileToMongo(filepath, filename) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const bucket = new GridFSBucket(db);

        const fileStream = fs.createReadStream(filepath);
        const uploadStream = bucket.openUploadStream(filename);

        fileStream.pipe(uploadStream);
        return new Promise ((resolve, reject) => {
            uploadStream.on('finish', resolve);
            uploadStream.on('error', reject);
        })

        
    } finally {
        await client.close();
    }
}

uploadFileToMongo(filepath, filename)
    .then(() => console.log('File Uploaded'))
    .catch(err => console.log('Error', err));

    */