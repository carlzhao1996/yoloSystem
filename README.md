# Yolo System API document

## Pre-request
* Node JS Version 10.x
* Linux or Mac operating system
* Changing the yolo system directory in yoloExec.sh
```
#!/bin/bash
# Your Yolo system directly
cd /Users/wenhaozhao/Desktop/FYP_Demo/yolov3
python3 yolo_video.py --image --imgName=$1
```

## API List

### Image process
While calling this API, it will be able to execute shell script to execute image process and then send result to "ResultImages" directory

Request
```
POST /yolo/imageProcess

Content-Type application/json
Body
{
    "imgName":"download.jpeg"
}
```

Response
```
{
    "code": 0,
    "output": "Image detection mode\n Ignoring remaining command line arguments: ./path2your_video,\nmodel_data/yolo.h5 model, anchors, and classes loaded.\nIMAGE-8-TOOL-COLOUR1.jpg\n(416, 416, 3)\nFound 1 boxes for img\nBattery 0.49 (152, 465) (236, 538)\n2.5783335449999996\n<Response [200]>\n"
}
```

### Image Save
This API operate by yolo system itself to post result image to "ResultImages" directory.

```
POST /yolo/imageSave
```

### Image Upload
This API post image and storage user's image into local server ("ImageStorage" directory) as well as copying image to yolo sytem. Also, if directory changed, please change the yolo storage directory as your directory in 
```
const commad = 'cp imageStorage/'+fileName+' '+'/Users/wenhaozhao/Desktop/FYP_Demo/yolov3'
```