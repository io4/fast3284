/******************************************
 * getusers.js:                           *
 *   get users/password from backups      *
 * usage:                                 *
 *   node getusers.js GatewaySettings.bin *
 ******************************************/
const fs = require("fs");
let original = Buffer(fs.readFileSync(process.argv[2]));
let parsed = original.map( a => a ^ 0x80 );
let users = {};
let offset = parsed.toString().indexOf("\u0005admin");
let done = false;
while ( !done ) {
  let len = parsed.readUInt8(offset++);
  if ( len == 0 ) break;
  console.log(len,offset);
  let username = "";
  while (len--) username += String.fromCharCode( parsed.readUInt8(offset++) );
  offset++; // null byte
  len = parsed.readUInt8(offset++);
  let password = "";
  while (len--) password += String.fromCharCode( parsed.readUInt8(offset++) );
  offset++; // null byte
  if( !users[username] ) users[username] = [];
  if( password.length < 100 ) users[username].push(password);
}
console.log(users);
