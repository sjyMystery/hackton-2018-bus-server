'use strict';

const Service = require('egg').Service;
const md5File = require('md5-file');
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
class FileService extends Service {
  async saveInitializeFile(name, stream) {
    const target = path.join(this.config.baseDir, 'data', name);

    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      this.ctx.logger.error(err);
      throw err;
    }

    let hash;
    let newPath;
    try {
      hash = md5File.sync(target);
      newPath = path.join(this.config.baseDir, 'data', hash + '.csv');
      fs.renameSync(target, newPath);
    } catch (e) {

      this.ctx.logger.error(e);
      throw e;
    }
    return {
      hash,
    };
  }
  async doesFileExist(name) {
    const target = path.join(this.config.baseDir, 'data', name);
    try {
      return fs.existsSync(target);
    } catch (e) {

      this.ctx.logger.error(e);
      throw e;
    }
  }
  async readDistInline(hash) {
    try {
      const target = path.join(this.config.baseDir, 'data', hash + '.dist');
      const result = fs.readFileSync(target, 'utf-8');
      return result.split('\n').map(value => {
        const pos = value.split(',');
        return {
          lng: parseFloat(pos[0]),
          lat: parseFloat(pos[1]),
        };
      }).slice(0, -1);
    } catch (e) {
      this.ctx.logger.error(e);
      throw e;
    }
  }
}


module.exports = FileService;
