const { Schema, model } = require("mongoose");

const UsuariosSchema=Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true, 'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'La contraseña es obligatoria']
    },
    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE', 'USER_ROL']
    },
    estado:{
        type:Boolean,
        default:true,
    },
    google:{
        type:Boolean,
        default:false
    },
});
module.exports=model('usuario', UsuariosSchema);