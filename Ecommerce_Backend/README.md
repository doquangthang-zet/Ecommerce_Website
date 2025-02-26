# E-commerce Backend

## Overview

This is the backend for the eCommerce platform, handling authentication, product management, orders, and payments. Built using **Node.js, Express.js, and MongoDB**, it provides RESTful APIs for the frontend.

## Features

- User authentication and role-based authorization
- Product management (CRUD operations)
- Order processing and payment integration
- Shopping cart and wishlist functionality
- Secure JWT-based authentication

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **API Client:** Axios

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- npm or yarn
- MongoDB (local or cloud-based)

### Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/doquangthang-zet/Ecommerce_Website.git
   cd ecommerce_backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

3. **Create a ********************************`.env`******************************** file:**

   ```sh
   PORT=your_prefered_port
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   CLIENT_URL=your_client_url
   ...
   ```

4. **Run the development server:**

   ```sh
   npm start
   ```

   or

   ```sh
   yarn start
   ```

## Deployment

For production:

```sh
npm run build
```

Deploy using services like **Heroku, AWS, or DigitalOcean**.

## License

This project is licensed under the MIT License.

## Contributors

- **Thang** - [https://github.com/doquangthang-zet](https://github.com/doquangthang-zet)

## Contact

For any issues, feel free to raise a GitHub issue or contact at **[doquangthang.zet@gmail.com](mailto\:doquangthang.zet@gmail.com)**.

