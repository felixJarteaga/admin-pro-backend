/* 
  ruta: api/uploads/
*/

const { Router } =  require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload, retornaImagen } = require('../controllers/uploads.controller');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');

router.use(expressFileUpload());

router.put( '/:tipo/:id', validarJWT, fileUpload );
router.get( '/:tipo/:foto', retornaImagen );






module.exports = router;