import axios from '@/utils/axios';

// 首页详情
export const homeInfo = () => {
	return axios.request({
		url: '/shop/cms/info',
		method: 'GET',
	});
};
