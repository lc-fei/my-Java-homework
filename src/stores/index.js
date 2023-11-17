// import { ref, computed } from 'vue'
import { createPinia } from 'pinia'

//pinia持久化处理
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persist)
//pinia持久化处理

export default pinia
export * from './modules/admin'
export * from './modules/user'
