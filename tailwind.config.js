/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
		'./app.vue',
	],
	theme: {
		extend: {
			animation: {
				'bounce-slow': 'bounce 3s ease infinite',
				'spin-slow': 'spin 3s linear infinite',
			},
			transitionProperty: {
				flow: 'background-position',
			},
			backgroundSize: {
				flow: '400% auto',
			},
			backgroundImage: {
				'nuxt-gradient': 'linear-gradient(30deg,#475569,#475569 25%,#0007dc 50%,#5400dc 75%,#dc00bf)',
				'link-white-gradient': 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.8) 40%)',
				'link-black-gradien':
					'linear-gradient(to bottom, rgba(255, 255, 255, 0.7) 60%, rgba(255, 255, 255, 0.9) 40%)',
			},
		},
	},
	plugins: [],
};
