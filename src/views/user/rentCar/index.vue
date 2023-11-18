<script lang="ts" setup>
type myData = {
  beginTime :string, 
  brand:string,
  deadline:string, 
  model:string,
  perRent: number,
  type: string,
  userId:number,
  vehicleId:number,
  vehicleLicense:string,
}

import { ElMessage } from 'element-plus';
import { searchCar, rentCar} from '../../../api/user'
//级联选择器
import { ref, onMounted} from 'vue'
//响应式变量
// 级联选择器的value
const changeValue = ref([])

// 搜索出的全部车辆
const tableData = ref([
])

//初始化查找车辆
onMounted(async () => {
  try{
    const res = await searchCar(changeValue.value)
    tableData.value = res.data.vehicleInfos
    console.log(tableData.value)
  }catch (err) {
    console.log(err)
  }
  
})


const props = {
  expandTrigger: 'hover' as const,
}

const handleChange = (changeValue) => {
  console.log(changeValue)
  console.log(...changeValue)
}

const options = [
  {
    value: 'car',
    label: '轿车',
    children: [
      {
        value: 'kdlk',
        label: '凯迪拉克',
        children: [
          {
            value: 'ct-5',
            label: 'ct-5',
          },
        ],
      },
      {
        value: 'ad',
        label: '奥迪',
        children: [
          {
            value: 'a4',
            label: 'a4',
          },
          {
            value: 'a6',
            label: 'a6',
          },
          {
            value: 'a8',
            label: 'a8',
          },
        ],
      },
    ],
  },
  {
    value: 'bus',
    label: '卡车',
    children: [
      ]
  },
  {
    value: 'truck',
    label: '卡车',
    children: [
    ],
  },
]

// 表格


//对话框
const centerDialogVisible = ref(false)
const daysFormRef = ref()
let daysObj = ref({
  days: null
})

// 正则匹配租金为正整数
const validateDays = (rule, value, callback) => {
  const zz = /^[1-9]\d*$/
  if ( zz.test( value )) {
    callback()
  }else {
    callback(new Error('租用天数只能为正整数'))
  }
}

// 租金表单验证
const daysRule = ref({
  days: [
    {required: true, message: '租用天数不能为空',trigger: 'blur' },
    { validator: validateDays, trigger: 'blur' },
  ]
})

//my-js
let catchVehicleId = ref()
let catchVehiclePerRent = ref()

const myRentCar = async (formEl) => {
  if(!formEl) return
  await formEl.validate().then((valid) => {
    if (valid) {
      const days = daysObj.value.days
      const vehicleId = catchVehicleId.value
      const perRent = catchVehiclePerRent.value
      const sumRent = perRent * days as number
      // 改变状态
      rentCar({days, vehicleId}).then(() => {
        (tableData.value as myData[]).forEach(element => {
        if(element.vehicleId === vehicleId)
        {
          element.beginTime = '2023-11-18 20:33:03'
        }
        })
        centerDialogVisible.value = false
        ElMessage({
          message: `租车成功，共花费${sumRent}`,
          type: 'success',
          duration: 1500, // 持续显示时间，单位毫秒
          center: true // 是否居中显示
        })
      })
      .catch(err => {
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
    }})
}

const ckickBUtton = (id, perRent) => {
  centerDialogVisible.value = true
  catchVehicleId.value = id
  catchVehiclePerRent.value = perRent
}
</script>


<template>
  <div class="m-4">
    <h4 class="inlineblock">筛选：</h4>
    <el-cascader
      v-model="changeValue"
      :options="options"
      :props="props"
      @change="handleChange"
      class="inlineblock"
    />
  </div>
  <el-table :data="tableData" style="width: 100%" height="500px">
    <el-table-column fixed label="状态" width="60">
      <template #default = scope>
        <div :class="scope.row.beginTime === null ? 'green' : 'red' "></div>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型" width="150" />
    <el-table-column prop="brand" label="品牌" width="150" />
    <el-table-column prop="model" label="型号" width="150" />
    <el-table-column prop="perRent" label="日租金" width="150" />
    <el-table-column prop="vehicleLicense" label="车牌号码" width="300" />
    <el-table-column fixed="right" label="操作" width="150" >
      <template #default = scope>
        <el-button type="primary" :disabled="scope.row.beginTime !== null" @click="ckickBUtton(scope.row.vehicleId, scope.row.perRent)">租用</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    v-model="centerDialogVisible"
    title="汽车租用"
    width="30%"
    align-center
  >
    <!-- <span>Open the dialog from the center from the screen</span> -->
    <el-form
    ref="daysFormRef"
    :model="daysObj"
    status-icon
    :rules="daysRule"
    label-width="120px"
    class="demo-ruleForm"
  >
  <el-form-item label="租用天数：" prop="days">
            <el-input v-model="daysObj.days" type="text" autocomplete="off"/>
          </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="myRentCar(daysFormRef)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped>
/* 对话框 */
.dialog-footer button:first-child {
  margin-right: 10px;
}
.m-4 {
  margin: 15px 0 15px -68%;
}
.inlineblock {
  display: inline-block;
}

.green {
  background-color: green;
  height: 20px;
  width: 20px;
  border-radius: 20px;
}
.red {
  background-color: red;
  height: 20px;
  width: 20px;
  border-radius: 20px;
}

</style>