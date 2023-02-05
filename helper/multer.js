// const path = require( 'path' );
// const multer = require('multer');

// const storage = multer.diskStorage( {
//     destination: (req, file, cb) => {
//         cb(null, './uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}--${file.originalname}`);
//     }

//    });

// const checkFileType = (file, cb) => {
//     const fileTypes = /jpeg|jpg|png|svg|gif/;
 
//     // Extract the extension name
//     const extName = path.extname(file.originalname ).toLowerCase();

//     // check the extension name of the allowed filetypes
//     const checkExtName = fileTypes.test( extName )

//     // check the mimetype of the allowed file
// const mimeType = fileTypes.test( file.mimetype );
// if ( mimeType && checkExtName ) {
//     return cb( null, true );
// } else {
//     cb(new Error('Unsupported file format'))
// }
// }

// const postImageUploader = multer( {
//     storage: storage,
//     fileFilter: ( req, file, cb ) => {
//         checkFileType( file, cb );
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 2,
//     }
// } ).single( 'postimage' );

// module.exports = postImageUploader;

