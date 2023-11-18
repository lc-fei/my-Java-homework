<script lang="ts" setup>
import { searchCar, rentCar,} from '../../../api/user'
//级联选择器
import { ref } from 'vue'
//响应式变量
// 级联选择器的value
const changeValue = ref([])

// 搜索出的全部车辆
const searchedCar = ref([])
searchCar(changeValue.value).then(res => {
  searchedCar.value = res.data.vehicleInfos
})

//用户租用的车辆  有bug
// const userRentedCar = ref([])
// getMyRentingCar().then(res => {
//   userRentedCar.value = res
//   console.log(res)
// })


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
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
]
</script>

<template>
  <div class="m-4">
    <h4 class="inlineblock">租车类型：</h4>
    <el-cascader
      v-model="changeValue"
      :options="options"
      :props="props"
      @change="handleChange"
      class="inlineblock"
    />
  </div>
  <el-table :data="tableData" style="width: 100%" height="100%">
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="city" label="City" width="320" />
    <el-table-column prop="address" label="Address" width="600" />
    <el-table-column prop="zip" label="Zip" width="120" />
  </el-table>
</template>

<style scoped>
.m-4 {
  margin: 10px;
}
.inlineblock {
  display: inline-block;
}
</style>