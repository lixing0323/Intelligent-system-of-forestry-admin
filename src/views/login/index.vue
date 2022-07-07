<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="login-title" />
      <div class="login-div">
        <div class="login-container">
          <div class="input-container">
            <div class="input-div">
              <div class="icon user" />
              <div class="input-label">账号</div>
            </div>
            <div class="input-content">
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" />
              </el-form-item>
            </div>
          </div>
          <div class="input-container">
            <div class="input-div">
              <div class="icon pass" />
              <div class="input-label">密码</div>
            </div>
            <div class="input-content">
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" />
              </el-form-item>
            </div>
          </div>
          <el-button class="login-bt" :loading="loading" @click="handleLogin()">登录</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
        action: 'login'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      const defaultRoute = { path: this.redirect || '/' }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push(defaultRoute)
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
html,body{
  margin: 0;
  padding: 0;
  background: #1B232C;
}
.login-title{
  width: 486px;
  height: 50px;
  background: url("../../assets/title.png") no-repeat;
  margin: 0 auto;
}
.login{
  height: 482px;
  position: absolute;
  top: 50%;
  margin-top: -250px;
  left: 0;
  right: 0;

  .login-div{
    background: url("../../assets/bg.png") no-repeat;
    width: 100%;
    height: 400px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .login-container{
    width: 580px;
    height: 260px;
    background:rgba(0, 0, 0, 0.49);
    border-radius: 20px;
    margin: 0 auto;
    margin-top: 70px;
    padding-top: 55px;

  }
  .input-container{
    width: 317px;
    height: 40px;
    background: #FFFFFF;
    border-radius: 4px;
    border: 2px solid #4C8155;
    margin: 0 auto;
    display: flex;
    margin-bottom: 20px;
  }
  .input-div{
    width: 78px;
    height: 36px;
    background: #4C8155;
    border-radius: 1px 0 0 1px;
  }
  .icon{
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
  }
  .icon.user{
    background: url("../../assets/user.png") no-repeat;

  }
  .icon.pass{
    background: url("../../assets/pass.png") no-repeat;

  }
  .input-label{
    font-size: 14px;
    color: #FFFFFF;
    display: inline-block;
    float: left;
    margin-top: 10px;
    margin-left: 5px;
  }
  .input-content input{
    width: 230px;
    height: 30px;
    margin-top: 4px;
    border: none;
    outline: 0;
    padding: 0 5px;
    font-size: 14px;
    color: #1D752C;;
  }
  .login-bt{
    width: 317px;
    height: 40px;
    background: linear-gradient(180deg, #3EAD57 0%, #1D752C 100%);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    margin:0 auto;
    display: block;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    border: none;
    outline: 0;
    cursor: pointer;
  }
  .login-bt:hover{
    background: linear-gradient(180deg, #3Ebf69 0%, #1D752C 100%);
    color: #FFFFFF;
  }
}

</style>
