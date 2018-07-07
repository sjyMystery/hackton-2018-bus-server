'use strict';

const Service = require('egg').Service;

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
    return {
      path: target,
    };
  }
}


module.exports = FileService;
