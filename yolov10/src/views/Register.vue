<template>
    <div class="re-con">
        <div class="re-card">
            <div class="re-form">
                <n-space vertical>
                    <h1>注册</h1>
                    <n-input v-model:value="account" type="text" placeholder="请输入账号" />
                    <n-input v-model:value="password" type="password" show-password-on="mousedown" placeholder="密码"
                        :maxlength="10" />
                        <div class="di-btn">
                            <n-button style="margin-top: 20px;" @click.prevent="uploadRe">注册</n-button>
                            <n-button style="margin-top: 20px;" @click.prevent="goLogin">返回登录</n-button>
                        </div>
                    
                </n-space>
            </div>
        </div>

    </div>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router';
const message = inject('message')
const router = useRouter()
let password = ref('')
let account = ref('')
const uploadRe = () => {
    console.log('账号:', account.value)
    console.log('密码:', password.value)
    if (account.value && password.value) {
        window.API.sendData(account.value, password.value, 'false')
        window.API.getOutFile((value) => {
            if (value == 'false') {
                message.warning(
                    "账号已注册",
                    { duration: 1000 }
                )
            } else {
                console.log('1');
                message.success(
                    "注册成功",
                    { duration: 1000 }
                )
            }
        })

    } else if (!account.value) {
        message.warning(
            '账号不能为空!',
            { duration: 1000 }
        )
    } else {
        message.warning(
            '密码不能为空!',
            { duration: 1000 }
        )
    }
}
const goLogin = ()=>{
    router.push({path: '/'})
}
</script>

<style scoped>
.re-con {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../public/img/Blueming_040.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
}

.re-con::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    z-index: -1;
}

.re-card {
    width: 25%;
    height: auto;
    background: rgba(255, 255, 255, 0.8);
    padding: 40px 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    display: flex;
    justify-content: center;
}
.re-form{
    width: 60%;
}
.di-btn{
    display: flex;
    justify-content: space-between;
}
</style>