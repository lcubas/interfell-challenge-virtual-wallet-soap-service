import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import * as soap from 'soap';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const service = app.get(AppService);
  const myService = {
    ExampleService: {
      ExamplePort: {
        // This is how to define an asynchronous function with a Promise.
        GetData: async function (args: { id: string }) {
          const result = await service.getData({ id: args.id });

          return new Promise((resolve) => {
            resolve(result);
          });
        },
      },
    },
  };

  const wsdlPath = join(__dirname, 'service.wsdl');
  const wsdl = readFileSync(wsdlPath, 'utf8');

  // http server example
  const server = createServer(function (request, response) {
    response.end('404: Not Found: ' + request.url);
  });

  server.listen(3000);
  soap.listen(server, '/wsdl', myService, wsdl, function (error, res) {
    console.log('server initialized', error, res);
  });
}

bootstrap();
