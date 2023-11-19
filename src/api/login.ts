import request from "../utils/request";


//用户登录
export const userLogin = (obj) => {
  const { username, pwd } = obj
  return request.post('/user/login', {
    username,
    pwd
  })
}

//管理员登录
export const adminLogin = (obj) => {
  const { username, pwd } = obj
  return request.post('/admin/login', {
    username,
    pwd
  })
}

//用户注册
export const userSignin = (obj) => {
  const { username, pwd, name, idNumber } = obj
  return request.post('/user/register', {
    username,
    pwd,
    name,
    idNumber
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}