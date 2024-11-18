# Virtual Wallet SOAP Service

This project is a **SOAP-based server** implemented with **NestJS**, designed to simulate a virtual wallet. The system provides essential features like customer registration, wallet top-up, making payments with confirmation payments, and balance inquiries.

## Technologies Used

- **NestJS**: Framework for building scalable and maintainable server-side applications.
- **MongoDB**: Database for efficient storage and retrieval of wallet data, transactions, and user details.
- **pnpm**: Fast and efficient package manager for handling dependencies.
- **SOAP**: Communication protocol for the API, offering structured and standardized messaging.

## Local Installation

Follow these steps to set up and run the project locally:

### Prerequisites

Before you begin, ensure you have the following software installed:

- **Node.js**: Version 18.x or later. [Download Node.js](https://nodejs.org/en/download/)
- **pnpm**: Version 8.x or later. [Install pnpm](https://pnpm.io/installation)
- **MongoDB**: Make sure MongoDB is set up and configured as a replica set. You can either use a local MongoDB instance or a cloud-based MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Step-by-Step Installation

1. **Clone the repository**:
Open your terminal and run the following command to clone the project:

```bash 
git clone https://github.com/lcubas/interfell-challenge-virtual-wallet-soap-service.git
cd interfell-challenge-virtual-wallet-soap-service
```

2. Copy `.env.example` file content into `.env` file.

```sh
cp .env.example .env
```

3. **Install dependencies**:
The project uses `pnpm` as the package manager. Install all the required dependencies by running:

```bash 
pnpm install
```

4. **Configure MongoDB**:
Ensure that your MongoDB instance is running. If you are use MongoDB locally, follow the steps in the [MongoDB Instalation Documentation](https://www.mongodb.com/docs/manual/installation/). Alternatively, you can use a cloud-based service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

5. **Run the application**:
Start the development server with the following command:

```bash 
pnpm start:dev
```

The server will start running on [http://localhost:3000](http://localhost:3000). You can access the SOAP service via the generated WSDL file at the following endpoint:
- http://localhost:3000/customers?wsdl
- http://localhost:3000/wallets?wsdl

Once the server is running, you can start interacting with the SOAP API using a SOAP client like **Postman** or any other tool that supports SOAP requests.

### Additional Setup

- **Build the Project** (Optional):
If you want to build the project for production, run:
```bash 
pnpm build
```

- **Run Tests** (Optional):
You can run unit and integration tests using Jest:
```bash 
pnpm test
```

## Example Usage: Testing the SOAP Services

You can test the SOAP services by sending SOAP requests to the appropriate endpoints using a SOAP client like **Postman** or any other tool that supports SOAP requests.

### 1. Register customer
To register a new client, send a SOAP request with the following structure:

**Request:**
- URL: `http://localhost:3000/customers`
- SOAPAction: `http://www.example.com/VirtualWallet#RegisterCustomer`
- Body:
  - `documentNumber`: "1234567890"
  - `name`: "John Doe"
  - `email`: "john.doe@example.com"
  - `phoneNumber`: "123456789"

**Example Body:**
```xml 
<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://www.example.com/VirtualWallet">
   <soapenv:Header/>
   <soapenv:Body>
        <RegisterCustomerRequest xmlns="http://www.example.com/VirtualWallet">
            <documentNumber>12345678</documentNumber>
            <name>Jhon Doe</name>
            <email>jdoe@email.com</email>
            <phoneNumber>123-456-789</phoneNumber>
        </RegisterCustomerRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

### 2. Wallet Recharge
To recharge a wallet, send a SOAP request with the following structure:

**Request:**
- URL: `http://localhost:3000/wallets`
- SOAPAction: `http://www.example.com/VirtualWallet#RechargeWallet`
- Body:
  - `documentNumber`: "1234567890"
  - `phoneNumber`: "123456789"
  - `amount`: 100.00

**Example Request:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://www.example.com/VirtualWallet">
   <soapenv:Header/>
   <soapenv:Body>
        <RechargeWalletRequest xmlns="http://www.example.com/VirtualWallet">
            <amount>100.5</amount>
            <documentNumber>123456789</documentNumber>
            <phoneNumber>555-1234</phoneNumber>
        </RechargeWalletRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

### 3. Make a Payment
To initiate a payment, send a SOAP request with the following structure:

**Request:**

- URL: `http://localhost:3000/wallets`
- SOAPAction: `http://www.example.com/VirtualWallet#MakePaymentWithWallet`
- Body:
  - `documentNumber`: "1234567890"
  - `phoneNumber`: "123456789"
  - `purchaseAmount`: 50.00

**Example Request:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://www.example.com/VirtualWallet">
   <soapenv:Header/>
   <soapenv:Body>
        <MakePaymentWithWalletRequest xmlns="http://www.example.com/VirtualWallet">
            <documentNumber>123456789</documentNumber>
            <phoneNumber>555-1234</phoneNumber>
            <purchaseAmount>450.5</purchaseAmount>
        </MakePaymentWithWalletRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

### 4. Confirm Payment
To confirm the payment, send a SOAP request with the following structure:

**Request:**

- URL: `http://localhost:3000/wallets`
- SOAPAction: `http://www.example.com/VirtualWallet#ConfirmPaymentWithWallet`
- Body:
  - `sessionId`: "abcdfghijkl"
  - `token`: "123456"

**Example Request:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://www.example.com/VirtualWallet">
   <soapenv:Header/>
   <soapenv:Body>
        <ConfirmPaymentWithWalletRequest xmlns="http://www.example.com/VirtualWallet">
            <sessionId>f3752950-4f6a-45cd-bfe4-376d496bae93</sessionId>
            <token>149571</token>
        </ConfirmPaymentWithWalletRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

### 5. Check Wallet Balance
To check the wallet balance, send a SOAP request with the following structure:

**Request:**

- URL: `http://localhost:3000/wallets`
- SOAPAction: `http://www.example.com/VirtualWallet#GetWalletBalance`
- Body:
  - `documentNumber`: "1234567890"
  - `phoneNumber`: "123456789"

**Example Request:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://www.example.com/VirtualWallet">
   <soapenv:Header/>
   <soapenv:Body>
        <GetWalletBalanceRequest xmlns="http://www.example.com/VirtualWallet">
            <documentNumber>123456789</documentNumber>
            <phoneNumber>555-1234</phoneNumber>
        </GetWalletBalanceRequest>
   </soapenv:Body>
</soapenv:Envelope>
```
