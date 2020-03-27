var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/upload-avatar', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let avatar = req.files.avatar;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      avatar.mv('./public/images/' + avatar.name);

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/upload-yolo', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {

      let yoloImg = req.files.yoloImg;


      avatar.mv('./public/images/yolo' + yoloImg.name);


      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: yoloImg.name,
          mimetype: yoloImg.mimetype,
          size: yoloImg.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/upload-tagImg', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {

      let yoloImg = req.files.yoloImg;


      avatar.mv('./public/images/tagImg' + yoloImg.name);


      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: yoloImg.name,
          mimetype: yoloImg.mimetype,
          size: yoloImg.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
