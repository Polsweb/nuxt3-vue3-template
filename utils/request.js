import axios from 'axios';
import { useStorage } from '@vueuse/core';
import { Modal, Spin } from 'view-ui-plus';
import { objEqual } from './util';

// const router = useRouter();
const AUTHORIZATION = useStorage('AUTHORIZATION');

// 存储每个请求的取消函数和标识
const pending = [];
// 移除请求
const removePending = (url) => {
	for (const p in pending) {
		if (pending[p].url === url) {
			pending.splice(p, 1);
		}
	}
};
// 判断参数是否一致
const cutParams = (params, cparams) => {
	return objEqual(params, cparams);
};
// 判断当前请求是否与上次一致
const cutReg = (config) => {
	const params = config.body ? config.data : config.params;
	const key = config.body ? 'data' : 'params';

	for (const p in pending) {
		if (pending[p].url === config.url && cutParams(params, pending[p][key])) {
			return true;
		}
	}
};

class HttpRequest {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	getHeadConfig() {
		const config = {
			baseURL: this.baseUrl,
			headers: {
				Authorization: AUTHORIZATION,
			},
			timeout: 50000,
		};
		return config;
	}

	interceptors(instance) {
		// 请求拦截
		instance.interceptors.request.use(
			(config) => {
				// 可添加全局的loading...
				if (config.method.toLocaleUpperCase() == 'POST') {
					// 手动设置body参数
					config.body = config.data;
				} else {
					Spin.show();
				}
				// this.lock(); //锁定当前实例，后续请求会在拦截器外排队
				if (cutReg(config)) {
					// 请求重复，终止
					const err = new Error('重复请求已拦截');
					err.request = config;
					return Promise.reject(err);
				}
				pending.push(config);
				return config;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		// 响应拦截
		instance.interceptors.response.use(
			(res) => {
				Spin.hide();
				// 移除请求
				removePending(res.request.url);
				// 根据后端返回数据，可统一处理. 目前仅处理400 401(待完善)
				// this.lock(); //锁定当前实例，后续请求会在拦截器外排队
				switch (res.data.code) {
					case 400:
						instance.interceptors.response.lock(); //锁定当前实例，后续请求会在拦截器外排队
						Modal.error({
							title: '温馨提示',
							content: res.data.msg,
							success(btn) {
								if (btn.confirm) {
									if (res.request.method.toLocaleUpperCase() == 'GET') {
										// 返回上一页
										// router.back();
									}
								}
								instance.interceptors.response.unlock(); //解锁后，会继续发起请求队列中的任务
							},
						});
						break;
					case 401:
						// 登录失效
						instance.interceptors.response.lock(); //锁定当前实例，后续请求会在拦截器外排队
						// 登录失效，或者需要登录状态操作的接口
						Modal.error({
							title: '温馨提示',
							content: res.data.msg,
							success(btn) {
								if (btn.confirm) {
									if (res.request.method.toLocaleUpperCase() == 'GET') {
										// router.push({ path: "/login" });
									}
								}
								instance.interceptors.response.unlock(); //解锁后，会继续发起请求队列中的任务
							},
						});
						break;
					default:
						break;
				}
				return res;
			},
			(error) => {
				Spin.hide();
				// 移除请求
				removePending(error.request.url);
				return Promise.reject(error);
			},
		);
	}

	request(options) {
		const instance = axios.create();
		options = Object.assign(this.getHeadConfig(), options);
		this.interceptors(instance, options.url);
		return instance(options);
	}
}

export default HttpRequest;
