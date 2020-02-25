'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer')
// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
var upload = multer({ dest: 'public/uploads' })

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  if (!req.file) {
    res.json({ error: 'No file submitted' })
  }
  res.json({ filename: req.file.originalname, filesize: req.file.size })
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening on 3000...');
});