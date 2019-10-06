const multer = require('multer');
const path = require('path')

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, call) => {
            const ext = path.extname(file.originalname)
            const name = path.basename(file.originalname, ext)
            call(null, `${name}-${Date.now()}${ext}`);
        }
    })
}