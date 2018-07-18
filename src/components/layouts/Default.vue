<template>
  <el-container>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <MainNavigation />
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px; background-color: rgb(238, 241, 246); line-height: 60px;">
        <el-dropdown trigger="click" :hide-on-click="false" @command="handleCommand">
          <el-button size="mini" icon="el-icon-setting">{{user.name}}</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="signOut">Sign Out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MainNavigation from './../MainNavigation.vue'

export default {
  components: {
    MainNavigation
  },
  data () {
    return {
      user: {
        id: localStorage.getItem('user_id'),
        name: localStorage.getItem('user_name')
      }
    }
  },
  methods: {
    handleCommand(command) {
      this[command]();
    },

    signOut() {
      localStorage.removeItem('access_token');
      this.$router.push({
        name: 'Sign In'
      });
      this.$message({
        message: 'You signed out',
        center: true
      });
    }
  }
}
</script>

