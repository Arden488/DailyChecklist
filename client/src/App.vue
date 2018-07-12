<template>
  <div id="app">
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <MainNavigation />
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px; background-color: rgb(238, 241, 246); line-height: 60px;">
          <el-dropdown>
            <el-button size="mini" icon="el-icon-setting">User</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Profile</el-dropdown-item>
              <el-dropdown-item>Exit</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MainNavigation from './components/MainNavigation.vue'

export default {
  name: 'app',
  components: {
    MainNavigation
  }
}
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}
</style>
