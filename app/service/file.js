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
      throw err;
    }

    let hash;
    let newPath;
    try {
      hash = md5File.sync(target);
      newPath = path.join(this.config.baseDir, 'data', hash + '.csv');
      fs.renameSync(target, newPath);
    } catch (e) {
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
      throw e;
    }
  }
}


module.exports = FileService;
