'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/upload', controller.home.upload);
  // 检查文件是否存在
  router.get('/check', controller.home.check);
  // 提交表单
  router.post('/query', controller.home.query);
};
