const express = require('express');
const router = express.Router();
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');
//Result image path
// const imgDir = path.resolve(__dirname, '../') + '/ResultImages';
// fs.existsSync(imgDir) || fs.mkdirSync(imgDir);
//Result public path
const imgDirPublic = path.resolve(__dirname, '../') + '/public';
fs.existsSync(imgDirPublic) || fs.mkdirSync(imgDirPublic);
//Image storage path
const imgStorageDir = path.resolve(__dirname, '../') + '/ImageStorage';
fs.existsSync(imgStorageDir) || fs.mkdirSync(imgStorageDir);

function shellExec(command) {
    return new Promise((resolve, reject) => {
        shell.exec(command, (code, output) => {
            return resolve({ code, output });
        });
    }).catch((err) => {
        console.error(err)
        return err
    });
}
//POST: yolo/imageProcess
router.post('/imageProcess', async (req, res) => {
    try {
        //TODO: use cache to storage image name?
        const imgName = req.body.imgName;
        if (!imgName) {
            return res.json("image Name is required");
        }
        const command = './yoloExec.sh ' + imgName;
        let data = await shellExec(command);
        let output = data.output;
        let result = {}
        arr = output.split("\n");
        let resultOutput = []
        for (let i = 5; i < arr.length - 3; i++) {
            //TODO: count and push
            resultOutput.push(arr[i]);
        }
        result.code = data.code;
        result.output = resultOutput;
        return res.json(result);
    } catch (error) {
        return res.json(error);
    }

});
//POST: yolo/imageSave
router.post('/imageSave', async (req, res) => {
    const file = req.files.image;
    console.log(file);
    try {
        fs.writeFile(imgDirPublic + '/result.png', file.data, (err) => {
            if (err) {
                console.error(err);
                return res.json(err)
            } else {
                console.log('success');
                return res.json('success')
            }
        });
    } catch (error) {
        console.error(error);
        return res.json(error);
    }
});

//POST: yolo/imageUpload
router.post('/imageUpload', async (req, res) => {
    const file = req.files.file.data;
    const fileName = req.files.file.name;
    try {
        fs.writeFileSync(imgStorageDir + '/' + fileName, file, () => { });
        const commad = 'cp imageStorage/' + fileName + ' ' + '/Users/wenhaozhao/Desktop/FYP_Demo/yolov3';
        let result = await shellExec(commad);
        //TODO: memory cache to storage image file name
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.json(error);
    }
});

module.exports = router;