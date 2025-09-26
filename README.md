# Rentkar Backend

A robust backend service for Rentkar, a delivery management system, built with Node.js, Express, TypeScript, and MongoDB.

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
- npm or yarn
- MongoDB (local or cloud instance)

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
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

## Project Structure

```
backend/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── middlewares/      # Express middlewares
├── models/           # Mongoose models
├── routes/           # API routes
├── services/         # Business logic
├── types/            # TypeScript type definitions
└── validators/       # Request validators
```

## Development

1. Install development dependencies:
   ```bash
   npm install -D typescript ts-node nodemon @types/node @types/express
   ```

2. Start the development server with hot-reload:
   ```bash
   npm run dev
   ```

## Testing

To run tests:
```bash
npm test
```

## Environment Variables

| Variable      | Description                     | Default     |
|---------------|---------------------------------|-------------|
| PORT          | Server port                     | 3000        |
| MONGODB_URI   | MongoDB connection string       | -           |
| JWT_SECRET    | Secret key for JWT              | -           |
| NODE_ENV      | Environment (development/prod)  | development |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any queries, please contact the development team.
