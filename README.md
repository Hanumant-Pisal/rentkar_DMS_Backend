# DMS Backend

a delivery management system, built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Order Management**: Full CRUD operations for orders with status tracking
- **Role-Based Access**: Different permissions for admin and delivery partners
- **Geospatial Queries**: Support for location-based order assignment
- **RESTful API**: Clean and consistent API endpoints
- **Type Safety**: Built with TypeScript for better development experience

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Logging**: Morgan
- **Security**: bcrypt for password hashing, CORS

## Prerequisites

- Node.js (v14 or higher)
- npm 
- MongoDB (local or cloud instance)

## Installation

1. Clone the repository:
   ```bash
   git clone []
   cd backend
   ```

2. Install dependencies:

   npm install

3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT
   MONGODB_URI
   JWT_SECRET

   ```

4. Start the development server:
   ```bash
   npm run dev

   ```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Orders
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get a specific order
- `POST /orders` - Create a new order
- `PUT /orders/:id` - Update an order
- `DELETE /orders/:id` - Delete an order
- `POST /orders/:id/assign` - Assign order to delivery partner

### Partners
- `GET /partners` - Get all delivery partners
- `GET /partners/:id` - Get a specific partner
- `POST /partners` - Create a new partner
- `PUT /partners/:id` - Update a partner
- `DELETE /partners/:id` - Delete a partner



##Author: Hanumant Pisal
