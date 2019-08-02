# Simple Imgur Uploader
A really simple imgur uploader, for when you don't need that much. Does not use any libraries that aren't included in nodejs (`https`, and `querystring`).  
Create a new instance of the module, give it a client id, and then tell it to upload a buffer you give it. Calls the callback you gave it (there is a Promise version with async at the end) with the (err, data) from imgur. Data is an object (parsed from imgur response json), or null if err isn't null. If err isn't null, then, you have an error.  
Does not support uploading to a user account, and don't plan to.  
Goto this url to register an application with imgur: https://api.imgur.com/oauth2/addclient I believe you'll need an account on imgur.  
Example code showcasing basically all the api:  
```js
let imgur = require("../ImgurUploader/index.js");

let clientID = "your-client-id";

let file = require('fs').readFileSync("./bool.jpg");

imgur.uploadFileBuffer(clientID, file, (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
}, "image");

imgur.uploadFileBufferAsync(clientID, file, "image")
    .then(data => console.log("Async", data))
    .catch(err => console.error("Asyncerr", err));
```
The methods have some extra parameters for things like title, description, filename (not sure what this does on imgur), and a few others that are just passed in the request.  
These todos are just thing that'd be nice to have, currently it's in an 'okay' state since it's mainly meant to be an uploader.
TODO:  
- Add ability to delete files with the deletehash  
- Add ability to add it to an album (the docs say this can be done for anonymous albums if you use the deletehash)  
- Add ability to set/unset disable_audio flag in the request  
- Add ability to get image data  
- Add ability to update image info (you can use deletehash)  
- Get info about album  
- Get album images  
- Get a specific album image  
- ... basically just go through the list and hopefully support most things which don't require authentication