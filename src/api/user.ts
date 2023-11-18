import request from "../utils/request";
import { useUserStore } from '../stores/index'

//查找用户正在租用的车辆
export const getMyRentingCar = () => {
  const userStore = useUserStore()
  const token = userStore.getToken()
  return request.post('/user/rentingVehicle', {
    pageSize: 1000,
    pageNumber: 0
  }, {
    headers: {
      token
    }
  })
}

//查找车辆
export const searchCar = (arr) => {
  const userStore = useUserStore()
  const token = userStore.getToken()

  const [vehicleType, vehicleBrand, vehicleModel] = arr

  return request.post('/user/selectVehicle', {
    pageNumber: 0,
    pageSize: 1000,
    vehicleType,
    vehicleBrand,
    vehicleModel
  }, {
    headers: {
      token
    }
  })
}


//租车
export const rentCar = (obj) => {
  const userStore = useUserStore()
  const token = userStore.getToken()

  const { vehicleId, days } = obj
  return request.post('/user/rentVehicle', {
    vehicleId,
    days
  }, {
    headers: {
      token
    }
  })
}

//还车
export const returnCar = (obj) => {
  const userStore = useUserStore()
  const token = userStore.getToken()

  const { vehicleId } = obj
  return request.post('/user/returnVehicle', {
    vehicleId
  }, {
    headers: {
      token
    }
  })
}

//充值
export const charge = (obj) => {
  const userStore = useUserStore()
  const token = userStore.getToken()

  const { chargeMoney } = obj
  return request.post('/user/charge', {
    chargeMoney
  }, {
    headers: {
      token
    }
  })
}

//获取用户信息
export const getUserInfo = () => {
  const userStore = useUserStore()
  const token = userStore.getToken()
  return request.post('/user/getInfo', {
  }, {
    headers: {
      token
    }
  })
}