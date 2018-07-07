'use strict';

module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1530962433102_1880';

  // add your config here
  config.middleware = [];

  config.security = {
    domainWhiteList: [ 'localhost:3000' ],
    csrf: false,
    methodNoAllow: {
      enable: false,
    },
    credentials: true,
  };
  config.multipart = {
    fileExtensions: [ '.csv' ],
    fileSize: '256mb',
  };
  return config;
};
