import request from "../utils/request";

export const userLogin = (obj) => {
  const { username, pwd } = obj
  return request.post('/user/login', {
    username,
    pwd
  })
}

export const adminLogin = (obj) => {
  const { username, pwd } = obj
  return request.post('/admin/login', {
    username,
    pwd
  })
}

export const userSignin = (obj) => {
  const { username, pwd, name, IdNumber } = obj
  return request.post('/user/register', {
    username,
    pwd,
    name,
    IdNumber
  })
}