
function getParam(paramKey){
    //获取当前URL
    var url = location.href;
    //获取要取得的get参数位置
    var get = url.indexOf(paramKey +"=");
    if(get == -1){
        return "";
    }
    //截取字符串
    var getParamStr = url.slice(paramKey.length + get + 1);
    //判断截取后的字符串是否还有其他get参数
    var nextparam = getParamStr.indexOf("&");
    if(nextparam != -1){
        getParamStr = getParamStr.slice(0, nextparam);
    }
    return decodeURIComponent(getParamStr);
}
//获取链接中?后面的的参数
function getRequest() {  
	let theRequest = {};
	let url = window.location.href; //获取url中"?"符后的字串  
	if (url.indexOf("?") > -1) {  
			let str = url.substr(url.indexOf("?")+1);  
			let strs = str.split("&");  
			for(let i = 0; i < strs.length; i ++) {  
				if(strs[i].split("=")[0] != 'cust_order_token') {
					theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1];  
				}					
			}  
			//console.log('this.theRequest',this.theRequest);
	}  
	return theRequest;
}
function getToken(){
	var token = (function(tk){
        if(tk) {
            return '?cust_order_token='+tk
        } else {
            return '';
        }
    }(getParam('cust_order_token')));
    return token;
}


export const getCustToken = function (self,data,callback) {
    return getToken();
}

export const getRequestParams = function (self,data,callback) {
	return getRequest();
}