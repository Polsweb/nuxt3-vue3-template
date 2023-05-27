<template>
	<header class="ruyuan_header fixed left-0 right-0 top-0 z-[99] h-[70px] bg-[#f7f7f7]">
		<div
			class="flex items-center justify-between bg-[#ffffff] p-[5px] xl:relative xl:z-[98] xl:mx-auto xl:flex xl:h-[70px] xl:max-w-[1200px] xl:items-center xl:bg-[#ffffff] xl:max-md:px-4"
		>
			<div class="wow animate_animated animate__fadeInLeft">
				<a href="javascript:void(0)" class="ruyuan_wrap_icon block h-[60px] w-[152px]"></a>
			</div>
			<div class="wow animate_animated animate__fadeInRight cursor-pointer xl:ml-[170px]">
				<div class="xl:hidden" @click="isShowDrawer = true">
					<Icon type="md-menu" size="32" color="#e4040e" />
				</div>
				<ul class="hidden xl:flex">
					<li v-for="(item, index) in bannerArray" :key="index" class="ruyuan_wrap_box">
						<Dropdown>
							<NuxtLink :to="item.route" :class="['ruyuan_wrap_link']">
								{{ item.label }}
							</NuxtLink>
							<template #list>
								<DropdownMenu
									v-for="(Iitem, Iindex) in item.child"
									:key="Iindex"
									:class="['ruyuan_wrap_list']"
								>
									<DropdownItem
										><NuxtLink class="ruyuan_wrap_item" :to="Iitem.route">{{
											Iitem.label
										}}</NuxtLink></DropdownItem
									>
								</DropdownMenu>
							</template>
						</Dropdown>
					</li>
				</ul>
				<Drawer
					placement="right"
					v-model="isShowDrawer"
					:closable="false"
					width="60"
					class-name="ruyuan_drawer"
				>
					<Menu accordion @on-open-change="handleMenuChange" width="60">
						<div class="flex h-[35px] items-center bg-[#e4040e] pl-[10px]" @click="isShowDrawer = false">
							<img src="../assets/image/close.png" alt="" />
						</div>
						<Submenu v-for="(item, index) in bannerArray" :key="index" :name="index + ''">
							<template #title>
								<div
									class="flex h-[40px] items-center justify-between border-b border-[#e4040e] pb-[30px] pt-[35px]"
								>
									<NuxtLink
										:to="item.route"
										class="text-[15px] text-[#e4040e]"
										@click="handleClickItem"
										>{{ item.label }}
									</NuxtLink>
									<span v-if="item.child">
										<span
											:class="[
												isShowMeun == true && itemIndex == index ? 'hidden' : 'block',
												'text-[20px]',
												'text-[#e4040e]',
											]"
											>+</span
										>
										<span
											:class="[
												isShowMeun == true && itemIndex == index ? 'block' : 'hidden',
												'text-[20px]',
												'text-[#e4040e]',
											]"
											>-</span
										>
									</span>
									<img
										v-else
										src="../assets/image/arrow.png"
										alt=""
										class="inline-block h-[15px] w-[8px]"
									/>
								</div>
							</template>
							<MenuItem
								v-for="(Iitem, Iindex) in item.child"
								:key="Iindex"
								:to="Iitem.route"
								:name="Iindex"
								style="margin: 0 24px; padding: 14px 24px"
								@click="handleClickItem"
							>
								<div class="tems-center flex justify-between">
									<span class="text-[15px] text-[#e4040e]">{{ Iitem.label }}</span
									><img
										src="../assets/image/arrow.png"
										alt=""
										class="inline-block h-[14px] w-[8px]"
									/>
								</div>
							</MenuItem>
						</Submenu>
					</Menu>
				</Drawer>
			</div>
		</div>

		<!-- route.path.includes(item.route) ? 'ruyuan_wrap_active' : '','ruyuan_wrap_link', -->
		<!-- :class="handleRouter(item.route)" -->
	</header>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
// 导航数据及路由
const bannerArray = [
	{
		value: 0,
		label: '首页',
		route: '/',
	},
	{
		value: 1,
		label: '关于入园奶',
		route: '/about',
		child: [
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
		],
	},
	{
		value: 2,
		label: '产品品质',
		route: '/product',
		child: [
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
		],
	},
	{
		value: 3,
		label: '品牌产品',
		route: '/brand',
		child: [
			{
				value: 0,
				label: '入园壮',
				route: '/brand',
			},
			{
				value: 1,
				label: '倍乐高',
				route: '/brand/lego',
			},
		],
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

// 弹出/关闭抽屉
let isShowDrawer = ref();
isShowDrawer.value = false;

// 控制展示+ -号出现1
let isShowMeun = ref();
isShowMeun.value = false;

// 控制展示+ -号出现2
let itemIndex = ref();
itemIndex.value = '-1';

// 控制展示+ -号出现3
function handleMenuChange(value) {
	if (value == '1' || value == '2' || value == '3') {
		isShowMeun = true;
		itemIndex = value;
	} else {
		isShowMeun = false;
	}
}

// 点击导航跳转以后 把导航菜单关闭
function handleClickItem() {
	if (isShowDrawer.value) {
		isShowDrawer.value = false;
	} else {
		isShowDrawer.value = true;
	}
}

// pc端的路由导航处理点击加背景色(未完成)
// function handleRouter(path) {
// 	let arr = ['ruyuan_wrap_link'];
// 	if (route.path == '/' && path == '/') {
// 		arr.push('ruyuan_wrap_active');
// 	} else if (route.path.includes(path)) {
// 		arr.push('ruyuan_wrap_active');
// 	} else {
// 		arr = ['ruyuan_wrap_link'];
// 	}
// 	return arr;
// }
</script>

<style lang="less" scoped>
.ruyuan {
	&_wrap {
		&_icon {
			margin-right: 10px;
			background: url(../assets/image/logo.png) no-repeat 50% / contain;
		}
		&_box {
			margin-right: 30px;
		}
		&_link {
			display: inline-block;
			width: 100px;
			height: 70px;
			line-height: 70px;
			text-align: center;
			font-size: 18px;
			font-weight: bold;
			color: #e4040e;
			background: url(../assets/image/icon.png) no-repeat 50% / contain;
			background-size: 30px 37px;
		}

		&_link:hover,
		&_active {
			color: #ffffff;
			background: url(../assets/image/icon-h.png) no-repeat 50% / contain #e4040e;
			background-size: 30px 37px;
		}

		&_list .ivu-dropdown-item {
			text-align: center !important;
		}
		&_list .ivu-dropdown-item:hover,
		&_active .ivu-dropdown-item {
			background-color: #e4040e;
			color: #ffffff;
		}
		&_list &_item {
			font-size: 15px;
			color: #e4040e;
		}
		&_active .ivu-dropdown-item &_item,
		&_list .ivu-dropdown-item:hover &_item {
			color: #ffffff;
		}
	}
}
</style>
<style>
.ruyuan_drawer .ivu-drawer-body {
	padding: 0 !important;
	overflow: hidden;
}
.ruyuan_drawer .ivu-icon-ios-arrow-down:before {
	content: '';
}
.ruyuan_drawer .ivu-menu-vertical .ivu-menu-submenu-title {
	padding: 0 24px;
}

.ruyuan_drawer .ivu-menu-vertical .ivu-menu-item:last-child {
	border-bottom: 1px solid #e4040e !important;
}
.ruyuan_drawer .ivu-menu .ivu-menu-light .ivu-menu-vertical {
	width: 0 !important;
}
.ruyuan_drawer .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
	background-color: #ffffff !important;
}
.ruyuan_drawer .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
	content: '' !important;
	display: none !important;
}
</style>
