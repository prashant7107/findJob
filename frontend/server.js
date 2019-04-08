const http=require('http');
const app=require('./backend/app');

const port = 3000;

app.set('port',port);
const server = http.createServer(app);
// http.createServer((req,res)=>{
// });

server.listen(port);
