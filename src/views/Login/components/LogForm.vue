<template>
  <el-form :model="form" :rules="rules" ref="ruleFormRef">
    <el-form-item prop="username" class="form-item">
      <div class="input-box">
        <p class="label-user" :class="{ active: user_active }">账号</p>
        <el-input
          @focus="userFocus"
          @blur="userBlur"
          @keyup.enter="onSubmit"
          class="login-input user-input"
          :class="{ active: user_border }"
          v-model="form.username"
        ></el-input>
      </div>
    </el-form-item>
    <el-form-item prop="password" class="form-item" style="margin-bottom: 10px">
      <div class="input-box">
        <p class="label-password" :class="{ active: psd_active }">密码</p>
        <el-input
          @focus="psdFocus"
          @blur="psdBlur"
          @keyup.enter="onSubmit"
          class="login-input psd-input"
          :class="{ active: psd_border }"
          type="password"
          v-model="form.password"
        ></el-input>
      </div>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="remember" label="记住密码"></el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button
        class="login-btn"
        color="rgb(40, 138, 232)"
        type="primary"
        @click="onSubmit"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const ruleFormRef = ref<FormInstance>()

const form = reactive<any>({
  login_type: '1',
  username: 'wangshuo',
  password: '123456'
})
const rules = reactive<FormRules<any>>({
  username: [
    {
      required: true,
      message: '必填'
    }
  ],
  password: [
    {
      required: true,
      message: '必填'
    }
  ]
})
async function onSubmit() {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      if (form.username == 'wangshuo' && form.password == '123456') {
        ElMessage.success('登录成功')
        localStorage.setItem('username', form.username)
        localStorage.setItem('password', form.password)
        localStorage.setItem('remember', remember.value ? 'true' : 'false')
        router.push('/home')
      } else {
        ElMessage.error('用户名或密码错误')
      }
    } else {
      // 表单验证未通过
    }
  })
}
// 用户名
const user_active = ref<boolean>(true)
function userFocus() {
  user_active.value = true
  user_border.value = true
  ruleFormRef.value?.clearValidate('username')
}
function userBlur() {
  user_border.value = false
  if (form.username) {
    return (user_active.value = true)
  }
  user_active.value = false
}
// 密码
const psd_active = ref<boolean>(true)
function psdFocus() {
  psd_active.value = true
  psd_border.value = true
  ruleFormRef.value?.clearValidate('password')
}
function psdBlur() {
  psd_border.value = false
  if (form.password) {
    return (psd_active.value = true)
  }
  psd_active.value = false
}

const user_border = ref<boolean>(false)
const psd_border = ref<boolean>(false)
// 记住密码
const remember = ref<boolean>(false)
onMounted(() => {
  const is_remember = localStorage.getItem('remember')
  if (is_remember === 'true') {
    remember.value = true
  } else {
    remember.value = false
  }
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
  if (username) form.username = username
  if (password) form.password = password

  if (form.username) {
    user_active.value = true
  } else {
    user_active.value = false
  }
  if (form.password) {
    psd_active.value = true
  } else {
    psd_active.value = false
  }
})
</script>

<style lang="less" scoped>
.login-input {
  :deep(.el-input__wrapper) {
    width: 360px;
    height: 60px;
    padding: 30px 20px 10px;
    border: 1px solid #686868;
    border-radius: 4px;
    // border: none;
    background: #000;
    box-shadow: none;
    transition: border 0.3s ease;
    .el-input__inner {
      color: #fff !important;
    }
  }
}
.user-input.active {
  :deep(.el-input__wrapper) {
    border: 1px solid #fff;
  }
}
.psd-input.active {
  :deep(.el-input__wrapper) {
    border: 1px solid #fff;
  }
}
.input-box {
  position: relative;
  .label-user {
    color: #c1c1c1;
    font-size: 0.875rem;
    position: absolute;
    line-height: 1.4;
    pointer-events: none;
    top: 20px;
    left: 20px;
    z-index: 1;
    transition: all 0.3s ease;
  }
  .label-user.active {
    color: #c1c1c1;
    font-size: 0.875rem;
    position: absolute;
    line-height: 1.4;
    pointer-events: none;
    top: 10px;
    left: 18px;
    z-index: 1;
    scale: calc(0.8);
  }
  .label-password {
    color: #c1c1c1;
    font-size: 0.875rem;
    position: absolute;
    line-height: 1.4;
    pointer-events: none;
    top: 20px;
    left: 20px;
    z-index: 1;
    transition: all 0.3s ease;
  }
  .label-password.active {
    color: #c1c1c1;
    font-size: 0.875rem;
    position: absolute;
    line-height: 1.4;
    pointer-events: none;
    top: 10px;
    left: 18px;
    z-index: 1;
    scale: calc(0.8);
  }
}
.login-btn {
  width: 360px;
  height: 60px;
}
.form-item {
  margin-bottom: 40px;
}
</style>
