<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
// 表示表单状态，如果是登录状态就是 true 否则 false
const islogin = ref(true)
const isloginlogin = ref(true)

//element ui
// 这是一个ref，用于引入表单实例
const ruleFormRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
    <div class="bgc">
      <div class="head"></div>
      <div :class="['login-container', islogin ? '' : 'active']">
        <div class="button-wrapper">
          <button class="changebtn" @click="islogin = !islogin">
          <div class="txt">去注册</div>
          <div class ="txt">去登录</div>
          </button>
        </div>
        <div class="login-wrapper">
          <h1 v-if="isloginlogin">欢迎回来</h1>
          <h1 v-else>用户注册</h1>
          <el-form
            v-if="!isloginlogin"
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            :inline="true"
            label-width="120px"
            class="demo-ruleForm"
          >
          <el-form-item label="账号" prop="pass">
            <!-- autocomplete="off" 关闭表单记忆 -->
            <el-input v-model="ruleForm.pass" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" prop="checkPass">
            <!-- <el-col :span="90"> -->
            <el-input
              v-model="ruleForm.checkPass"
              type="password"
              autocomplete="off"
              show-password
            />
            <!-- </el-col> -->
          </el-form-item>
          <el-form-item class="el-sub">
            <el-button type="primary" @click="submitForm(ruleFormRef)"
              >用户登录
            </el-button>
          </el-form-item>
          <div class="admin-sub" @click="submitForm(ruleFormRef)">管理员登录</div>
        </el-form>
        <el-form
            v-else
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            :inline="true"
            label-width="120px"
            class="demo-ruleForm"
          >
          <el-form-item label="账号" prop="pass">
            <el-input v-model="ruleForm.pass" type="text" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="密码" prop="checkPass">
            <!-- <el-col :span="90"> -->
            <el-input
              v-model="ruleForm.checkPass"
              type="password"
              autocomplete="off"
              show-password
            />
            <!-- </el-col> -->
          </el-form-item>
          <el-form-item class="el-sub">
            <el-button type="primary" @click="submitForm(ruleFormRef)"
              >用户登录
            </el-button>
          </el-form-item>
          <div class="admin-sub" @click="submitForm(ruleFormRef)">管理员登录</div>
        </el-form>
        </div>
      </div>
      <div class="foot"></div>
    </div>
</template>

<style scoped>
.bgc {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: rgb(0,106,255);
}
.head {
  position: absolute;
  background-color: rgb(34,130,254);
  height: 900px;
  width: 900px;
  border-radius: 50%;
  right: -450px;
  top: -450px;
}
.foot {
  position: absolute;
  background-color: rgb(34,130,254);
  height: 900px;
  width: 900px;
  border-radius: 50%;
  left: -450px;
  bottom: -450px;
}
.login-container {
  display: flex;
  height: 400px;
  width: 700px;
  background-color: white;
  z-index: 1;
  border-radius: 30px;
  overflow: hidden;
}
.button-wrapper {
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 35%;
  background-color: pink;
  transition: all 1s ease-in-out;
}
.changebtn {
  height: 40px;
  width: 70px;
  border-radius: 18px;
  border: 0;
  overflow: hidden;
  position: absolute;
}
.txt {
    transition: all 1s ease-in-out;
    font-size: 17px;
    font-family: 'FZShuTi';
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 40px;
}

/* 背景图片伪元素 */
.button-wrapper::after {
  content: '';
  background-image: url('@/assets/images/login-bgc.jpg');
  background-size: 900px 400px;
  background-position: top left;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: all 1s ease-in-out;
}

/* 表单模块 */
h1 {
  width: 100%;
  text-align: center;
  margin: 30px 0;
}
.login-wrapper {
  width: 65%;
  display: inline-block;
  transition: all 1s ease-in-out;
}
.el-form-item {
  margin: 20px 0;
}
.el-sub {
  display: block;
  width: 100%;
  margin-left: 10%;
}
.el-button {
  width: 75%;
}
.admin-sub {
  margin-left: 69%;
  font-size: 15px;
  cursor: pointer;
}
.admin-sub:hover {
  color: rgb(0,106,255);
  text-decoration-line: underline
}

/* active块 */
.active .button-wrapper {
    transform: translateX(calc(700px - 100%));
}
.active .txt:first-child {
    margin-top: -40px;
}
.active .button-wrapper::after {
  background-position: top right;
}
.active .login-wrapper{
  transform: translateX(calc(100% - 700px)); 
}
</style>
