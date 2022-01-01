Finished on 139 deleteMe

# Readme

Sources:

- Original web site from the course `https://www.natours.dev`
- Original API from the course `https://www.natours.dev/api/v1/tours`

## Run the app

Run mongo database: `sudo`
To run the app in dev mode use next command: `npm start`

## ESLint configuration

`npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev`

Details: https://eslint.org/docs/rules/

## Prettier config

- In setting search for "Default formatter". Set default to "esbenp.prettier-vscode"
- Set format on save
  Details: https://prettier.io/docs/en/options.html

## Mongo DB

- Download and unpack
- Run `sudo ./mongod` from bin folder to start the server
- Run `sudo ./mongo` from bin to start client

## Debugger from Google

Different intersting packages

- https://github.com/auth0/node-jsonwebtoken#readme
- https://github.com/kelektiv/node.bcrypt.js#readme

## Tools

Mailtrap: https://mailtrap.io/

## Security related packages

| Package                | Details                                          | Link                                                 |
| ---------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| express-rate-limit     | Limites amout of requests                        | https://www.npmjs.com/package/express-rate-limit     |
| helmet                 | Sets security HTTP headers                       | https://www.npmjs.com/package/helmet                 |
| express-mongo-sanitize | Data sanitization against NoSQL query injections | https://www.npmjs.com/package/express-mongo-sanitize |
| xss-clean              | Data sanitization against XSS                    | https://www.npmjs.com/package/xss-clean              |
| hpp                    | Prevent params pollution                         | https://www.npmjs.com/package/hpp                    |

## Notes

https://www.natours.dev/

| Date       | Lection                                      |
| ---------- | -------------------------------------------- |
| 21.11.2021 | 159 Adding Nested GET Endpoint               |
| 21.12.2021 | 161 Factory Functions: Update and Create     |
| 21.12.2021 | 166 improving read performance (indexes)     |
| 26.12.2021 | 169 Preventing Duplicate Reviews             |
| 27.12.2021 | 172 Creating API documentation using Postman |
| 28.12.2021 | 180 Setting up the Project Structure         |
| 30.12.2021 | 184 Building tour page - Part 2              |
| 31.12.2021 | 186 Including a Map with Mapbox - Part 2     |
| 31.12.2021 | 188 Loggin in Users with OUr API - Part 2    |
| 01.01.2022 | 193 Building the User Account Page           |
