<template>
	<div>
		<home-banner />
	</div>
</template>

<script setup>
import { useStorage } from '@vueuse/core';
// import { homeInfo } from '@/apis/home';
const { $wow } = useNuxtApp();
const test = useStorage('my-store', { hello: 'hi', greeting: 'Hello' });

// async function getHomeInfo() {
// 	try {
// 		const data = homeInfo();
// 		console.log(data);
// 	} catch {
// 		// catch
// 	}
// }

onMounted(() => {
	$wow().init();
	// getHomeInfo();
});
</script>
