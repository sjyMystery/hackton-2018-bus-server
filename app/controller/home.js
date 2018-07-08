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
    await ctx.service.execute.initializeInput(result.hash);
    ctx.body = result;
  }
  async check() {
    const ctx = this.ctx;
    this.ctx.body = {
      exist: await ctx.service.file.doesFileExist(`${ctx.request.queries.hash[0]}.csv`),
    };
  }
  async query() {
    const data = this.ctx.request.body;

    const { hash, start, end } = data;

    await this.ctx.service.execute.addEdge(hash, start, end);
    let result = await this.ctx.service.execute.caculateResult(hash);

    result = await Promise.all(result.map(async (value, key) => {
      const title = await this.ctx.service.geo.getLocationName(value.lng, value.lat);
      return {
        lng: value.lng,
        lat: value.lat,
        title,
      };
    }));

    this.ctx.body = result;
  }
}

module.exports = HomeController;
