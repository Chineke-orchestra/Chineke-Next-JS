const fs = require('fs');

const currentEnv = process.env.AH_SITE_ENVIRONMENT

console.log("Current environment: " + currentEnv)

// Get the value of the environment variable
//const envValue = "https://chinekebe." + currentEnv + ".shareda.hogarthww.digital"
const envValue = "https://test-chineke-main.pantheonsite.io"

// Create the content for the .env file
const envFileContent = `BACKEND_URL=${envValue}\n`;

// Write the content to the .env file
fs.writeFileSync('.env', envFileContent);

console.log("Created environment file for " + currentEnv)