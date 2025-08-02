import http from 'node:http';
import app from './app';

const { HTTP_PORT } = process.env;

console.log(process.env.NODE_ENV);

const httpServer = http.createServer(app);

httpServer.listen(HTTP_PORT || 80, () => {
  console.log('Listening on port 80');
});

process.on('SIGINT', () => {
  httpServer.close();
});

process.on('SIGTERM', () => {
  httpServer.close();
});
