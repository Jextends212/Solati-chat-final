const logger = require("morgan");
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
const { Todatabase } = require("./src/controllers/index");
const axios = require("axios");

//Web socket:
let nicknames = ["Solati"];
io.on("connection", function (socket) {
  console.log("Un cliente se ha conectado");

  socket.on('new user', (data, cb) =>{

    //Utilizo el indexof para verificar si el usuario ya existe y le paso la data (username), si no existe retorna -1:
    if(nicknames.indexOf(data)>=0){

      //CB para mostrar u ocultar los contenedores html

      cb(false); 

    }else{

      cb(true);
      socket.nickname = data;
      nicknames.push(socket.nickname);
      io.sockets.emit('usernames', nicknames);
    }

  })

  socket.on("send message", async function (value) {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/COP")
      .then((response) => {
        let data = response.data;
        return data;
      })
      .then((data) => {
        const result = data.rates.USD * value;
        console.log(result);
        Todatabase(value, result);

        io.sockets.emit("new message", {
          msg:value,
          nick:socket.nickname
        });
        io.sockets.emit("Converted", result);
      }); 
  });

  socket.on('disconnect', function(data){

    if(!socket.nickname) return;
    nicknames.splice(nicknames.indexOf(socket.nickname), 1);
    io.sockets.emit('usernames', nicknames);

  })


});

//Middlewares**********
app.use(logger("dev"));
app.use(express.static("public")); //Send Landing page...

server.listen(3001, function () {
  console.log("Servidor corriendo en http://localhost:3001");
});
