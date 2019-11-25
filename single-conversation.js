const applescript = require('applescript');
const express=require('express');
const app = express();

// Server credentials
port = 3000
node_env = 'development'

// Opens up a stdin raw input


// Grabs the arguments
const args = process.argv.slice(2);
console.log('args   : ', args);

function getContact() {

  // Create readline instance
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  readline.question(`Contact: `, (contact) => {
    contact = `${contact}`
    // Close the readline input
    readline.close()
    sendMessage(contact)
  });
}

// Function that takes raw input message and sends it to the contact
function sendMessage(contact) {

  // Create readline instance
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  // Opens the readline
  readline.question(`Message: `, (message) => {
    message = `${message}`
    console.log(message)
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
    sendMessage(contact);
  })
}

/* Add function to check for incoming messages, will most likely need to be integrated with chat.db
function test() {
  console.log('test')
}
*/

module.exports = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Environment: ${node_env}`);

  getContact()
  // Calls the sendMessage() function
  //sendMessage()

  // Change to have it checking for incoming messages from that contact
  //test()
});