const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize('solati', 'postgres', 'Tuprima?666',{
    host:'localhost',
    dialect: 'postgres',
    logging:false
});

const Converted = sequelize.define('converted',{

    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    COP:{

        type: DataTypes.FLOAT,
        allowNull: false,
        
    },
    USD:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
},
{
    timestamps: true,   
}
);

sequelize.sync({alter:true}).then(async () =>{
    console.log("Datos actualizados");

});



module.exports = Converted;