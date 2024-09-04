# Car Rental Reservation System [Live](https://car-rental-reservation-system-backend.vercel.app/)

<p style="color: red; font-weight: bold;">
    <strong>Note:</strong> Use the following credentials to access the admin and user features:
</p>
<ul style="color: black;">
    <li><strong>Admin Credentials:</strong></li>
    <ul>
        <li><strong>Email:</strong> admin@one.com</li>
        <li><strong>Password:</strong> admin123</li>
    </ul>
    <li><strong>User Credentials:</strong></li>
    <ul>
        <li><strong>Email:</strong> user@one.com</li>
        <li><strong>Password:</strong> user123</li>
    </ul>
</ul>

Our Car Rental Reservation System streamlines the entire vehicle booking and rental process, allowing customers to easily reserve cars tailored to their needs. With our intuitive and user-friendly interface, customers can book a vehicle without any hassle, ensuring a seamless experience from start to finish.

## Table of Contents

-   [Prerequisites](#prerequisites)
-   [Technology](#technology)
-   [Installation](#installation)
-   [Features](#features)
-   [Usage](#usage)
-   [License](#license)
-   [Contact](#contact)

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   **[Node.js](https://nodejs.org/)** (version >= 20.11.1)
-   **[npm](https://www.npmjs.com/)** (version >= 9.8.0)
-   **[TypeScript](https://www.typescriptlang.org/)** (version >= 5.4.5)

You will also need a MongoDB database setup. You can follow the instructions [here](https://docs.mongodb.com/manual/installation/) to install MongoDB.

## Technology

This project uses the following technologies:

-   **[express](https://www.npmjs.com/package/express)** : A web framework for Node.js.
-   **[mongoose](https://www.npmjs.com/package/mongoose)** : An Object Data Modeling (ODM) library for MongoDB and Node.js.
-   **[zod](https://www.npmjs.com/package/zod)** : A TypeScript-first schema declaration and validation library.
-   **[cors](https://www.npmjs.com/package/cors)** : A middleware to enable Cross-Origin Resource Sharing.
-   **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** : A library to sign, verify and decode JSON Web Tokens.
-   **[bcrypt](https://www.npmjs.com/package/bcrypt)** : A library to help hash passwords.
-   **[cookie-parser](https://www.npmjs.com/package/cookie-parser)** : A middleware to parse cookies attached to the client request object.
-   **[dotenv](https://www.npmjs.com/package/dotenv)** : A module to load environment variables from a .env file.
-   **[http-status](https://www.npmjs.com/package/http-status)** : A utility to interact with HTTP status codes.

## Installation

Instructions on how to install the project.

```sh
# Clone the repository
git clone https://github.com/MehediHaassan1/Car-Rental-Reservation-System-Backend.git

# Navigate to the project directory
cd project-name

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Update .env file with your configuration

# Start the project
npm run start:dev
```

### .env.example

| Key                           | Value                                     |
| ----------------------------- | ----------------------------------------- |
| NODE_ENV                      | development                               |
| PORT                          | 5000                                      |
| DB_URL                        | your mongodb database url                 |
| BCRYPT_SALT_ROUND             | Number - like 20                          |
| JWT_ACCESS_SECRET             | your jwtAccess secret                     |
| JWT_ACCESS_SECRET_EXPIRES_IN  | 1d                                        |
| JWT_REFRESH_SECRET            | your jwtRefresh secret                    |
| JWT_REFRESH_SECRET_EXPIRES_IN | 30d                                       |
| PAYMENT_URL                   | https://sandbox.aamarpay.com/jsonpost.php |
| STORE_ID                      | aamarpaytest                              |

| SIGNATURE_KEY | dbb74894e82415a2f7ff0ec3a97e4183 |

| PAYMENT_VERIFY_URL | https://sandbox.aamarpay.com/api/v1/trxcheck/request.php |

# Features

### Authentication

-   **POST** `/api/auth/register` - Register a new user.
-   **POST** `/api/auth/login` - Login and receive a JWT token.
-   **POST** `/api/auth/refresh-token` - Help to convert regenerate the access token

### Users

-   **GET** `/api/users` - Get all users data (Admin only).
-   **GET** `/api/users/:id` - Get single users data (Admin only).
-   **DELETE** `/api/users/delete-user/:id` - Delete Single user (Admin only).
-   **PATCH** `/api/users/make-admin/:id` - Update user role (Admin only).
-   **GET** `/api/users/me` - Get logged in users data
-   **PUT** `/api/users/update-profile` - Update logged-in user's profile.

### Cars

-   **GET** `/api/cars` - Get a list of all cars (Admin only).
-   **GET** `/api/cars/search-cars` - Search a list of available cars.
-   **POST** `/api/cars` - Create a car (Admin only).
-   **GET** `/api/cars/:id` - Get single car.
-   **PUT** `/api/cars/:id` - Update single car (Admin only).
-   **PUT** `/api/cars/delete-car/:id` - Delete single car (Admin only).

### Bookings

-   **POST** `/api/bookings` - Create a new booking.
-   **GET** `/api/bookings` - Get a list of all bookings (Admin only).
-   **PATCH** `/api/bookings/update-booking/:id` - Update booking details.
-   **PATCH** `/api/bookings/update-status/:id'` - Update booking status from pending to ongoing when approved it (Admin only).
-   **POST** `/api/bookings/booking-update-complete/:id` -Make booking complete and pay amount updated.
-   **DELETE** `/api/bookings/delete-booking/:id` - Cancel a booking (User/Admin).

## Features

-   **User Authentication:** Register, login, and manage user profiles.
-   **Car Management:** Add, update, and delete car listings.
-   **Booking System:** Manage car bookings and handle cancellations.
-   **Payment Processing:** Secure payment processing through Aamarpay.
-   **Role-Based Access Control:** Different access levels for users and admins.

# License

[MIT](https://choosealicense.com/licenses/mit/)

# Contact

If you have any questions, feedback, or issues, feel free to contact us:

-   **Email:** mehedi.haassan1@gmail.com
