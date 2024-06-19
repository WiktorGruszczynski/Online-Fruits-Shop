
# Online Fruits Shop

## About

**Fruits Market** is an interactive shopping website that allows user to purchase the various fruits available. These fruits can be added to shopping cart and then after purchasing, the shopping cart products will be available as an order in `orders` subpage. All orders are indexed by the date they were purchased. The fruits dispalyed on website are taken from database. Individual products can be added to that database using `Admin Panel`


## Technologies
- **Frontend**
    - HTML5
    - CSS
    - TypeScript (React)

- **Backend**
    - Java
    - Spring Boot

- **Database**
    - PostgreSQL


## How to set up

Clone repository `git clone https://github.com/WiktorGruszczynski/Online-Fruits-Shop`

### Frontend

Go to `client` directory

Use following command to install frontend dependencies

- ### `npm install`

Use following command to run react app
- ### `npm start`

### Backend

Go to `server/src/main/resources` directory.    
Create `application.properties` file.

Paste content below and fill blank values

```
spring.application.name = server
spring.datasource.url =
spring.datasource.username = 
spring.datasource.password = 

spring.jpa.hibernate.ddl-auto = update

spring.mail.host = smtp.gmail.com
spring.mail.port = 587
spring.mail.username =
spring.mail.password =

spring.mail.properties.mail.smtp.auth = true
spring.mail.properties.mail.smtp.starttls.enable = true
```

If you are not using PostgreSQL database, add line below and type the name of your dialect
`spring.jpa.properties.hibernate.dialect = TYPE YOUR DIALECT HERE`
