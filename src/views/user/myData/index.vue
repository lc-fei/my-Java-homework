<script lang="ts" setup>
import {getMyRentingCar, returnCar, charge, getUserInfo} from '../../../api/user'
import {ref, onMounted} from 'vue'
import { ElMessage } from 'element-plus';

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

let tableData = ref<Array<myData>>([
])

//余额
let myRemindMoney = ref()

//充值金额
let chargeed = ref()
//更新余额
const updateMyChange = async () => {
  const res = await getUserInfo()
  myRemindMoney.value = res.data.remindMoney
}


onMounted(async () => {
  const res = await getMyRentingCar()
  console.log(res)
  tableData.value = res.data.vehicleInfos
  updateMyChange()
})



//还车
const ckickBUtton = async (vehicleId) => {
  try{
    await returnCar({vehicleId})
    tableData.value = (tableData.value as myData[]).filter(item => {
      if(item.vehicleId !== vehicleId) return item
    })
    ElMessage({
      message: '还车成功，多余钱款已原路退还',
      type: 'success',
      duration: 1500, // 持续显示时间，单位毫秒
      center: true // 是否居中显示
    })
    updateMyChange()
  }catch(err) {
    console.log(err)
  }
}

//充值
const Mycharge = async () => {
  try {
    const chargeMoney = await chargeed.value
    await charge({chargeMoney})
    updateMyChange()
    centerDialogVisible.value = false
    chargeed.value = 0
    ElMessage({
      message: '充值成功',
      type: 'success',
      duration: 1500, // 持续显示时间，单位毫秒
      center: true // 是否居中显示
    })
  } catch (error) {
    console.log(error)
  }
  
}

//el-对话框
const centerDialogVisible = ref(false)

</script>

<template>
  <h1 class="my-h1">我的租用：</h1>
  
  <el-table class="my-eltable" :data="tableData" style="width: 100%" height="300px">
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
        <el-button type="primary" @click="ckickBUtton(scope.row.vehicleId)">还车</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="my-footer">
    <h1>我的余额：</h1>
    <div class="my-charge">
      <div class="my-icon">
        <el-icon><Connection /></el-icon>
      </div>
        <el-button class="my-button" @click="centerDialogVisible = true">充值</el-button>
      <div class="hhh">余额：{{myRemindMoney}}</div>
    </div>
  </div>

  <el-dialog v-model="centerDialogVisible" title="充值" width="30%" center>
    <el-form-item label="金额：" >
      <el-input v-model="chargeed" type="text" autocomplete="off"/>
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="Mycharge">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
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
.my-h1 {
  position: fixed;
  overflow: hidden;
  margin: 10px 5px;
}
.my-eltable {
  margin-top: 50px;
  box-shadow: 0 0 8px rgba(0,0,0,.4);
  height: 300px;
}

.my-footer {
  margin: 10px 0 0 0 ;
  display: block;
  text-align: start;
  width: 100%;
  height: 250px;
  background-color: rgb(255, 255, 255);
  padding: 5px ;
}
.my-charge {
  margin: 10px 0;
  height: 200px;
  width: 400px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 8px rgba(0,0,0,.4);
  border-radius: 10px;
  padding: 5px 0 0 25px;
}
.my-icon {
  display: inline-block;
  font-size: 130px;
  height: 140px;
  color: rgb(167,205,255);
}
.charge {
  display: inline-block;
}

.my-button {
  display: inline-block;
  height: 130px;
  width: 130px;
  margin: -120px 0 0 40px;
}
.hhh {
  text-align: center;
  font-size: 30px;
}

/*  el - 对话框 */
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>