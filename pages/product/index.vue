<template>
	<div>
		<product-quality />
	</div>
</template>

<script setup>
import { useStorage } from '@vueuse/core';
import { homeInfo } from '@/apis/home';
const { $wow } = useNuxtApp();

const test = useStorage('my-store', { hello: 'hi', greeting: 'Hello' });

useHead({
	title: '安全体系-入园奶官网',
	meta: [],
	bodyAttrs: {},
	script: [],
});

async function getHomeInfo() {
	try {
		const data = homeInfo();
		console.log(data);
	} catch {
		// catch
	}
}

onMounted(() => {
	$wow().init();
	getHomeInfo();
});
</script>
