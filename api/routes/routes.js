let express = require("express");
let controller = require("../controllers/controllers");
let app = express();
let config = require("../config");
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

async function portListener(port) {
    console.log("Menyambungkan ke Server...")
    try {
        await app.listen(port);
        console.log("Berhasil Tersambung ke Server")
    } catch (error) {
        console.log("Gagal Tersambung ke Server");
    }
}
portListener(config.port);

app.post("/seminars", controller.inputDataSeminar);
app.get("/seminars", controller.lihatSemuaDataSeminar);
app.get("/seminars/:id", controller.lihatDataSeminar);
app.delete("/seminars/:id", controller.hapusDataSeminar);
app.post("/seminars/:id/peserta", controller.tambahPeserta);
app.get("/seminars/:id/peserta", controller.lihatSemuaPeserta);
app.get("/seminars/:id/peserta/:userid", controller.lihatPeserta);
app.delete("/seminars/:id/peserta/:userid", controller.hapusPeserta);