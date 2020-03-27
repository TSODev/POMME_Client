import io from 'socket.io-client';

const uniqueRandomString= '_' + Math.random().toString(36).toUpperCase().substring(2,16)
localStorage.setItem('deviceId', uniqueRandomString);


let socket = io('http://raspberrypi:5000');
//let socket = io('http://pi.famille-soulie.fr:35000');


socket.emit('clientConnected',uniqueRandomString);
console.log('Client Connected :', socket)

export default socket;