import axios from 'axios'
import qs from 'qs'
import { setStore, getStore } from '@/common/js/storage';
import router from '@/router';
import store from '@/store';
import { getCookie } from '@/common/js/cookie';
import { Toast, Loading } from 'vant'

// 创建axios实例
const Axios = axios.create();

// 根据不同模式切换不同的路径
if (process.env.NODE_ENV == 'development') {
    Axios.defaults.baseURL = '/';
} else if (process.env.NODE_ENV == 'debug') {
    Axios.defaults.baseURL = '/';
} else if (process.env.NODE_ENV == 'production') {
    Axios.defaults.baseURL = '/';
}
Axios.defaults.timeout = 30000; // 超时时间
Axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
Axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
Axios.defaults.responseType = 'json'; // 返回数据类型

function mesError(msg){
	console.log(msg);
}


// POST等传参序列化(添加请求拦截器)
Axios.interceptors.request.use(config => {
	// 在发送请求之前做某件事
	if(!config.headers['Content-Type']) {
		if ( config.method === "post" || config.method === "put" || config.method === "delete" ){
			// 序列化
			config.data = qs.stringify(config.data);
		}
	}
	// 若是有做鉴权token , 就给头部带上token
	if (sessionStorage.getItem('token')) {
		config.headers['token'] = sessionStorage.getItem('token');
	}

	// 特殊路径 请求超时时间 单独设定
	// if (config.url.indexOf('/cordercore-74f4564b7-m47d4/api-ordershopcart/address-selection/copy-resources') >= 0) {
	// 	config.timeout = "60000"  // 60秒
	// }

	return config;
}, error => {
	let msg = "Before Ajax Error";
	mesError(msg);
	return Promise.reject(msg)
});

let errorMessageList = [];//历史错误提示列表
let errorMessageArr = [];//历史错误提示列表
let timeoutFlag = 0;

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use( res => {
	let resData = res.data;

	// 200: 请求处理成功
	if (res.status == 200) {
		return res;
	};
	let msg = "status格式错误！"
	mesError(msg);
	return Promise.reject(msg);
}, error => {
	Toast('ajax error');
	return Promise.reject(error);
});

export default Axios;
