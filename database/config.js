const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async ()=>{
// 3ToumRJmRiOXW4ml
// mean_user
  try {

    await mongoose.connect(process.env.DB_CNN,{
      // useNewUrlParser:true,
      // useUnifiedTopology:true,
      // useCreateIndex:true
  });

  console.log('DB online');
    
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la BD ver logs');
  }

}

module.exports = {
  dbConnection
}