'use strict';

const Service = require('egg').Service;
const exec = require('child_process').execSync;
class ExecuteService extends Service {
  async initializeInput(hash) {
    try {
      // convert .csv to .temp
      const ex = await this.ctx.service.file.doesFileExist(hash + '.temp');
      if (ex) {
        return;
      }
      exec(`python bin/init.py ${hash}`);
    } catch (e) {
      this.ctx.logger.error(e);
    }
  }
  async addEdge(hash, start, end) {
    try {
      exec(`python bin/AddEdge.py ${hash} ${start} ${end}`);
    } catch (e) {
      this.ctx.logger.error(e);
    }
  }
  async caculateResult(hash) {
    try {
      exec(`./bin/a.out data/${hash}.out data/${hash}.dist`);
      return await this.ctx.service.file.readDistInline(hash);
    } catch (e) {
      this.ctx.logger.error(e);
    }
  }
}

module.exports = ExecuteService;
