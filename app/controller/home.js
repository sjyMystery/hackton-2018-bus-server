'use strict';

const path = require('path');
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async upload() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const name = path.basename(stream.filename);
    const result = await ctx.service.file.saveInitializeFile(name, stream);


    ctx.body = result;
  }
  async check() {
    const ctx = this.ctx;
    this.ctx.body = {
      exist: await ctx.service.file.doesFileExist(ctx.queries.uid[0]),
    };
  }
  async query() {

  }
}

module.exports = HomeController;
