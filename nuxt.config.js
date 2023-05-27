// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		// 页面可使用useHead单独设置，达到seo的优化（详见官方文档）
		head: {
			viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
			title: '入园奶官网-宝宝要入园，就喝入园奶',
			meta: [
				{
					name: 'keywords',
					content: '幼儿园，上幼儿园，长高，奶粉，喝奶粉，喝长高奶粉，喝入园奶，入园奶官网，入园奶官方网站',
				},
				{
					name: 'description',
					content: '入园奶专注儿童身体营养，长高第一奶粉。入园奶，上幼儿园一定要喝的奶！',
				},
			],
			script: [
				// 三方js（收录脚本等可在此引入）
			],
		},
	},
	ssr: true,
	build: {
		chunkSizeWarningLimit: 1500,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
			},
		},
		// transpile: process.env.NODE_ENV === 'production' ? ['view-ui-plus'] : [],
	},
	experimental: {
		// when using generate, payload js assets included in sw precache manifest
		// but missing on offline, disabling extraction it until fixed
		payloadExtraction: false,
		inlineSSRStyles: false,
		renderJsonPayloads: true,
	},
	vite: {
		optimizeDeps: {
			include: process.env.NODE_ENV === 'development' ? ['view-ui-plus'] : ['@babel/regenerator'],
		},
		// @babel/regenerator
	},
	css: ['~/assets/css/tailwind.css', '~/assets/css/animation.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
			// 优化生产
			...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
		},
	},
	plugins: [
		// 在plugins中封装百度 谷歌 等统计脚本，可在次引入
	],
	// 代理
	server: true,
	nitro: {
		devProxy: {
			'/shop': {
				target: 'https://www.yqnmy.com/shop',
				changeOrigin: true,
			},
		},
		esbuild: {
			options: {
				target: 'esnext',
			},
		},
		prerender: {
			crawlLinks: true,
			// 手动指定Nitro在构建过程中获取和预渲染的路由。
			routes: ['/'],
		},
	},
	imports: {
		dirs: ['stores'],
	},
	modules: [
		[
			'@pinia/nuxt',
			{
				autoImports: ['defineStore', 'acceptHMRUpdate'],
			},
		],
		'@vueuse/nuxt',
	],
});
