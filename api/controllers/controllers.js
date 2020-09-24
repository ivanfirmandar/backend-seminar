let seminarCollection = require('../models/model');
let shortid = require("shortid");
let mongoose = require("mongoose");
let config = require("../config");

async function connectDB() {
    console.log("Connecting to Database...")
    mongoose.set('useUnifiedTopology', true);
    await mongoose.connect(config.urldb, {
        useNewUrlParser: true
    })
    console.log("Connected to Database");
}

module.exports.inputDataSeminar = async function inputDataSeminar(reqs, resp) {

    let dataSeminarBaru = {
        _id: shortid.generate(),
        nama_seminar: reqs.body.nama_seminar,
        pemateri: reqs.body.pemateri,
        tanggal: reqs.body.tanggal,
        durasi_menit: reqs.body.durasi_menit,
        peserta: []
    }
    await connectDB();
    let newSeminar = new seminarCollection(dataSeminarBaru);
    console.log("Menyimpan Data...");
    try {
        await newSeminar.save();
    } catch (err) {
        console.log("Data Gagal Disimpan")
    }
    console.log("Data Berhasil Disimpan")
}

module.exports.hapusDataSeminar = async function hapusDataSeminar(reqs, resp) {
    await connectDB();
    console.log("Menghapus Data...")
    try {
        await seminarCollection.deleteOne({
            _id: reqs.params.id
        })
        console.log("Berhasil Dihapus")
    } catch (error) {
        console.log("Gagal Dihapus");
    }
}

module.exports.ubahDataSeminar = async function ubahDataSeminar(idubah) {

    let dataSeminarBaru = {
        nama_seminar: "Seminar Malaysia",
        pemateri: "Ivan Roland",
        tanggal: 23 - 1 - 2012,
        durasi_menit: 120,
        peserta: [{
            _id: shortid.generate(),
            nama: "Galang Zulhan",
            email: "galangzulhan@gmail.com",
            nomor: 12
        }]
    }
    await connectDB();
    console.log("Mengubah Data...");
    try {
        await seminarCollection.findOneAndUpdate({
            _id: idubah
        }, dataSeminarBaru, {
            new: true
        })
        console.log("Data Berhasil diubah");
    } catch (error) {
        console.log("Data Gagal Diubah");
    }
}

module.exports.lihatDataSeminar = async function lihatDataSeminar(reqs, resp) {
    await connectDB();
    console.log("Menampilkan Data...")
    try {
        await seminarCollection.findById(reqs.params.id, (err, res) => {
            resp.json(res);
        });
        console.log("Berhasil Menampilkan Data");
    } catch (error) {
        console.log("Data Gagal Ditampilkan");
    }
}
module.exports.lihatSemuaDataSeminar = async function lihatSemuaDataSeminar(reqs, resp) {
    await connectDB();
    console.log("Menampilkan Semua Data...");
    try {
        await seminarCollection.find({}, (err, res) => {
            resp.json(res);
        });
        console.log("Berhasil Menampilkan Data")
    } catch (error) {
        console.log('Data Gagal Ditampilkan');
    }
}
module.exports.tambahPeserta = async function tambahPeserta(reqs, resp) {
    console.log(reqs.body);
    console.log(reqs.params);
    let pesertaBaru = {
        _id: shortid.generate(),
        nama: reqs.body.nama,
        email: reqs.body.email,
        nomor: reqs.body.nomor
    }
    await connectDB();
    mongoose.set('useFindAndModify', false);
    console.log("Menambah Peserta...")
    try {
        await seminarCollection.findByIdAndUpdate({
            _id: reqs.params.id
        }, {
            $push: {
                peserta: pesertaBaru
            }
        })
        console.log("Peserta Berhasil Ditambahkan");
    } catch (error) {
        console.log("Peserta Gagal Ditambahkan");
    }
}
module.exports.lihatSemuaPeserta = async function lihatSemuaPeserta(reqs, resp) {
    await connectDB();
    console.log("Menampilkan Semua Peserta...");
    try {
        await seminarCollection.findById(reqs.params.id, (err, res) => {
            resp.json(res.peserta);
        })
        console.log("Berhasil Menampilkan Semua Peserta");
    } catch (error) {
        console.log("Gagal Menampilkan Semua Peserta");
    }
}
module.exports.lihatPeserta = async function lihatPeserta(reqs, resp) {
    await connectDB();
    console.log("Menampilkan Informasi Peserta...");
    try {
        await seminarCollection.findById(reqs.params.id, (err, res) => {
            // console.log(`res : ${res}`)
            let peserta = res.peserta.filter((entry) => entry._id == reqs.params.userid)
            // console.log(reqs.params.userid);
            resp.json(peserta[0]);
        })

        console.log("Berhasil Menampilkan Informasi Peserta");
    } catch (error) {
        console.log("Gagal Menampilkan Informasi Peserta")
    }
}