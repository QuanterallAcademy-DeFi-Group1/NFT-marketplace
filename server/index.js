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

app.get('/image-view/:name', (req, res) => {
    res.sendFile(__dirname + `/public/watermarked-${req.query.name}`)
})

app.post('/image-upload', imageUpload.array("my-image-file"), (req, res) => {
    console.log('POST request received to /image-upload.');
    console.log('Axios POST body: ', req.body);

    Jimp.read(`./public/nfts/${imagefilename}`, (err, fir_img) => {
        if (err) {
            console.log(err);
        } else {
            Jimp.read(`./public/logo/logo.jpg`, (err, sec_img) => {
                if (err) {
                    console.log(err);
                } else {
                    sec_img.opacity(0.2)
                    fir_img.composite(sec_img, 12, 12, [Jimp.BLEND_DESTINATION_OVER])
                    fir_img.write(`./public/watermarked-${imagefilename}`)
                }
            })
        }
    });
})

const port = 1337;
app.listen(port, process.env.IP, function () {
    console.log(`Server is running on port ${port}`);
});