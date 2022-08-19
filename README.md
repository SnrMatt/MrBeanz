# MrBeanz (in progress)
Coffee bean ecommerce demo

## Relational Structure for Database
![image](https://user-images.githubusercontent.com/80737126/185462697-eb8a9ecc-6af4-4f47-a9ab-a08646f41599.png)

## REST API
 METHOD (Route) - (Function)
### Coffee Products
  - [X] GET "/api/coffee" - Returns complete list of coffee_products (id, name, desc).
  - [X] POST "/api/coffee" - Creates a new coffee_product.
  - [X] DELETE "/api/coffee" - (Dangerous!) Removes every product entry in the database.
  - [X] GET "/api/coffee/:name" - Returns specific product attributes (id, name,desc, price,qty,sizes)
  - [X] DELETE "/api/coffee/:id" - Removes specific product from database identified by their ID.
  