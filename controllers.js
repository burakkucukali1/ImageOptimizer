
const multer = require('multer')
const path = require('path');

//#region KRAKEN OPERATIONS
const Kraken = require('kraken'),
                fs = require('fs');

            const kraken = new Kraken({
                api_key: '1b5904033c01334b0c06500b403a9e10',
                api_secret: '60486cc44d220def1020218c758959dc364b6817'
            });
//#endregion

//#region Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
//#endregion

//#region Init Upload
const upload = multer({ storage: storage, }).single('myImage');
//#endregion

// CONTROLLER FUNCTIONS
exports.getIndex = (req, res, next) => {
    res.render('index')
}

exports.postImage = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        } else {
            var imagePath = req.file.path

            var opts = {
                file: fs.createReadStream(imagePath),
                wait: true
            };

            kraken.upload(opts, function (err, data) {
                if (err) {
                    console.log('Failed. Error message: %s', err);
                } else {
                    console.log('Success. Optimized image URL: %s', data.kraked_url);
                    res.render('index', { link : data.kraked_url });
                }
            });
        }
    })
}