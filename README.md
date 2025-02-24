# Smartphone Management Server

This server is for `Smartphone management System` for a warehouse. The main purpose of the application is to maintain `C-CREATE R-READ U-UPDATE D-DELETE` for products. Application is protected for every route using JWT token verification and authorized by 3 types of users such as `super admin`, `branch manager`, and `seller`. There is mainly 3 types of database collections such as users: for storing user information, products: to maintain the main heart of the business and sales: for getting sales history of products.

### Live URL

```bash
https://smartphone-managemnet-server.vercel.app/
```

Role Based Routing:

1. **Super Admin**
   Access every routes.

2. **Branch Manager**
   Add and modify products.

3. **Seller**
   Only can sell products.

## Technology Used

- **Express.js**
- **Mongoose**
- **JWT (JSON Web Tokens)**
- **Bcrypt**
- **Zod**

## API Endpoints

for `user`

- **POST** /api/auth/register
- **POST** /api/auth/login
- **GET** /api/auth/users

for `smartphones`

- **POST** /api/smartphones
- **GET** /api/smartphones
- **GET** /api/smartphones/:smartphoneId
- **PATCH** /api/smartphones/:smartphoneId
- **DELETE** /api/prsmartphones
- **DELETE** /api/smartphones/:smartphoneId

for `sales`

- **POST** /api/sales
- **GET** /api/sales

## Getting Started

These instructions will help you set up and run the application on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation locally

1. Clone the repository:

```bash
https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-server-side-NaimurAlltime.git
```

2. Navigate to the project directory:

```bash
cd smartphone-management-server
```

3. Install dependencies:

```bash
npm install
```

4. Create a .env file in the root directory and configure environment variables:

```bash
PORT=...
DATABASE_URL=...
BCRYPT_SALT_ROUNDS=...
JWT_ACCESS_TOKEN=...
JWT_ACCESS_EXPIRATION=...
```

### Running the Application

1. Convert the typescript file to javascript file

```bash
npm run build
```

2. Running typescript in development environment

```bash
npm run start:dev
```

3. Running javascript in production environment

```bash
npm run start:prod
```
