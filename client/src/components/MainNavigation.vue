<template>
  <el-menu
    :router="true" 
    :default-active="$route.path"
    class="header-navigation">
    
    <el-menu-item 
      class="header-navigation__item" 
      index="/" 
      :route="'/'"
    >
      Overview
    </el-menu-item>
    <el-menu-item 
      class="header-navigation__item" 
      index="/reports/create" 
      :route="'/reports/create'"
    >
      Add report
    </el-menu-item>
    <el-submenu index="">
      <template slot="title">Questions</template>
      <el-menu-item 
        class="header-navigation__item" 
        index="/questions" 
        :route="'/questions'"
      >
        List
      </el-menu-item>
      <el-menu-item 
        class="header-navigation__item" 
        index="/questions/create" 
        :route="'/questions/create'"
      >
        Create
      </el-menu-item>
    </el-submenu>

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
