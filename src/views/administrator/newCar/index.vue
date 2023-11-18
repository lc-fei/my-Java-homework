<script lang="ts" setup>
import { ref, reactive } from 'vue'
import {addCar} from '../../../api/admin'
import { ElMessage } from 'element-plus'

// do not use same name with ref
const formEl = ref()
const form = reactive({
  vehicleType: '',
  vehicleBrand: '',
  vehicleModel: '',
  perRent: '',
  vehicleLicense: ''
})


const rules = reactive({
  vehicleType: [{ required: true, message: '请输入汽车类型', trigger: 'blur' }],
  vehicleBrand:[{ required: true, message: '请输入汽车品牌', trigger: 'blur' }],
  vehicleModel: [{ required: true, message: '请输入汽车型号', trigger: 'blur' }],
  perRent: [{ required: true, message: '请输入汽车日租金', trigger: 'blur' }],
  vehicleLicense:[{ required: true, message: '请输入汽车车牌号', trigger: 'blur' }]
})

const submitForm = async () => {
  if (!formEl.value) return
  await formEl.value.validate((valid, fields) => {
    if (valid) {
      try {
      addCar(form)
      ElMessage({
          message: '添加成功',
          type: 'success',
          duration: 1500, // 持续显示时间，单位毫秒
          center: true // 是否居中显示
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<template>

  <div class="my-big">
    <el-form 
    :model="form" 
    label-width="120px"
    :rules="rules"
    ref="formEl"
    >
      <el-form-item label="类型：" prop="vehicleType">
        <el-input v-model="form.vehicleType" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="品牌：" prop="vehicleBrand">
        <el-input v-model="form.vehicleBrand" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="型号：" prop="vehicleModel">
        <el-input v-model="form.vehicleModel" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="日租金：" prop="perRent">
        <el-input v-model="form.perRent" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="车牌号：" prop="vehicleLicense">
        <el-input v-model="form.vehicleLicense" autocomplete="off"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">增加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>
.my-big {
  height: 500px;
  width: 700px;
  background-color: rgb(255,255,255);
  margin: auto;
  margin-top: 50px;
  border-radius: 0%;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  padding: 20px;
}
</style>