<template>
    <div class="about-content">
        <div class="left-menu">
            <div class="nav-menu">
                <ui>
                    <li @click="GoYolov10">Yolov10</li>
                    <li @click="GoVue">Vue</li>
                    <li @click="GoDB">sqlite3</li>
                    <li @click="GoElectron">electron</li>
                    <li @click="GoHome">Home</li>
                </ui>
            </div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const GoYolov10 = () => {
    router.push('/about/aboutYolo')
}
const GoDB = () => {
    router.push('/about/aboutDB')
}
const GoVue = () => {
    router.push('/about/aboutVue')
}
const GoElectron = () => {
    router.push('/about/aboutElectron')
}
const GoHome = () => {
    router.push('/home')
}
</script>

<style>
.about-content {
    height: 100vh;
    display: flex;
    gap: 20px;
    background-image: url('../public/img/Blueming_040.jpg');
    background-size: cover;
    background-position: center;
    overflow: hidden;
}

.left-menu {
    min-width: 20%;
    padding: 20px;
    display: flex;
}

.content {
    flex-grow: 1;
    margin-right: 100px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    background: rgba(218, 229, 218, 0.5);
}

.nav-menu {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 80%;
    height: 60%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);

    >ui {
        list-style-type: none;
        padding: 0;
    }

    >ui>li {
        text-align: center;
        display: block;
        padding: 10px 20px;
        margin-top: 20px;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }
}
</style>