import fs from 'node:fs';
import path from 'node:path';

// Retrieves a file from the ssl/ folder
export const getSSLFile = (filename: string) => fs.readFileSync(path.join(__dirname, '..', 'ssl', filename));
