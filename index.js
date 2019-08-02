const https = require('https');
const qs = require('querystring');

module.exports = {
    api: "api.imgur.com",
    apiPath: "/3/upload/",

    uploadFileBuffer: uploadFileBuffer,
    uploadFileBufferAsync: uploadFileBufferAsync,
};


function uploadFileBuffer (clientID, buffer, callback=((err,data)=>{}), type="image", title="Autuploaded", description="", filename="file") {
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
            "Authorization": "Client-ID " + clientID,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        },
        method: "POST",
        hostname: module.exports.api,
        path: module.exports.apiPath,
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

function uploadFileBufferAsync (clientID, buffer, type="image", title="Autuploaded", description="", filename="file") {
    return new Promise(function (resolve, reject) {
        uploadFileBuffer(clientID, buffer, function (err, data) {
            if (err !== null) {
                reject(err);
            } else {
                resolve(data);
            }
        }, type, title, description, filename);
    });
}