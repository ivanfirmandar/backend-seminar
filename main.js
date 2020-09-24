let routes = require("./api/routes/routes");
let express = require("express");
let app = express();
let config = require("./api/config");
let bodyParser = require("body-parser");
async function portListener(port) {
    console.log("Menyambungkan ke Server...")
    try {
        await app.listen(port);
        console.log("Berhasil Tersambung ke Server")
    } catch (error) {
        console.log("Gagal Tersambung ke Server");
    }
}
async function main() {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    await portListener(config.port);

    routes(app);
}
main();