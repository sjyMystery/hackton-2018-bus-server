'use strict';

class GeoService extends require('egg').Service {
  async getLocationName(lng, lat) {
    try {
      const result = await this.app.curl('http://api.map.baidu.com/geocoder/v2/?' +
            `&location=${lat.toFixed(5)},${lng.toFixed(5)}&output=json&pois=1&ak=${this.config.baidu.ak}`, { dataType: 'json' });
      return result.res.data.result.formatted_address;
    } catch (e) {
      this.ctx.logger.error(e);
      throw e;
    }
  }
}

module.exports = GeoService;
