<template>
    <div class="contents">
        <h1>关于Electron和Node.js</h1>
        <div class="manual">
            <h3>Electron是什么?</h3>
            <p>
                Electron是一个开源框架,使用JavaScript、HTML和CSS构建桌面应用程序。
                它允许使用Node.js(作为后端)和Chromium(作为前端)
                完成桌面GUI应用程序的开发。
            </p>
            <p>
                Electron可以用于构建具有HTML、CSS、JavaScript的跨平台桌面应用程序,
                它通过将Chromium和Node.js合并到一个运行的环境中来实现这一点。
                应用程序可以打包到Mac、Windows和Linux系统上
            </p>
            <h3>Node.js是什么?</h3>
            <p>
                Node.js 是一个开源和跨平台的 JavaScript 运行时环境。 它是几乎任何类型项目的流行工具！
                当 Node.js 执行 I/O 操作时,如从网络读取、访问数据库或文件系统,Node.js 不会阻塞线程和浪费 CPU 周期等待,
                而是会在响应返回时恢复操作。
            </p>
            <p>Node.js 在浏览器之外运行 V8 JavaScript 引擎(Google Chrome 的内核)。 这使得 Node.js 非常高效。</p>
            <p> Node.js 应用在单个进程中运行，无需为每个请求创建新线程。
                Node.js 在其标准库中提供了一组异步 I/O 原语，以防止 JavaScript 代码阻塞,
                并且通常,Node.js中的库是使用非阻塞范例编写的这使得阻塞行为成为异常而不是常态。
                这使得 Node.js 可以使用单个服务器处理数千个并发连接,而不会引入管理线程并发的负担(这可能是错误的重要来源)。
            </p>
            <p>
                Node.js 具有独特的优势,
                因为数百万为浏览器编写 JavaScript 的前端开发者现在除了客户端代码之外,
                还能够编写服务器端代码,而无需学习完全不同的语言。
            </p>
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