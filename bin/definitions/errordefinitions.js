var database = {
    type: 'Database Error',
    displayError: 'An error has occurred with the database'
};

var particle = {
    type: 'Particle API Error',
    displayError: 'An error has connecting to the Particle API'
};

var unauthorizedRequest = {
    error: 'Unauthorized',
    type: 'Unauthorized Request'
};

var invalidRequest = {
    type: 'Invalid Request'
};

module.exports = {
    database: database,
    'particle': particle,
    'unauthorizedRequest': unauthorizedRequest,
    'invalidRequest': invalidRequest
};