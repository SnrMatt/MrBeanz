# MrBeanz (in progress)

Coffee bean ecommerce demo

## Relational Structure for Database

![image](https://user-images.githubusercontent.com/80737126/185534606-25c57b63-a8a9-410f-8fea-acd05b291095.png)

## REST API

METHOD (Route) - (Function)

### Coffee Products

- [x] GET "/api/coffee" - Returns complete list of coffee_products (id, name, desc).
- [x] POST "/api/coffee" - Creates a new coffee_product.
- [x] DELETE "/api/coffee" - (Dangerous!) Removes every product entry in the database.
- [x] GET "/api/coffee/:name" - Returns specific product attributes (id, name,desc, price,qty,sizes)
- [x] DELETE "/api/coffee/:id" - Removes specific product from database identified by their ID.

### Users

- [x] POST "/api/register" - Register's a new user with credentials
- [x] POST "/api/login" - Authenticates email and password
