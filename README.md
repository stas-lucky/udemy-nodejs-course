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

## Security related packages

| Package                | Details                                          | Link                                                 |
| ---------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| express-rate-limit     | Limites amout of requests                        | https://www.npmjs.com/package/express-rate-limit     |
| helmet                 | Sets security HTTP headers                       | https://www.npmjs.com/package/helmet                 |
| express-mongo-sanitize | Data sanitization against NoSQL query injections | https://www.npmjs.com/package/express-mongo-sanitize |
| xss-clean              | Data sanitization against XSS                    | https://www.npmjs.com/package/xss-clean              |
| hpp                    | Prevent params pollution                         | https://www.npmjs.com/package/hpp                    |

## Notes

On 21.11.2021 finished on 159 Adding Nested GET Endpoint
