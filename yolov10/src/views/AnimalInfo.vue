<template>
    <div class="table-animal">
        <n-space vertical>
            <n-table striped>
                <thead>
                    <tr>
                        <th>数量</th>
                        <th>动物</th>
                        <th>创建时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(items, index) in animalInfo" :key="index">
                        <td>{{ items.num }}</td>
                        <td>{{ items.label }}</td>
                        <td>{{ items.create_time }}</td>
                    </tr>
                </tbody>
            </n-table>
        </n-space>
        <Bar :data="chartData" :options="options" />
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import {
    Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
let animalInfo = reactive([])
let animalSum = reactive({})
const labels_1 = ref(['zebra', 'elephant'])
const data_1 = ref([10, 80])

const getStaffInfo = () => {
    window.API.sendRequestAnimal()
    window.API.getAnimalData((value) => {
        value.map(item => {
            animalInfo.push(item)
            animalSum[item.label] = (animalSum[item.label] || 0) + parseInt(item.num);
        })
        labels_1.value = Object.keys(animalSum);
        data_1.value = Object.values(animalSum);
    })
}

let options = reactive({
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'ANIMAL SUM' // 图表标题
        },
        legend: {
            position: 'top'
        },
        tooltip: {
            enabled: true
        }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
})
const chartData = computed(() => {
    return {
        labels: labels_1.value,
        datasets: [
            {
                data: data_1.value,
                label: 'Animal Count',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(50, 35, 186,0.2)',
                    'rgba(145, 132, 36, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(50, 35, 186,1)',
                    'rgba(145, 132, 36, 1)'
                ],
                borderWidth: 1,
            },
        ],
    }
})
onMounted(() => {
    getStaffInfo()
})
</script>

<style scoped>
.table-animal {
    width: 80%;
    height: auto;
    margin-left: 50px;
}

.canvas-i {
    display: flex;
    justify-content: center;
    width: 70%;
    height: 50%;
}
</style>