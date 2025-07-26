import http from 'node:http';
import app from './app';

const httpServer = http.createServer(app);

httpServer.listen(80, () => {
  console.log('Listening on port 80');
});

process.on('SIGINT', () => {
  httpServer.close();
});

process.on('SIGTERM', () => {
  httpServer.close();
});
