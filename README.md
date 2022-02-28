# SHORTLINK (A Url Shortner Api)

## install dependencies
```
npm install
```

## Running the Service
- create a new .env file in the root directory
- copy contents of .env.example file and paste in the new .env file
- replace default parameters with your desired credentials 
- run the commands `npm run dev ` for development and ` npm start for production `

## Available endpoints
- `/api/encode` Encodes a url
- `/api/decode` Decodes a url
- `/api/statistics/{url-path}` Retrieves Statistics of a url path

## Running Tests
- Ensure Steps 1 and 3 above are completed
- run the commands `npm run test `
