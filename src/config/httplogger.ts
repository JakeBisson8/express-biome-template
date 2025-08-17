import fs from 'node:fs';
import path from 'node:path';
import morgan from 'morgan';

const { HTTP_LOG_FILE, HTTP_ERROR_LOG_FILE } = process.env;

// Streams
const httpCombinedStream = fs.createWriteStream(
  path.join(__dirname, '..', 'logs', HTTP_LOG_FILE || 'http-combined.log'),
  {
    flags: 'a',
  },
);
const httpErrorStream = fs.createWriteStream(
  path.join(__dirname, '..', 'logs', HTTP_ERROR_LOG_FILE || 'http-error.log'),
  {
    flags: 'a',
  },
);

export const httpLogger = morgan('common', { stream: httpCombinedStream });
export const httpErrorLogger = morgan('common', { skip: (_req, res) => res.statusCode < 400, stream: httpErrorStream });
export const httpDevLogger = morgan('dev');
