const fs = require('fs');

console.log("Replacing environment variables.")

// Get the value of the AH_SITE_ENVIRONMENT environment variable
const envValue = process.env.AH_SITE_ENVIRONMENT;

// Read the .next/standalone/server.js file
const serverJs = fs.readFileSync('./.next/standalone/server.js', 'utf8');

// Create an array of the keys you want to replace
const keys = ["BACKEND_URL", "backendUrl", "imageUrl"];

// Find the variables in the file and replace them with the environment variable value
let updatedServerJs = serverJs;
for (const key of keys) {
    const regex = new RegExp(`("${key}":")[^"]*"`, 'g');
    updatedServerJs = updatedServerJs.replace(
      regex,
      `$1https://chinekefe." + process.env.AH_SITE_ENVIRONMENT + ".shareda.hogarthww.digital"`
    );
  }

  // Special handling for the "domains" key, which has an array value
  const regex = new RegExp(`("domains":\\[)[^\\]]*\\]`, 'g');
  updatedServerJs = updatedServerJs.replace(
    regex,
    `$1"" + process.env.AH_SITE_ENVIRONMENT + ""]`
  );

// Write the updated content back to the .next/standalone/server.js file
fs.writeFileSync('./.next/standalone/server.js', updatedServerJs);