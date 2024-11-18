import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import * as soap from 'soap';
import { join } from 'path';
import { AppModule } from './app.module';
import { CustomerService } from './customer/customer.service';
import { Responder } from './services/responder';
import { WalletService } from './wallet/wallet.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const customerService = app.get(CustomerService);
  const walletService = app.get(WalletService);

  const customerSoapDefinition = {
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
  };

  const walletSoapDefinition = {
    WalletService: {
      WalletServicePort: {
        rechargeWallet: async (args: any) => {
          try {
            await walletService.rechargeWallet(args);
            return Responder.success({
              message: 'Wallet recharged successfully',
            });
          } catch (error) {
            return Responder.error(error.message, 500);
          }
        },
        getWalletBalance: async (args: any) => {
          try {
            const balance = await walletService.getBalance(args);
            return Responder.success({ balance });
          } catch (error) {
            return Responder.error(error.message, 500);
          }
        },
        makePaymentWithWallet: async (args: any) => {
          try {
            await walletService.makePayment(args);
            return Responder.success({
              message: 'check your email for payment confirmation',
            });
          } catch (error) {
            return Responder.error(error.message, 500);
          }
        },
        confirmPaymentWithWallet: async (args: any) => {
          try {
            await walletService.confirmPayment(args);
            return Responder.success({
              message: 'Payment confirmed successfully',
            });
          } catch (error) {
            return Responder.error(error.message, 500);
          }
        },
      },
    },
  };

  const customerWSDLPath = join(__dirname, 'customer/service.wsdl');
  const customerWSDL = readFileSync(customerWSDLPath, 'utf8');
  const walletWSDLPath = join(__dirname, 'wallet/service.wsdl');
  const walletWSDL = readFileSync(walletWSDLPath, 'utf8');

  const server = createServer(function (request, response) {
    response.end('404: Not Found: ' + request.url);
  });

  server.listen(3000);
  soap.listen(server, '/customers', customerSoapDefinition, customerWSDL);
  soap.listen(server, '/wallets', walletSoapDefinition, walletWSDL);
}

bootstrap();
