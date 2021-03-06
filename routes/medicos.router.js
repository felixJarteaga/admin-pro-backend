/*
  Medicos
  ruta: '/api/medico'
*/

const { Router } =  require('express');
const { check } = require('express-validator');
const { validarCampos } =require('../middlewares/validar-campos');
const { getMedicos, crearMedico ,actualizarMedico, borrarMedico, getMedicoById } = require('../controllers/medicos.controller')
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');

router.get( '/', getMedicos );

router.post( '/',
      [
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe ser válido').isMongoId(),
        validarCampos
      ] ,
      crearMedico );

router.put( '/:id',
      [
         validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        check('hospital','El hospital id debe ser válido').isMongoId(),
        validarCampos
      ], 
      actualizarMedico );

router.delete('/:id',validarJWT, borrarMedico)

router.get('/:id', getMedicoById)





module.exports = router;