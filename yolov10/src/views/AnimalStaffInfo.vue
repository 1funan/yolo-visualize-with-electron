<template>
    <div class="content">
        <n-space vertical>
            <n-table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>用户名</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(items, index) in staffInfo" :key="index">
                        <td>{{ items.id }}</td>
                        <td>{{ items.account }}</td>
                        <td>
                            <n-space>
                                <n-button @click.prevent="deleteUser(items.id)">删除用户</n-button>
                            </n-space>
                        </td>
                    </tr>
                </tbody>
            </n-table>
        </n-space>
    </div>
</template>
<script setup>
import { reactive, onMounted, inject } from 'vue';
const dialog = inject('dialog')
const message = inject('message')
let staffInfo = reactive([])
const updateStaffInfo = () => {
    window.API.sendRequestStaff()
    window.API.getStaffData((value) => {
        staffInfo.splice(0, staffInfo.length);
        value.map(item => {
            staffInfo.push(item)
        })
    })
}
const deleteUser = (id) => {
    dialog.warning({
        title: '警告',
        content: '确认删除？',
        positiveText: '是',
        negativeText: '否',
        onPositiveClick: () => {
            window.API.deleteUserInfo(id)
            window.API.getStatus(async (value) => {
                if (value == '200') {
                    message.success('删除成功')
                    updateStaffInfo();
                }
            })
        },
    })
}
onMounted(() => {
    updateStaffInfo()
})
</script>
<style scoped></style>