const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const upload = require('../../../config/multer');
let myIntro = require('../../model/schema/myIntro');

var multiUpload = upload.fields([{
    name: 'img'
}]);

router.put('/', multiUpload, async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);

    let tempArray = [];
    if (req.files.img) {
        for (let i = 0; i < req.files.img.length; i++) {
            tempArray.push(req.files.img[i].location);
        }
    }

    if (ID != -1) {
        myIntro.find({
            user_idx: ID
        }, function (err, myIntros) {
            if(myIntros.length > 0 ){
                myIntro.update({
                    user_idx: ID
                }, {
                    intro_contents: req.body.contents,
                    intro_img_url: tempArray
                }, function (err, result) {
                    if (err) {
                        return res.status(405).send({
                            message: 'update myIntro fail'
                        });
                    } else {
                        if (!result.n) return res.status(404).json({
                            error: 'intro not found'
                        });
                        return res.status(201).send({
                            message: 'update myIntro success'
                        });
                    }
                });
            } else {
                myIntro.create({
                    user_idx: ID,
                    intro_contents: req.body.contents,
                    intro_img_url: tempArray
                });

                return res.status(201).send({
                    message: 'update myIntro success'
                });
            }
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
        return;
    }

});

module.exports = router;