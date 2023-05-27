# 入园奶官网

- nuxt3 + pinia + axios + vueuse + tailwind + view-ui-plus + wowjs
- Nuxt路由基于vue-router，根据文件名从pages/目录中创建的每个组件生成路由（也可手动配置，没必要）。页面文件创建请严格按照nuxt命名约定来创建。
- Nuxt直接自动导入在定义目录中创建的文件:
-- components/ for Vue components.
-- composables/ for Vue composables.
-- utils/ for helper functions and other utilities.

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## 使用pinia

- 拥有组合式 API 的 Vue 状态管理库。可看作vue3.0 的 vuex, 详情用法见[文档](https://pinia.vuejs.org/zh/ssr/nuxt.html)

### 创建
```
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
```
### 使用
```
<script setup>
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
counter.count++
// 自动补全！ ✨
counter.$patch({ count: counter.count + 1 })
// 或使用 action 代替
counter.increment()
</script>
<template>
  <!-- 直接从 store 中访问 state -->
  <div>Current Count: {{ counter.count }}</div>
</template>

// 为实现更多高级用法，你甚至可以使用一个函数 (与组件 setup() 类似) 来定义一个 Store：

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

## 使用VueUse工具集（通用函数插件)

- [VueUse](https://www.vueusejs.com/)
- Nuxt 3中，使用VueUse中的函数，可能不会自动导入，请使用显式导入。

## 在 Less 中使用Tailwind时，您不能嵌套 Tailwind 的@screen指令。

- [Tailwind](https://www.tailwindcss.cn/)

- 尽量避免在less中使用Tailwind，封装组件时，最好使用less单独进行样式书写；less中使用Tailwind基础原子类，不可使用函数式原子类。使用常规媒体查询和 theme()

```
.card {
  @apply rounded-none;

  @media (min-width: theme('screens.sm')) {
    @apply rounded-lg;
  }
}
```

- 在顶层使用@screen指令

```
.card {
  @apply rounded-none;
}
@screen sm {
  .card {
    @apply rounded-lg;
  }
}
```

## [wowjs](https://wowjs.uk/)

- 结合[animate.css](https://animate.style/)实现页面动画加载
