
$( function () {
    
  const socket = io.connect(); //Mantiene la conexion en tiempo real del server

//Obtener elementos del DOM desde la interface.

const $messageForm = $('#messageForm');
const $messageBox = $('#message');
const $chat = $('#chat');  

const $nick = $('#nickForm');
const $nickError = $('#nickError');
const $nickname = $('#nickname');

const $users = $('#usernames');




//Convert:

const converted = async (value) =>{

  fetch('https://api.exchangerate-api.com/v4/latest/COP')
 .then(response =>{
  return response.json();
}) .then(data =>{
  const result = (data.rates.USD * value);
  console.log(result);
  return result;
})

}


//Events:


$messageForm.submit(async e => {

  e.preventDefault();
  if(!$messageBox.val()){

    return alert ("Type something...");

  }else{

    let COP = $messageBox.val();
    const USD = await converted(COP);
    

  socket.emit('send message', $messageBox.val(),USD);
  $messageBox.val("");


  }
  
});

$nick.submit(e => {
  e.preventDefault();
  socket.emit('new user', $nickname.val(), data => {

    if(data){
     $('#nickwrap').hide();  
     $('#contentWrap').show(); 
    }else{

      $nickError.html(`
      <div class = "alert alert-danger">
      The user name: ${$nickname.val()} already exist
      </div>
      `);
    }

    $nickname.val('');

  });
})





//Conection and sockets:

socket.on('new message',function(data){
  $chat.append(`<b>${data.nick} : </b>$ ${data.msg} COP <br/>`);


});

socket.on('Converted',function(data){
  $chat.append(`Solati: $ ${data} USD <br/>`);
});

socket.on('usernames', function(data){

  let html = '';
  for (let i = 0; i < data.length; i++) {
    
    html += `<p><i class="fa-solid fa-user"></i> ${data[i]}</p>`
    
  }
  $users.html(html);


})


})

