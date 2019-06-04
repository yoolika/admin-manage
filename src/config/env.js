/**
 * 配置编译环境和线上环境
 */

let baseUrl = ''; 
let routerMode = 'hash';
let baseImgPath;
let pageSize = 10

if (process.env.NODE_ENV == 'development') {
	// baseUrl = 'http://127.0.0.1:3000';
	// baseUrl = 'https://www.easy-mock.com/mock/5c3c4a64687e5c3ded21833b/vm'
	baseUrl = '';
    // baseImgPath = '../assets/img/';
}else{
	baseUrl = 'http://127.0.0.1:3000';
    baseImgPath = '//elm.cangdu.org/img/';
}

export {
	baseUrl,
	routerMode,
	baseImgPath,
	pageSize
}