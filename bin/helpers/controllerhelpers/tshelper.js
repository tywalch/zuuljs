var logGreen = (function(reqDetails) {
  return new Promise(function (resolve) {
      console.log('\x1b[36m', 'tshelper', reqDetails ,'\x1b[0m');
    resolve(reqDetails);
  });
});

var logRed = (function(reqDetails) {
  return new Promise(function (resolve) {
    console.log('\033[31m', 'tshelper', reqDetails ,'\x1b[0m');
    resolve(reqDetails);
  });
});

module.exports = {
  logGreen: logGreen,
  logRed: logRed
};