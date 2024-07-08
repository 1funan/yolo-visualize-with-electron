<template>
    <div class="login-container">
        <div class="login-card">
            <h2>登录</h2>
            <form class="login-form">
                <input class="acc" v-model="account" type="text" name="account" placeholder="请输入账号" />
                <br>
                <input class="acc" v-model="password" type="password" name="password" placeholder="请输入密码" />
                <br>
                <div class="btn-re-lo">
                    <button @click.prevent="handleRegister">注册</button> <button @click.prevent="handleLogin"
                        type="submit">提交</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
// import{db,genid} from '../utils/dbUtils'
import { useRouter } from 'vue-router'
const message = inject("message")
const router = useRouter()
const account = ref('')
const password = ref('')

const handleLogin = () => {
    console.log('账号:', account.value)
    console.log('密码:', password.value)
    if (account.value && password.value) {
        window.API.sendData(account.value, password.value, 'true')
        window.API.getOutFile((value) => {
            if (value == 'true') {
                message.success(
                    "登录成功",
                    { duration: 1000 }
                )
                if (account.value == 'admin') {
                    router.push('/dashboard')
                } else {
                    router.push({ path: '/home' })
                }
            } else if (value == '500') {
                message.warning(
                    "密码错误",
                    { duration: 1000 }
                )
            } else {
                message.warning(
                    "账号不存在",
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
const handleRegister = () => {
    router.push({ path: '/register' })
}
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('../public/img/Blueming_040.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
}

.login-container::before {
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

.login-card {
    background: rgba(255, 255, 255, 0.8);
    padding: 40px 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.acc {
    width: 250px;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
    box-sizing: border-box;
}

button {
    margin-right: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

.btn-re-lo {
    display: flex;

    justify-content: space-between;
}
</style>
