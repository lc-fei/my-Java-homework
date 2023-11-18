import request from "../utils/request";
import { useAdminStore } from "../stores/index"


//增加车辆
export const addCar = (obj) => {
  const adminStore = useAdminStore()
  const token = adminStore.getToken()
  const { vehicleType, vehicleBrand, vehicleModel, perRent, vehicleLicense } = obj
  return request.post('/admin/addVehicle', {
    vehicleType,
    vehicleBrand,
    vehicleModel,
    perRent,
    vehicleLicense
  }, {
    headers: {
      token
    }
  })
}

//删除车辆
export const deleteCar = (obj) => {
  const adminStore = useAdminStore()
  const token = adminStore.getToken()
  const { vehicleId } = obj
  return request.post('/admin/deleteVehicle', {
    vehicleId
  }, {
    headers: {
      token
    }
  })
}

//修改车辆
export const changeCar = (obj) => {
  const adminStore = useAdminStore()
  const token = adminStore.getToken()
  const { vehicleID, vehicleType, vehicleBrand, vehicleModel, perRent, vehicleLicense } = obj
  return request.post('/admin/updateVehicle', {
    vehicleID,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    perRent,
    vehicleLicense
  }, {
    headers: {
      token
    }
  })
}

//查询营业额
export const getTurnover = (obj) => {
  const adminStore = useAdminStore()
  const token = adminStore.getToken()
  const { selectWay } = obj
  return request.post('/admin/selectTurnover', {
    selectWay
  }, {
    headers: {
      token
    }
  })
}


//查找车辆
export const searchCar = (arr) => {
  const adminStore = useAdminStore()
  const token = adminStore.getToken()

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