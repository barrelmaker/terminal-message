const applescript = require('applescript');
const express=require('express');
const app = express();

// Server credentials
port = 3000
node_env = 'development'

// Grabs the arguments
const args = process.argv.slice(2);
console.log('args   : ', args);

// Function that takes raw input message and sends it to the contact
function sendMessage() {
  // Contact is the first argument in the command
  contact = args[0]
  
  // Opens up a stdin raw input
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  // Opens the readline
  readline.question(`Message: `, (message) => {
    message = `${message}`

    // Creates the string that runs the applescript
    const script = `tell application "Messages" to send "${message}" to buddy "${contact}"`;
    
    // Run the apple script to send the message
    applescript.execString(script, (err, rtn) => {
      if (err) {
        console.log(err)
      }
    });

    // Close the readline input
    readline.close()

    // Call the sendMessage() function again to send another message
    sendMessage();
  })
}

module.exports = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Environment: ${node_env}`);

  // Calls the sendMessage() function
  sendMessage()
});