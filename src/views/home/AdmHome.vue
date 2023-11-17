<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h1>欢迎来到腾飞租车系统</h1>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            >
            <RouterLink to="/administrator/cardata">
              <el-menu-item index="1">
                <el-icon><User /></el-icon>
                <span>首页</span>
              </el-menu-item>
            </RouterLink>
            <RouterLink to="/administrator/newcar">
              <el-menu-item index="2">
                <el-icon><ChatLineSquare /></el-icon>
                <span>增加车辆</span>
              </el-menu-item>
            </RouterLink>
          </el-menu>
        </el-aside>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import { RouterLink } from 'vue-router';

// import { watch, ref, onMounted, toRef,reactive } from 'vue';

</script>


<style scoped >
    .el-header {
    background-color: rgba(34,130,254,.4);
    color: rgb(0,0,0);
    text-align: center;
    line-height: 13vh;
    height: 13vh;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 87vh;
    width: 259px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding: 0
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  a{
    text-decoration: none;
  }
</style>