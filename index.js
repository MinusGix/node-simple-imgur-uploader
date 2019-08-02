const https = require('https');
const qs = require('querystring');

class ImgurUploader {
    constructor (clientID=null) {
        this.clientID = clientID;
        this.api = "api.imgur.com";
        this.apiPath = "/3/upload/";
    }

    uploadFileBuffer (buffer, callback=((err,data)=>{}), title="Autuploaded", description="", filename="file", type="image") {
        let data = {
            type: "base64",
            title: title,
            description: description,
            name: filename,
        };

        if (type === "image") {
            data.image = buffer.toString('base64');
        } else if (type === "video") {
            data.video = buffer.toString('base64');
        } else {
            return false;
        }

        data = qs.stringify(data);



        let req = https.request({
            headers: {
                "Authorization": "Client-ID " + this.clientID,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(data)
            },
            method: "POST",
            hostname: this.api,
            path: this.apiPath,
        }, (res) => {
            let output = '';
            res.on('data', d => {
                output += d;
            });
            res.on("end", () => {
                callback(null, JSON.parse(output));
            });
        });

        req.on("error", err => {
            callback(err, null);
        });

        req.write(data);
        req.end();
    }
};

module.exports = ImgurUploader;