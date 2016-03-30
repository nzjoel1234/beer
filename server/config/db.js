var dbServerUrl = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/';
var dbName = process.env.OPENSHIFT_APP_NAME || 'beer';

module.exports = {
  url: dbServerUrl + dbName
};