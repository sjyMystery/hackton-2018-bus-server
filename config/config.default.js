'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1530962433102_1880';

  // add your config here
  config.middleware = [];

  config.security = {
    domainWhiteList: [ 'http://localhost:3000' ],
  };

  return config;
};
