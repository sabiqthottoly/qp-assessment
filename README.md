# Grocery Booking API

This project implements a Grocery Booking API with roles for Admin and User. Users can view, book, and manage grocery items, while Admins have additional responsibilities such as adding, viewing, updating, and removing grocery items.


## Installation

1. Clone the repository:
  ```git clone https://github.com/sabiqthottoly/grocery-booking-api.git```
2. Navigate to the project directory:
  ```cd grocery-booking-api```
3. Install dependencies:
  ```npm install```
4. Set up the database (if not using Docker):
  Create a MySQL database and update the connection details in db.js.
  Import the SQL schema located in db/schema.sql. 

## Usage
1. Start the Node.js server:
    ```npm start```

Access the API at http://localhost:8081/api

Explore the API endpoints using tools like Postman.

## API Endpoints

1. Admin Endpoints:
  * POST /api/admin/add-grocery-item
  * GET /api/admin/view-grocery-items
  * DELETE /api/admin/remove-grocery-item/:id
  * PUT /api/admin/update-grocery-item/:id
  * PUT /api/admin/manage-inventory/:id
2. User Endpoints:
  * GET /api/user/view-grocery-items
  * POST /api/user/place-order

## Docker
  1. To use Docker for easy deployment and scaling:
    Build the Docker image with docker-compose:
      ```docker build -t grocery-api .```
  


