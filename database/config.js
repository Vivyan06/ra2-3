const mongoose=require('mongoose');
const dbConnection=async()=>{
    try{
        await mongoose.connect(process.env.MongoDB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('Base de datos activa');
    }
    catch(error){
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }

}
module.exports={
    dbConnection
}