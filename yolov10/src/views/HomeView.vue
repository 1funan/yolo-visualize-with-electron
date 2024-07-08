<template>
    <div class="container">
        <div class="top-item">
            <div class="left-nav">
                <div class="menu">
                    <n-space vertical>
                        <div>
                            <span>选择模型</span>
                            <n-select v-model:value="modelValue" :options="modelOptions" />
                        </div>
                        <div style="margin-top: 10px;">
                            <span>置信度</span>
                            <n-slider v-model:value="confValue" :step="10" />
                        </div>
                        <div style="margin-top: 10px;">
                            <n-space>
                                <n-button @click="upImg">上传图片</n-button>
                                <n-button @click="processImg">处理图片</n-button>
                            </n-space>
                        </div>
                        <div class="links">
                            <n-space justify="space-between">
                                <n-button @click="goAbout">关于</n-button>
                                <n-button @click="goLogin">退出</n-button>
                            </n-space>
                        </div>
                    </n-space>
                </div>

            </div>
            <div class="right-content">
                <div class="img-box" v-if="!inPath"></div>
                <div class="img-box" v-if="inPath">
                    <img :src="inPath" alt="Original Image">
                    <p>上传的图片</p>
                </div>
                <div class="img-box" v-if="outPath">
                    <img :src="outPath" alt="Original Image">
                    <p>处理后的图片</p>
                </div>
                <div class="img-box" v-if="isProcessing">
                    <n-spin size="medium" show="true" />
                </div>
            </div>
        </div>
        <div class="bottom-item">
            <n-table :bordered="false" :single-line="false">
                <thead>
                    <tr>
                        <th>上传路径</th>
                        <th>保存路径</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ inPath }}</td>
                        <td>{{ outPath }}</td>
                    </tr>
                    <tr>
                        <td>...</td>
                        <td>...</td>
                    </tr>
                </tbody>
            </n-table>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, reactive, watch, inject } from 'vue'
const dialog = inject("dialog")
const message = inject("message")
const router = useRouter()
let isUp = ref(false)
// import { router } from 'vue-router'
let modelValue = ref('yolov10n.pt')
let inPath = ref('')
let outPath = ref('')
let isProcessing = ref(false)

let modelOptions = reactive([
    {
        label: "yolov10n",
        value: "yolov10n.pt",
    },
    {
        label: 'yolov10s',
        value: "yolov10s.pt"
    },
    {
        label: 'yolov8n',
        value: "yolov8n.pt"
    },
    {
        label: "best",
        value: "best.pt"
    }
])
let confValue = ref(10)
watch(modelValue, (newValue, oldValue) => {
    console.log(newValue);
})
watch(outPath, (newValue, oldValue) => {
    console.log(newValue);
    message.success(
        "处理完成",
        { duration: 2000 }
    )

})
function goAbout() {
    router.push({ path: '/about' })
}
function goLogin() {
    router.push({ path: '/' })
}
function upImg() {
    window.API.openFile()
    window.API.getIMGData((value) => {
        inPath.value = value
    })
    isUp.value = true
}
function processImg() {
    if (isUp.value == true) {
        isProcessing.value = true
        window.API.sendYoloProp(confValue.value, inPath.value, modelValue.value, 'True')
        window.API.getOutFile((value) => {
            outPath.value = value
            isUp.value = false
            isProcessing.value = false
        })
    } else {
        dialog.warning({
            title: '警告',
            content: '请上传图片',
            positiveText: '确定',
        })
    }
}
</script>

<style scoped>
.container {
    margin: 0 auto;
    margin-top: 80px;
    width: 90vw;
    height: 80vh;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    overflow: hidden;
    /* border: 1px solid green; */
    display: flex;
    flex-direction: column;
}

.top-item {
    width: 100%;
    min-height: 70%;
    display: flex;
}

.bottom-item {
    margin-top: 20px;
    flex: 1;
}

.left-nav {
    margin: 20px 20px;
    height: 80%;
    min-width: 30%;
}

.right-content {
    margin-left: 20px;
    flex: 1;
    display: flex;
    justify-content: space-between;
}

.img-box {
    margin-top: 20px;
    margin-right: 20px;
    width: 300px;
    height: 300px;
}

.img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.img-box>p {
    text-align: center;
}

.menu {
    width: 80%;
    height: 90%
}

.links {
    margin-top: 80px;
    width: 100%;
    height: 60px;
}
</style>