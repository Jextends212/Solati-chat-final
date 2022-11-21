const {Pool} = require("pg");
const Converted = require( "../models/converted");


// POSTGRES DB CONECTION...

const pool = new Pool({
    host:'localhost',
    user:'postgres',
    password:'Tuprima?666',
    database:'solati',
    port:'5432'
    
    });

const Todatabase = async (COP,USD) =>{

     console.log(COP);
     console.log(USD);

    try{

        if(COP && USD){

            const newValue = new Converted ({COP,USD});

            const datasaved = await newValue.save();

            console.log("Estos datos se guardaron:"+datasaved);

       
        }else{
            throw new Error("404 NOT DATA");
        }

    }catch(err){

        console.log(err.message);

    }
}



module.exports = {
    Todatabase,
    
}