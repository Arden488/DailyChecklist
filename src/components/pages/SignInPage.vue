<template>
  <div>

    <div class="login-form">
      <h2 style="text-align: center">Sign In to Daily Checklist</h2>

      <el-card shadow="never">
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="login">
            <el-input v-model="loginForm.login" placeholder="Enter your email"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="Enter your password"></el-input>
          </el-form-item>
          <div style="text-align: center">
            <el-button type="primary" @click="submitForm()" style="padding-left: 50px; padding-right: 50px;">Sign in</el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
  name: 'SignInPage',
  data () {
    return {
      loginForm: {
        login: '',
        password: ''
      },
      rules: {
        login: [
          { required: true, message: 'Field \'Email\' is required', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Field \'Password\' is required', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          const data = {
            email: this.loginForm.login,
            password: this.loginForm.password,
          }
          this.signIn(data);
        }
      })
    },
    async signIn(data) {
      const response = await AuthService.signIn(data);
      if (await response && response.status === 200) {
        localStorage.setItem('access_token', response.data.token);
        localStorage.setItem('user_name', response.data.name);
        localStorage.setItem('user_id', response.data.id);
        this.$router.push({ name: 'Overview' });
      } else {
        this.$message({
          type: 'error',
          message: 'Error while trying to sign in'
        });
      }
    }
  }
}
</script>

<style>
.login-form {
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

