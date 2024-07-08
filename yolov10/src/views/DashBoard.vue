<template>
    <div class="content-da">
        <div class="nav-left">
            <h1>动物园管理系统</h1>
            <div class="nav-card" @click="getWeatherInfo">天气</div>
            <div class="nav-card" @click="getAnimalInfo">动物园信息</div>
            <div class="nav-card" @click="getStaffInfo">员工信息</div>
            <div class="nav-card" @click="getHome">处理界面</div>
        </div>
        <div class="content-dash">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import {  useRouter } from 'vue-router';

const router = useRouter()
const getWeatherInfo = ()=>{
    router.push({path:'/dashboard/weather'})
}
const getAnimalInfo= ()=>{
    router.push({path:'/dashboard/animal'})
}
const getStaffInfo = ()=>{
    router.push({ path: '/dashboard/staff' })
}
const getHome = ()=>{
    router.push({ path: '/home' })
}
</script>

<style scoped>
.content-da{
    display:flex;
    width:100vw;
    height:100vh;
    gap:20px;
    background-image: url('../public/img/Blueming_040.jpg');
    background-size: cover;
    background-position: center;
    overflow: hidden;

}
.nav-left{
    min-width: 20%;
    height: 100%;
    display:flex;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    flex-direction: column;
    align-items: center;

}
.nav-card{
    font-size: large;
    display: flex;
    align-items: center;
    width:70%;
    height:100px;
    padding:10px;
    line-height: 100px;
    text-align:center;
    justify-content:center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}
.content-dash{
    flex:1;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
}
</style>