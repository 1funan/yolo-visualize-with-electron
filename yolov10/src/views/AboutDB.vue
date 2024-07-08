<template>
    <div class="contents">
        <h1>关于数据库</h1>
        <div class="manual">
            <p>SQLite是一个进程内的轻量级嵌入式数据库,它的数据库就是一个文件，实现了自给自足、无服务器、零配置的、
                事务性的SQL数据库引擎。它是一个零配置的数据库,这就体现出来SQLite与其他数据库的最大的区别:
                SQLite不需要在系统中配置,直接可以使用。且SQLite不是一个独立的进程,可以按应用程序需求进行静态或动态连接。
                SQLite可直接访问其存储文件。
            </p>
            <h3>SQLite对于其他数据库有什么优势:</h3>
            <li>不需要配置，不需要安装和管理</li>
            <li>不需要一个单独的服务器进程或操作的系统（无服务器的）</li>
            <li>一个完整的SQLite数据库存储在一个单一的跨平台的磁盘文件上</li>
            <li>QLite是非常小的,轻量级的数据库,完全配置时小于400KiB,省略可选功能配置时小于250KiB</li>
            <li>SQLite是一个自给自足的数据库,这也就意味着不需要任何外部的依赖</li>
            <li>SQLite支持SQL92(SQL2)标准的大多数查询语言的功能</li>
            <li>SQLite可在UINX(Linux,Max OS-X,Android,iOS)和Windows(Win32,WinCE,WinRT)中运行</li>
            <h3>SQLite命令</h3>
            <p>与关系数据库进行交互的标准SQLite命令类似于SQL。命令包括CREATE, SELECT, INSERT, UPDATE, DELETE和DROP。</p>
            <h3>DBMS-HeiSQL</h3>
            <p>
                HeidiSQL是一款用于简单化迷你的 MySQL 服务器和数据库管理的图形化界面。
                HeidiSQL提供了一个用于在数据库浏览之间切换 SQL 查询和标签带有语法突出显示的简单易用的界面。其它功能包括BLOB
                和 MEMO 编辑,大型SQL脚本支持,用户进程管理等,该软件资源开放。
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