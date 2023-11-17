import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useAdminStore = defineStore(
  'big-admin',
  () => {
    let token = ref('')
    const removeToken = () => {
      token.value = ''
    }
    const setToken = (data) => {
      token.value = data
    }
    const getToken = () => {
      return token.value
    }
    return {
      token,
      removeToken,
      setToken,
      getToken
    }
  },
  {
    //开启pinia持久化
    persist: true
  }
)
