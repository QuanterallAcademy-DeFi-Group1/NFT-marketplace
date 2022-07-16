const express = require('express');
const path = require ('path');
const publicPath = path.join(__dirname, '..', 'public');
const buildPath = path.join(__dirname, '..', 'build');
const app = express();
const cors = require("cors");
const multer = require('multer');
const bodyParser = require('body-parser');
const Jimp = require('jimp');
// const pinata = require('../src/pinata');
// import { uploadFileToIPFS, uploadJSONToIPFS } from "../src/pinata";

const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;
const axios = require('axios');
const FormData = require('form-data');

 const uploadFileToIPFS = async(file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    
    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);

    return axios 
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            console.log("image uploaded", response.data.IpfsHash)
            return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(buildPath));
app.get("/*", function(req, res) {
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
                    // Send here to pinata!!

                    try {
                        //upload the file to IPFS
                        const response = await uploadFileToIPFS(file);
                        if(response.success === true) {
                            console.log("Uploaded image to Pinata: ", response.pinataURL)
                            return response.pinataURL;
                            // setFileURL(response.pinataURL);
                        }
                    }
                    catch(e) {
                        console.log("Error during file upload", e);
                    }
                }
            });

            // setTimeout(function () {
            //     res.sendFile(path.join(__dirname, `../server/public/watermarked-${imagefilename}`));
            // }, 3000);
        }
    });


})

const port = process.env.PORT || 1337;
app.listen(port, process.env.IP, function () {
    console.log(`Server is running on port ${port}`);
});
