var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');
const path = require ('path');

const filepath = path.resolve(commander.file);

var jsonDataSchema = new mongoose.Schema({
    filename: String, 
    P_Site: Array,
    P_HGV: Array,
    P_PV: Array,
    P_ESS: Array,
    Tariff: Array,
    Energy: Array,
    Energy_CUM: Array,
    Cost: Array,
    Cost_CUM: Array,
    Persona: String,
    N_VH: Number,
    W_VH: Number,
    E_VH: Number,
    D_VH: Array,
    N_CH: Number,
    TABLE_1x: Array,
    TABLE_1y: Array,
    end: Number
});

const JsonData = mongoose.model('JsonData', jsonDataSchema);


async function uploadFileToMongo(filepath) {
    const data = fs.readFileSync(filepath, 'utf8');

    try {
        await mongoose.connect('mongodb+srv://arabia:9hI55M1QTCfbjrxJ@cluster0.xleuu3g.mongodb.net/?retryWrites=true&w=majority')
        const jsonData = JSON.parse(data);
        jsonData.filename = path.basename(filepath);
        await JsonData.create(jsonData);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.disconnect
    }


}
uploadFileToMongo(filepath)
    .then(() => console.log('File Uploaded'))
    .catch(err => console.log('Error', err));