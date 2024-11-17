import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import * as soap from 'soap';
import { join } from 'path';
import { AppModule } from './app.module';
import { CustomerService } from './customer/customer.service';
import { Responder } from './services/responder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const customerService = app.get(CustomerService);
  const soapDefinitions = {
    CustomerService: {
      CustomerServicePort: {
        registerCustomer: async (args: any) => {
          try {
            const newCustomer = await customerService.create(args);
            return Responder.success(newCustomer);
          } catch (error) {
            return Responder.error(error.message, 500);
          }
        },
      },
    },
    WalletService: {
      WalletServicePort: {
        getBalance: async () => {},
        updateBalance: async () => {},
        getTransactons: async () => {},
        generatePayment: async () => {},
        confirmPayment: async () => {},
      },
    },
  };

  const wsdlPath = join(__dirname, 'service.wsdl');
  const wsdl = readFileSync(wsdlPath, 'utf8');

  const server = createServer(function (request, response) {
    response.end('404: Not Found: ' + request.url);
  });

  server.listen(3000);
  const soapServer = soap.listen(server, '/customers', soapDefinitions, wsdl);
  soapServer.log = function (type: any, data: any, req: any) {
    console.log(type, data, req.headers);
  };
}

bootstrap();
