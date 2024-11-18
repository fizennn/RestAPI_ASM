const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
    tenXe: String,
    hangSX: String,
    namSX: Number,
    giaBan: Number,
    moTa: String,
},{
    timeseries: true
})

module.exports = mongoose.model('car',carSchema);