# E-commerce Admin Dashboard

## Testing

Admin account for testing:

- Email: [admin@gmail.com](mailto\:admin@gmail.com)
- Password: admin

## Overview

This is the admin panel for managing an eCommerce platform. It allows administrators to manage products, categories, orders, customers, coupons, and more. The dashboard is built using the **MERN stack** with **React, Tailwind CSS, and Ant Design** for the front-end.

## Features

- Dashboard with statistics
- Product and category management
- Order tracking and management
- Customer management
- Coupon management
- Blog management
- Enquiry management
- Authentication and authorization

## Tech Stack

- **Frontend:** React, Tailwind CSS, Ant Design
- **State Management:** Redux Toolkit
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API Client:** Axios

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (v16 or later)
- npm or yarn
- MongoDB (if running locally)

### Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/doquangthang-zet/Ecommerce_Website.git
   cd ecommerce_admin
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

3. **Create a ********************************************************************************************\`.env\`******************************************************************************************** file:**

   ```sh
   REACT_APP_SERVER_URL=your_api_url
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

For production builds:

```sh
npm run build
```

Deploy the `build/` folder to any static hosting service like **Vercel, Netlify, or AWS S3**.

## Troubleshooting

## Babel Plugin Error

If you see an error related to `@babel/plugin-proposal-private-property-in-object`, install it manually:

```sh
npm install --save-dev @babel/plugin-proposal-private-property-in-object
```

## License

This project is licensed under the MIT License.

## Contributors

- **Thang** - [https://github.com/doquangthang-zet](https://github.com/doquangthang-zet)

## Contact

For any issues, feel free to raise a GitHub issue or contact at **[doquangthang.zet@gmail.com](mailto\:doquangthang.zet@gmail.com)**.

