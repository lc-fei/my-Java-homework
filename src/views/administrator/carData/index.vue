<script lang="ts" setup>
// type myData = {
//   beginTime :string, 
//   brand:string,
//   deadline:string, 
//   model:string,
//   perRent: number,
//   type: string,
//   userId:number,
//   vehicleId:number,
//   vehicleLicense:string,
// }

import { ElMessage } from 'element-plus';
import { searchCar, deleteCar} from '../../../api/admin'
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


//my-js
let catchVehicleId = ref()

//点击删除按钮
const ckickBUtton = (id, beginTime) => {
  if(beginTime)
  {
    ElMessage({
      message: '您不能删除此车，因为此车正在租用中',
      type: 'error',
      duration: 1500, // 持续显示时间，单位毫秒
      center: true // 是否居中显示
    })
  }
  else{
    centerDialogVisible.value = true
    catchVehicleId.value = id
  }
}

//确定删除
const myDeleteCar = async () => {
  const vehicleId = catchVehicleId.value
  try {
    await deleteCar({vehicleId})
    ElMessage({
      message: '删除成功',
      type: 'success',
      duration: 1500, // 持续显示时间，单位毫秒
      center: true // 是否居中显示
    })
    centerDialogVisible.value = false
  } catch (error) {
    console.log(error)
  }
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
        <el-button type="danger" :disabled="scope.row.beginTime !== null" @click="ckickBUtton(scope.row.vehicleId, scope.row.beginTime)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    v-model="centerDialogVisible"
    title="注 意"
    width="30%"
    align-center
  >
  <h4>你确定要删除该车吗？</h4>
    <!-- <span>Open the dialog from the center from the screen</span> -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="myDeleteCar">
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