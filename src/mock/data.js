import Mock from 'mockjs'
export default {
	// 登陆
	login: confit => {
		return Mock.mock({
			code: 1
		});
	},
  // 我的订单
  getList: confit => {
  	return Mock.mock({
  		code: 1,
      list:[
        {
          code:111,
          state:'未完成',
          orde_number:13333333333
        },
        {
          code:111,
          state:'上传失败',
          orde_number:13333333333
        }
      ]
  	});
  },
  // 我的订单
  uploadPhoto: confit => {
  	return Mock.mock({
  		code: 0,
      name:'XXX',
      address:'XXXXXXXXXXXXXX',
      idCard:'330104192222222222',
      endTime:'2019-02-02'
  	});
  },
  // 下一步
  checkInfo: confit => {
  	return Mock.mock({
  		code: 0,
      order_name:'XXX'
  	});
  },
  // 发送图形验证码
  sendImgYzm: confit => {
  	return Mock.mock({
  		code: 0
  	});
  },
  // 新号卡激活
  verification: confit => {
  	return Mock.mock({
  		code: 0
  	});
  },
  // 获取唇语
  getChunyu: confit => {
  	return Mock.mock({
  		code: 0,
      number:1111
  	});
  },
  // 上传视频
  uploadVideo: confit => {
  	return Mock.mock({
  		code: 0,
  	});
  },
  // changestate
  changestate: confit => {
  	return Mock.mock({
  		code: 2,
  	});
  },
   // imginfo
  imginfo: confit => {
  	return Mock.mock({
  		code: 2,
  	});
  },
}
