// Read a line from a socket
// sock: socket to read line from
// callback: function to call with string when finished
module.exports = function(sock, callback) {
  var buffer = '';

  // Set up the data listener
  var dataListener = function(data) {
    if(data.indexOf(10) >= 0) {
      // New line present
      buffer += data.slice(0, data.indexOf(10)).toString();
      done();
    } else {
      buffer += data.toString(); // Add the buffer to the buffer lol buffers?
                                     // Seriously though, why can't node read a line
    }
  }

  var done = function() {
    sock.removeListener('data', dataListener);
    // Remove carriage return
    if(buffer.charCodeAt(buffer.length - 1) === 13)
      buffer = buffer.substring(0, buffer.length - 1);
    callback(buffer);
  }

  sock.on('data', dataListener);
}
