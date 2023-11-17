<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {userLogin, adminLogin, userSignin} from '../../api/login'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import { useUserStore, useAdminStore } from '../../stores/index'


// import { composeEventHandlers } from 'element-plus/es/utils';
// 表示表单状态，如果是登录状态就是 true 否则 false
const islogin = ref(true)
const isloginlogin = ref(true)
const router = useRouter()
const adminStore = useAdminStore()
const userStore = useUserStore()
//element ui
// 这是一个ref，用于引入表单实例    创建loginFormRef实例
const loginFormRef = ref<FormInstance>()
const signinFormRef = ref<FormInstance>()

// 登录表单元素
const loginForm = reactive({
  username: '',
  pwd: '',
})

const loginRules = reactive<FormRules<typeof loginForm>>({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
  pwd: [{required: true, message: '密码不能为空', trigger: 'blur' }],   // validator: validatePass2, 
})

// 注册表单元素
const signinForm = reactive({
  username: '',
  pwd: '',
  name: '',
  IdNumber: ''
})
//身份证号表单验证函数
const validateIdNumber = (rule: any, value: any, callback: any) => {
  let _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  let _IDre15 =  /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
  if ( _IDRe18.test( value ) || _IDre15.test( value )) {
    callback()
  }else {
    callback(new Error('身份证号格式错误'))
  }
}
const signinRules = reactive<FormRules<typeof signinForm>>({
  username:[{required: true, message: '用户名不能为空',trigger: 'blur' }],
  pwd:[{required: true, message: '密码不能为空',trigger: 'blur' }],
  name:[{required: true, message: '姓名不能为空',trigger: 'blur' },
    { min: 2, max: 18, message: '姓名格式不对', trigger: 'blur' },
  ],
  IdNumber:[
    {required: true, message: '身份证号不能为空',trigger: 'blur' },
    { validator: validateIdNumber, trigger: 'blur' },
    ]
})

// 用户登录接口
const loginSubmitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate().then((valid) => {
    if (valid) {
      console.log('userSubmit!')
      userLogin(loginForm).then((res) => {
        ElMessage({
          message: '欢迎回来',
          type: 'success',
          duration: 1500, // 持续显示时间，单位毫秒
          center: true // 是否居中显示
        })
        router.push('/user')
        userStore.setToken(res.data)
      }).catch(err => {
        ElMessage({
          message: err,
          type: 'error',
          duration: 1500, // 持续显示时间，单位毫秒
          center: true // 是否居中显示
        })
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

//管理员登录接口
const adminSubmitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate().then((valid) => {
    if (valid) {
      console.log('adminSubmit!')
      adminLogin(loginForm).then((res) => {
        ElMessage({
          message: '欢迎您，管理员！',
          type: 'success',
          duration: 1500, // 持续显示时间，单位毫秒
          center: true // 是否居中显示
        })
        router.push('/administrator')
        adminStore.setToken(res.data)
      }).catch(err => {
        ElMessage({
          message: err,
          type: 'error',
          duration: 1500, // 持续显示时间，单位毫秒
          center: true // 是否居中显示
        })
      })
      
      
    } else {
      console.log('error submit!')
      return false
    }
  })
}

//注册接口
const siginSubmitForm = async (formEl: FormInstance | undefined) => {
  if(!formEl) return
  await formEl.validate().then((valid) => {
    if (valid) {
      console.log('submit!')
      userSignin(signinForm).then(() => {
        ElMessage({
          message: '注册成功',
          type: 'success',
          duration: 1500, // 持续显示时间，单位毫秒
          center: true // 是否居中显示
        })
        change()
      }).catch(err => {
        ElMessage({
          message: err,
          type: 'error',
          duration: 1500, // 持续显示时间，单位毫秒
          center: true // 是否居中显示
        })
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}


//reset函数
// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return
//   formEl.resetFields()
// }S


// my js
let timer: number
let changeOk: boolean = true
const change = () => {
  if(changeOk === false) return
  changeOk = false
  islogin.value = !islogin.value
  if(timer)
  {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    isloginlogin.value = !isloginlogin.value
    const authertimer = setTimeout(() => {
      changeOk = true
      clearTimeout(authertimer)
    }, 500)
  }, 500);
}
</script>

<template>
    <div class="bgc">
      <div class="head"></div>
      <div :class="['login-container', islogin ? '' : 'active']">
        <div class="button-wrapper">
          <button class="changebtn" @click="change">
          <div class="txt">去注册</div>
          <div class ="txt">去登录</div>
          </button>
        </div>
        <div class="login-wrapper">
          <h1 v-if="isloginlogin">欢迎回来</h1>
          <h1 v-else>用户注册</h1>
          <el-form
            v-if="isloginlogin"
            ref="loginFormRef"
            :model="loginForm"
            status-icon
            :rules="loginRules"
            :inline="true"
            label-width="120px"
            class="demo-ruleForm"
            autocomplete="off"
          >
          <el-form-item label="用户名" prop="username" class="logincla">
            <!-- autocomplete="off" 关闭表单记忆 -->
            <el-input v-model="loginForm.username" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" prop="pwd" class="logincla">
            <el-input
              v-model="loginForm.pwd"
              type="password"
              autocomplete="off"
              show-password
            />
          </el-form-item>
          <el-form-item class="el-sub logincla">
            <el-button type="primary" @click="loginSubmitForm(loginFormRef)"
              >用户登录
            </el-button>
          </el-form-item>
          <div class="admin-sub" @click="adminSubmitForm(loginFormRef)">管理员登录</div>
        </el-form>
        <el-form
            v-else
            ref="signinFormRef"
            :model="signinForm"
            status-icon
            :rules="signinRules"
            :inline="true"
            label-width="120px"
            class="demo-ruleForm"
            autocomplete="off"
          >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="signinForm.username" type="text" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input
              v-model="signinForm.pwd"
              type="password"
              autocomplete="off"
              show-password
            />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="signinForm.name" type="text" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="身份证号" prop="IdNumber">
            <el-input v-model="signinForm.IdNumber" type="text" autocomplete="off"/>
          </el-form-item>
          <el-form-item class="el-sub">
            <el-button type="primary" @click="siginSubmitForm(signinFormRef)"
              >用户注册
            </el-button>
          </el-form-item>
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
  width: 40%;
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
.logincla {
  margin: 20px 0;
}
.el-sub {
  display: block;
  width: 100%;
  margin-left: 20%;
}
.el-button {
  width: 60%;
}
.admin-sub {
  margin-left: 64%;
  /* 69 */
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
