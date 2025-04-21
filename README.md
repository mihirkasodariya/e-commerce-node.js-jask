#  E-Commerce
A modern e-commerce application built with Node.js and Express. This project includes API routes, database integration, and Swagger documentation for easy API exploration.

# Features Implemented:

* User Authentication
   User registration and login using secure JWT-based authentication.

* Product Browsing
   Users can view products, including detailed product information.

* Cart Management
   Users can add products to their cart.

* Wishlist
    Users can add and manage wishlist items.

* Order Processing
   Complete order placement and tracking functionality.

# Validation & Security:
 Used Joi and express-validator for robust request validation.
 Implemented role-based access control using middleware (authorizeRoles):
 Admin and User roles are handled separately.

# Admin-Only Access:
 Admins have exclusive access to perform the following operations:

* Add, update, or delete products

* Manage product categories (add, update, view category list)

 Regular users are restricted from performing admin-level actions to ensure application security and proper role segregation.


# Installation
* 1 : Clone the repository
git clone https://github.com/mihirkasodariya/e-commerce-node.js-jask.git
``` cd e-commerce ```

* 2 : Install dependencies
``` npm install ```

# Set up environment variables
   PORT = 3000
   MONGOURL = "mongodb://localhost:27017/"
   JWT_SECRET = ""


# Start the development server
``` npm run dev ```


 # API Documentation
 This project includes Swagger for API documentation.

# View Swagger Docs
To run Swagger UI and explore the API:

``` node .\src\swagger.js ```


# Once running, open your browser and go to:

``` http://localhost:3000/api-docs ```


# Admin : Insert Document via MongoDB

* Table Name : users 
{
  "fname": "admin",
  "lname": "admin",
  "email": "admin@gmail.com",
  "mobile": "1111111111",
  "password": "$2b$10$T7cvDggnllQby/xnsi/1buEFsyobh6z.PLSZUFWh4OkX0Qccv1eCy", // 123456
  "gender": "Male",
  "profilePhoto": "1745178477142-userProfile-whatsapp-dp-man-in-cap-ucw3kyzqvvuadj33.jpg",
  "isActive": true,
  "role": "admin",
  "createdAt": { "$date": "2025-04-20T19:47:57.416Z" },
  "updatedAt": { "$date": "2025-04-20T19:47:57.416Z" },
  "__v": 0
}
