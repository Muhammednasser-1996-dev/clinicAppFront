import 'zone.js/dist/zone-node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync, readFileSync } from 'fs';
import * as domino from 'domino';
import { isbot } from 'isbot';
import * as path from 'path';
import { HOST_URL } from './src/app/tokens/host-urls';  // Correct import path

const template = readFileSync(join(__dirname, '..', 'browser', 'index.html')).toString();
const win = domino.createWindow(template) as any;
global['window'] = win;
global['document'] = win.document;
global['navigator'] = win.navigator;
global['location'] = win.location;
global['DOMTokenList'] = win.DOMTokenList;

export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/clinicAppFront/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index.html';

  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.get('*', (req, res) => {
    const userAgent = req.header('User-Agent');
    const hostUrl = `${req.protocol}://${req.get('host')}`;

    console.log(`User-Agent: ${userAgent}`);
    console.log(`isbot result: ${isbot(userAgent)}`);

    if (isbot(userAgent)) {
      console.log('SSR');
      res.render(indexHtml, { req, providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl },
        { provide: HOST_URL, useValue: hostUrl },
      ] });
    } else {
      console.log('No SSR');
      res.sendFile(path.join(distFolder, indexHtml));
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
