<template>
  <el-menu
    :router="true" 
    :default-active="$route.path"
    class="header-navigation"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    
    <el-menu-item 
      class="header-navigation__item" 
      index="/" 
      :route="'/'"
    >
      Overview
    </el-menu-item>
    <el-menu-item 
      class="header-navigation__item" 
      index="/form" 
      :route="'/form'"
    >
      Add data
    </el-menu-item>
    <el-menu-item 
      class="header-navigation__item" 
      index="/questions" 
      :route="'/questions'"
    >
      Questions list
    </el-menu-item>

  </el-menu>
</template>

<script>
import routes from '@/routes';

export default {
  name: 'MainNavigation',
  data () {
    return {
      routes
    }
  }
}
</script>

<style>
.header-navigation__item {
  text-decoration: none;
}
</style>
