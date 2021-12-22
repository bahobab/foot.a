
const SiteClient = require('datocms-client').SiteClient;
const client = new SiteClient('87fa02fa4c315cb11269f935215558');
const environmentId = 'main';
client.environment.find(environmentId)
.then((environment) => {
  console.log(environment);
})
.catch((error) => {
  console.error(error);
});