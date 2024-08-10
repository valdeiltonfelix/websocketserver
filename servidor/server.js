const { WebSocketServer } = require('ws');
const dotenv = require('dotenv');

dotenv.config();

const wss = new WebSocketServer({ port: process.env.PORT  
 || 8085 });

var activeUsers = [];
var users = [];
var clients = [];
//const connectedClients = new Map(); 
wss.on('connection', (ws) => {
  // Adiciona o cliente à lista de clientes
  clients.push(ws);
  ws.on('error', console.error);
  ws.on('message', (data) => {
    // Processa a mensagem
	 const d = JSON.parse(data);
	  console.log(d);
    	if(d.type=='logout'){
             users.push(d);
             users = removeLoggedOutUsers(users);
             logautUserList(users)
         }else if(d.type=='chat'){

	         wss.clients.forEach(function(client) {
                      return client.send(data.toString())
                 })
	      
             }else if(d.type=='add_users'){
                 users.push(d);
	               broadcastUserList();
	     }

  });

});

function broadcastUserList() {
  wss.clients.forEach(client => {
	  return  client.send(JSON.stringify({ type: 'user_list', users }));
  });
}

function logautUserList(users) {
  wss.clients.forEach(client => {
    console.log("Deslogou da sessão ",{ type: 'logout', data:users });
     client.send(JSON.stringify({ type: 'logout', data:users }));
  });
}



function removeLoggedOutUsers(data) {
var activeUsers = []; 
// const parsedData = JSON.parse(data);
	
 data.forEach((item,index) => {
            
        if (item.type === 'logout') {
            const { id } = item.data;
         for (let i = 0; i < users.length; i++) {
                 if (users[i].data.id === id) {
                  delete users[i];
                  activeUsers=users.filter(item => item !== undefined && item !== null);
                //break; // Encontrou o índice, então para o loop
           }
         }
    }

 });

 return activeUsers;
}
