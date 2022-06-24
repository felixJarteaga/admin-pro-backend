const { response } = require('express');
const Hospital = require('../models/hospital.model');



const getHospitales = async( req, res=response ) =>{

  const hospitales =  await Hospital.find()
                                                        .populate('usuario','nombre img');

  res.json({
    ok:true,
    hospitales
  });
};

const crearHospital = async( req, res=response ) =>{

  const uid = req.uid;
  const hospital = new Hospital({
    usuario:uid,
    ...req.body
  });


  try {
 
    const hospitalDB = await hospital.save();


    res.json({
      ok:true,
      hospital: hospitalDB
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'Hable con el administrador'
    });
  }

};

const actualizarHospital = async( req, res=response ) =>{

  const idHospital = req.params.id
  const userId = req.uid;

  try {
    
    const hospitalDB = await Hospital.findById( idHospital );
    if (!hospitalDB) {
      return res.status(404).json({
        ok:false,
        msg: 'Hospital no encontrado por id'
      });
    }

    const cambiosHospitalBD= {
      ...req.body,
      usuario: userId
    }

    const hospitalActualizado = await Hospital.findByIdAndUpdate( idHospital, cambiosHospitalBD, { new:true } );


    res.json({
      ok:true,
      hospital: hospitalActualizado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'Hable con el administrador'
    });
  }

};

const borrarHospital = async( req, res=response ) =>{
 const idHospital = req.params.id

  try {
    const hospitalDB = await Hospital.findById( idHospital );
    if (!hospitalDB) {
      return res.status(404).json({
        ok:false,
        msg: 'Hospital no encontrado por id'
      });
    }

    await Hospital.findByIdAndDelete( idHospital );

    res.json({
      ok:true,
      msg: 'Hospital eliminado'
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
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital
}