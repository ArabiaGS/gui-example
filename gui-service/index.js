
//express_demo.js 文件
var express = require('express');
const bodyParser = require('body-parser')
var app = express();

var mongoose = require('mongoose');

// create application/json parser
var jsonParser = bodyParser.json()

const Schema = mongoose.Schema //声明Schema
var ObjectId = Schema.Types.ObjectId //声明Object类型

//
mongoose.connect('mongodb+srv://doadmin:02kw53Mdr7Cyn184@db-mongodb-lon1-46937-21f76e64.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-lon1-46937').then(() => console.log('Connected!'));

var jsonDataSchema = new mongoose.Schema({
    SIM_ID: String, 
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


app.post("/save",jsonParser,function (req,res){
    console.log(req.body);
    var add = new Admin(req.body)
    add.save();
    JsonData.find().then(data=>{
        res.json(data);
    })
})



app.get('/', function (req, res) {
    JsonData.find().then(data=>{
        console.log("enters get 000000")
        console.log(data)
        console.log("enters get 000000")
        res.json(data);
    })

});

app.get('/:SIM_ID', async (req, res) => {
    const {SIM_ID} = req.params;
    try {
        JsonData.find({"SIM_ID": SIM_ID}).then(data=>{
            console.log("enters simid000000")
        console.log(data)
        console.log("enters simid000000")
        res.json(data);
        });

    } catch (error) {
        console.error('Error Fetching data:', error);
        res.status(500).json({ error: ' An error ocurred'});
        
    }
})


app.get('/del', function (req, res) {
    JsonData.deleteOne({_id:'651ed6bdacbf11a547a05a96'})
    res.send('delete');
})



var server = app.listen(8082, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://127.0.0.1:8082", host, port)

})
