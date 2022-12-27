let multer = require('multer')
let storage = multer.diskStorage({
    destination: (req,res,cb)=>{
        cb(null,'./public/assets/img/wines')
    },
    filename:(req,file,cb)=>{
        console.log("file" ,file)
        let fileName = file.originalname.split(".")[0]
        let fileExtension = file.originalname.split(".")[1]// tomamos el valor despues del punto, la extension
        cb(null, fileName + '-'+Date.now()+"."+fileExtension)
    }
})

let maxSize = (1024* 1024) * 5
let maxSizeMB = formatBytes(maxSize,2)


function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const upload = multer({
    storage: storage,
    limits:{fileSize:maxSize},
    fileFilter:(req,file,cb)=>{
        if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
            cb(null, true);
        }
        else{
            cb(null,false)
            return cb (new Error('solo formatos permitidos'))
        }
    }
}).single("picture")

module.exports = { 
    multer, 
    storage,
    maxSizeMB,
    upload
}