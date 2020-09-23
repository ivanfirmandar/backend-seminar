let mongoose = require("mongoose");
let config = require("../config");
let Schema = mongoose.Schema;

const strukturDataSeminar = {
    _id: String,
    nama_seminar: String,
    pemateri: String,
    tanggal: Date,
    durasi_menit: Number,
    peserta: [{
        _id: String,
        nama: String,
        email: String,
        nomor: String
    }]
}

let SeminarSchema = new Schema(strukturDataSeminar);
module.exports = mongoose.model("dataseminar", SeminarSchema);