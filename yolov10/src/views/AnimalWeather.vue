<template>
    <div class="content-we">
        <div class="weather-card" v-for="(item, index) in weatherInfo" :key="index">
            <div class="left-we">
                <h3>{{ item.fxDate }}</h3>
                <p>天气: {{ item.textDay }}转{{ item.textNight }} </p>
                <p>温度: {{ item.tempMin }}-{{ item.tempMax }} 湿度:{{ item.humidity }} </p>
                <p>大气压强: {{ item.pressure }}</p>
            </div>
            <div class="right-we"> <i style="font-size: 4em;" :class="qi+item.iconDay" ></i> </div>
        </div>
    </div>
</template>

<script setup>

import { ref, inject, onMounted } from 'vue'
const axios = inject('axios')
const qi = 'qi-'
const weatherApi = axios.create({
});
const apiUrl = 'https://devapi.qweather.com/v7/weather/7d?location=101240701&key=b28ec63f2e384dfebca5d16b34843b3a'
const weatherInfo = ref()
const getWeatherInfo = async () => {
    const result = await weatherApi.get(apiUrl)
    // console.log( result.data.daily);
    weatherInfo.value = result.data.daily
}
onMounted(() => {
    getWeatherInfo()
})

</script>

<style scoped>
.content-we {
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
}

.left-we {
    min-width: 60%
}

.weather-card {
    display: flex;
    margin-top: 20px;
    margin-left: 20px;
    padding: 5px;
    height: 170px;
    width: 250px;
    background: rgba(233, 240, 234, 0.5);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.right-we {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.right-we>img {
    object-fit: cover;
    max-width: 60%;
    height: auto;
}
</style>