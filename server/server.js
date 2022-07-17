const express = require('express');
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
const buildPath = path.join(__dirname, '..', 'build');
const app = express();
const cors = require("cors");
const multer = require('multer');
const bodyParser = require('body-parser');
const Jimp = require('jimp');
const fs = require('fs')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(buildPath));
app.get("/*", function (req, res) {
    res.sendFile(path.join(buildPath, "index.html"));
});

const corsOrigin = '';

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
    file = req.body;
    console.log("pretty file", file);

    Jimp.read(`./public/nfts/${imagefilename}`, (err, fir_img) => {
        if (err) {
            console.log(err);
        } else {
            Jimp.read(`./public/logo/logo.png`, (err, sec_img) => {
                if (err) {
                    console.log(err);
                } else {
                    sec_img.opacity(0.5)

                    fir_img.composite(sec_img, 0, 0, [Jimp.VERTICAL_ALIGN_BOTTOM, Jimp.HORIZONTAL_ALIGN_RIGHT])
                    fir_img.write(`./public/watermarked-${imagefilename}`)
                    setTimeout(() => {
                        return   res.sendFile(__dirname + `/public/watermarked-${imagefilename}`);
                      }, 1000)
                    
                }
            });

        }
    });


})


const port = process.env.PORT || 1337;
app.listen(port, process.env.IP, function () {
    console.log(`Server is running on port ${port}`);
});
