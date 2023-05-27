<template>
	<footer class="ruyuan_footer bg-[#EFEEEE]">
		<div class="pb-[20px] xl:mx-auto xl:max-w-[1200px] xl:pb-[50px] xl:pt-[68px] xl:text-black">
			<div class="flex justify-around">
				<div class="wow animate_animated animate__fadeInLeft hidden xl:mb-[33px] xl:block">
					<div class="flex pb-[20px]">
						<div v-for="(item, index) in bannerArray" :key="index" class="mr-[55px] text-[20px]">
							<NuxtLink :to="item.route" class="text-[#333333]">{{ item.label }}</NuxtLink>
						</div>
					</div>
					<div class="ml-[95px] flex text-[16px]">
						<div>
							<div v-for="(item, index) in brand" :key="index" class="mb-[34px]">
								<NuxtLink :to="item.route" class="text-[#666666]">{{ item.label }}</NuxtLink>
							</div>
						</div>
						<div class="ml-[90px]">
							<div v-for="(item, index) in safe" :key="index" class="mb-[34px]">
								<NuxtLink :to="item.route" class="text-[#666666]">{{ item.label }}</NuxtLink>
							</div>
						</div>
						<div class="ml-[75px]">
							<div v-for="(item, index) in milk" :key="index" class="mb-[34px]">
								<NuxtLink :to="item.route" class="text-[#666666]">{{ item.label }}</NuxtLink>
							</div>
						</div>
					</div>
				</div>
				<div class="wow animate_animated animate__fadeInRight mt-[40px] text-center">
					<img class="mb-[20px] h-[150px] w-[150px] xl:mb-[20px]" src="../assets/image/code.jpg" alt="" />
					<div>入园奶官方二维码</div>
				</div>
			</div>

			<div class="wow animate_animated animate__fadeInUp mt-[20px] text-center text-[14px] xl:mt-[36px]">
				<p class="xl:pb-[10px]">
					<span>一起牛 - 提供母婴用品，奶粉批发</span>
					<br class="xl:hidden" />
					<span class="hidden px-[5px] xl:inline-block">|</span>
					<a href="https://beian.miit.gov.cn/" target="_blank" class="text-black">豫ICP备18025003号-1</a>
					<br class="xl:hidden" />
					<span class="hidden px-[5px] xl:inline-block">|</span>
					<a href="https://www.yqnmy.com/extra/Infringement.html" target="_blank" class="text-black"
						>侵权投诉</a
					>
					<br class="xl:hidden" />
					<span class="hidden px-[5px] xl:inline-block">|</span>
					<a href="https://img.yqnmy.com/yiqiniu_cert/NCFD.png" target="_blank" class="text-black"
						>食品经营许可证：JY14101030146852</a
					>
				</p>
				<p class="pb-[10px]">
					<a href="https://img.yqnmy.com/yiqiniu_cert/CBL.png" target="_blank" class="text-black"
						>统一社会信用代码: 91410103397933473E</a
					>
					<br class="xl:hidden" />
					<span class="hidden px-[5px] xl:inline-block">|</span>
					<a href="https://img.yqnmy.com/yiqiniu_cert/VTBL.png" target="_blank" class="text-black"
						>增值电信业务许可证: 豫B2-20180357</a
					>
				</p>
				<p>公司名称：郑州聚爱商贸有限公司</p>
			</div>
		</div>
	</footer>
</template>

<script setup>
const bannerArray = [
	{
		value: 0,
		label: '首页',
		route: '/index',
	},
	{
		value: 1,
		label: '关于入园奶',
		route: '/about',
	},
	{
		value: 2,
		label: '产品品质',
		route: '/product',
	},
	{
		value: 3,
		label: '品牌产品',
		route: '/brand',
	},
	{
		value: 4,
		label: '新闻活动',
	},
	{
		value: 5,
		label: '正品购买',
	},
	{
		value: 6,
		label: '产品追溯',
	},
];
const brand = [
	{
		value: 0,
		label: '品牌故事',
		route: '/about',
	},
	{
		value: 1,
		label: '品牌理念',
		route: '/about/notion',
	},
	{
		value: 2,
		label: '品牌文化',
		route: '/about/culture',
	},
];
const safe = [
	{
		value: 0,
		label: '安全体系',
		route: '/product',
	},
	{
		value: 1,
		label: '严格品控',
		route: '/product/control',
	},
];
const milk = [
	{
		value: 0,
		label: '入园壮',
		route: '/brand',
	},
	{
		value: 2,
		label: '倍乐高',
		route: '/brand/lego',
	},
];
</script>

<style lang="less" scoped>
.ruyuan {
	&_footer {
		&_icon {
			background: url(../assets/image/logo.png) no-repeat 50% / contain;
		}
		a:hover {
			color: #e4040e;
		}
	}
}
</style>
