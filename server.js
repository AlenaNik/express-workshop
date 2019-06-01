const express = require('express');
const fs = require('fs');
const formidable = require('express-formidable');
const app = express();

app.use(express.static('public'));
app.use(formidable());

app.get('/get-posts', function(req, res) {
    res.sendFile(__dirname + '/data/posts.json')
});

app.post('/create-post', function(req, res){
   const post = req.fields.blogpost;
   const timestamp = Date.now();
   const postObject = {[timestamp]: post}
   fs.readFile(__dirname + '/data/posts.json', function (error, file) {
       const allPosts = JSON.parse(file);
       const newAllPosts = Object.assign({}, allPosts, postObject);

       console.log('allPosts', allPosts);
       console.log('newAllPosts', newAllPosts);


       const content = JSON.stringify(newAllPosts, null, 2);
       fs.writeFile(__dirname + "/data/posts.json", content, function(error) {
           if (error) throw error;
           res.send(postObject);
       })
   })
});


app.listen(3000, function () {
    console.log('estoy aqui, me ves?')
});
