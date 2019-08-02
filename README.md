# Simple Imgur Uploader
A really simple imgur uploader, for when you don't need that much. Does not use any libraries that aren't included in nodejs (`https`, and `querystring`).  
Create a new instance of the module, give it a client id, and then tell it to upload a buffer you give it. Calls the callback you gave it (there is a Promise version with async at the end) with the (err, data) from imgur. Data is an object (parsed from imgur response json), or null if err isn't null. If err isn't null, then, you have an error.  
Does not support uploading to a user account, and don't plan to.  
Example code:  
```js
let imgur = require("../ImgurUploader/index.js");

let instance = new imgur("your-client-id here");

let file = require('fs').readFileSync("./bool.jpg");

instance.uploadFileBuffer(file, (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
}, "image");

instance.uploadFileBufferAsync(file, "image").
    .then(data => console.log(data))
    .catch(err => console.error(err));
```