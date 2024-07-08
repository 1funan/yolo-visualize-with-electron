<template>
    <div class="contents">
        <div class="manual">
            <h1>关于Vue及其生态</h1>
            <h3>关于Vue</h3>
            <p>Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web 世界是十分多样化的，
                不同的开发者在 Web 上构建的东西可能在形式和规模上会有很大的不同。考虑到这一点,Vue
                的设计非常注重灵活性和“可以被逐步集成”这个特点。根据你的需求场景，你可以用不同的方式使用 Vue
            </p>
            <li>无需构建步骤，渐进式增强静态的 HTML</li>
            <h3>关于naive-ui</h3>
            <p>Naive UI 是一个专为 Vue 3
                构建的现代、轻量级且高度可定制的组件库，由图森未来
                (TuSimple)团队开源并维护。此库专注于提供一系列简洁、直观且易于使用的界面元素,旨在加速Web应用程序的开发过程。
                以下是关于Naive
                UI的一些关键特性与信息:</p>
            <li>Vue 3 支持: Naive UI 仅支持 Vue 3,充分利用了Vue 3的响应式系统和Composition API,为开发者带来最新的框架特性和性能优化。</li>
            <h3>关于vue-router</h3>
            <p>Vue Router 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成,让用 Vue.js 构建单页应用变得轻而易举。功能包括:</p>
            <li>模块化、基于组件的路由配置</li>
            <h3>关于vite</h3>
            <p>Vite(法语意为 "快速的"，发音 /vit/，发音同 "veet")是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成:</p>
            <li>一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新(HMR)。</li>
            <li>一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。</li>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
h1 {
    text-align: center;
}

p {
    color: green;
}

.contents {
    height: 100vh;
}

.manual {
    width: 80%;
    padding: 20px 40px;
}
</style>