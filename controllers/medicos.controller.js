const { response } = require('express');
const Medico = require('../models/medico.model');



const getMedicos = async( req, res=response ) =>{

  const medicos = await Medico.find()
                                                  .populate('usuario','nombre img')
                                                  .populate('hospital','nombre img');

  res.json({
    ok:true,
    medicos
  });
};

const getMedicoById = async( req, res=response ) =>{

  const id = req.params.id

  try {
    const medico = await Medico.findById(id)
                                                    .populate('usuario','nombre img')
                                                    .populate('hospital','nombre img');
  
    res.json({
      ok:true,
      medico
    });
  } catch (error) {
    console.log(error);
      res.json({
      ok:false,
      msg:'Hable con el administrador'
    });
  }

};

const crearMedico = async( req, res=response ) =>{

  const uid = req.uid;
  const medico = new Medico({
    usuario:uid,
    ...req.body
  });


  try {
 
    const medicoDB = await medico.save();


    res.json({
      ok:true,
      medico: medicoDB
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'Hable con el administrador'
    });
  }
};

const actualizarMedico = async( req, res=response ) =>{


const idMedico = req.params.id
const userId = req.uid;


  try {
    
    const medicoDB = await Medico.findById( idMedico );
    if (!medicoDB) {
      return res.status(404).json({
        ok:false,
        msg: 'Medico no encontrado por id'
      });
    }

    const cambiosMedicoBD= {
      ...req.body,
      usuario: userId
    }

    const medicoActualizado = await Medico.findByIdAndUpdate( idMedico, cambiosMedicoBD, { new:true } );


    res.json({
      ok:true,
      medico: medicoActualizado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'Hable con el administrador'
    });
  }
};

const borrarMedico = async( req, res=response ) =>{
 const idMedico = req.params.id

  try {
    const medicoDB = await Medico.findById( idMedico );
    if (!medicoDB) {
      return res.status(404).json({
        ok:false,
        msg: 'Médico no encontrado por id'
      });
    }

    await Medico.findByIdAndDelete( idMedico );

    res.json({
      ok:true,
      msg: 'Médico eliminado'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'Hable con el administrador'
    });
  }
};


module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedicoById
}