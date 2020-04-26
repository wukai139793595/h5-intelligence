import Mock from 'mockjs'
import data from './data'

export default {
  startMock() {
    Mock.setup({
      timeout: '1350-1600'
      //timeout: '0'
    })

    // 登陆
    Mock.mock(/\/api\/login/, 'post', data.login);
    Mock.mock(/\/api\/getList/, 'post', data.getList);
    Mock.mock(/\/api\/uploadPhoto/, 'post', data.uploadPhoto);
    Mock.mock(/\/api\/checkInfo/, 'post', data.checkInfo);
    Mock.mock(/\/api\/sendImgYzm/, 'get', data.sendImgYzm);
    Mock.mock(/\/api\/verification/, 'post', data.verification);
    Mock.mock(/\/api\/getChunyu/, 'get', data.getChunyu);
    Mock.mock(/\/api\/uploadVideo/, 'post', data.uploadVideo);
    Mock.mock(/\/api\/changestate/, 'post', data.changestate);
    Mock.mock(/\/api\/imginfo/, 'post', data.imginfo);
  }
}
