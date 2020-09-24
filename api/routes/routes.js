let controller = require("../controllers/controllers");

module.exports = function routes(app) {
    app.post("/seminars", controller.inputDataSeminar);
    app.get("/seminars", controller.lihatSemuaDataSeminar);
    app.get("/seminars/:id", controller.lihatDataSeminar);
    app.put("/seminars/:id", controller.ubahDataSeminar);
    app.delete("/seminars/:id", controller.hapusDataSeminar);
    app.post("/seminars/:id/peserta", controller.tambahPeserta);
    app.get("/seminars/:id/peserta", controller.lihatSemuaPeserta);
    app.get("/seminars/:id/peserta/:userid", controller.lihatPeserta);
    app.delete("/seminars/:id/peserta/:userid", controller.hapusPeserta);
}