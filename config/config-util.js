const nconf = require('nconf');


function Config() {
    const relativePath = process.cwd();
    nconf.argv().env();
    const environment = nconf.get('NODE_ENV') || 'development';
    nconf.file(environment,  relativePath+'/config/dev.json');
}

Config.prototype.get = function(key) {
    return nconf.get(key);
};

module.exports=new Config()