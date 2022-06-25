const express = require('express');
const app = express();
const cors = require("cors");
const multer = require('multer');
const bodyParser = require('body-parser');
const Jimp = require('jimp');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOrigin = 'http://localhost:1337';
app.use(cors({
    origin: [corsOrigin],
    methods: ['GET', 'POST'],
    credentials: true
}));

const imageUploadPath = './public/nfts';
let imagefilename;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imageUploadPath)
    },
    filename: function (req, file, cb) {
        imagefilename = file.originalname;
        cb(null, `${file.originalname}`)
    }
})

const imageUpload = multer({ storage: storage })

app.post('/image-upload', imageUpload.array("my-image-file"), (req, res) => {
    console.log('POST request received to /image-upload.');
    console.log('Axios POST body: ', req.body);
    res.send('POST request recieved on server to /image-upload.');

    let imgActive = `./public/nfts/${imagefilename}`;

    Jimp.read(`./public/nfts/${imagefilename}`)
        .then((tpl) => tpl.clone().write(imgActive))
        .then(() => Jimp.read(imgActive))
        .then((tpl) =>
            Jimp.read(`./public/logo/logo.jpg`).then((logoTpl) => {
                logoTpl.opacity(0.2)
                return tpl.composite(logoTpl, 128, 128, [Jimp.BLEND_DESTINATION_OVER])
            }),
        )
        .then((tpl) => tpl.write(`./public/watermarked-${imagefilename}`))
})

const port = 1337;
app.listen(port, process.env.IP, function () {
    console.log(`Server is running on port ${port}`);
});