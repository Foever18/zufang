<template>
  <div>
    <van-nav-bar title="账号登录" left-arrow @click-left="onClickLeft" />
    <div class="hh"></div>
    <!-- 登录框-->
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="username" placeholder="请输入账号" />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
      <div class="am-flexbox-item">
        <a href="#/registe">还没有账号，去注册~</a>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/Login'
export default {
  created () { },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onClickLeft () { this.$router.go(-1) },
    async onSubmit (val) {
      // 验证表单
      const reg = /^[a-zA-Z0-9]{5,8}$/
      const reg2 = /^[a-zA-Z0-9]{5,12}$/
      if (this.password === '' || this.username === '') {
        return this.$toast('用户名和密码不能为空')
      } else if (!reg.test(val.username)) {
        return this.$toast('用户格式5-8位的字母\n和数字')
      } else if (!reg2.test(val.password)) {
        return this.$toast('密码格式5-8位的字母\n和数字')
      }
      // 发送登录请求
      console.log(val)
      try {
        const res = await login(val)
        this.$store.commit('setUser', res.data.body.token)
        this.$toast.success('登录成功')
        console.log(res)
        // 发送请求获取用户信息
        // 成功后去我的页面
        if (res.data.status === 200) {
          console.log(1)
          this.$router.go(-1)
        }
      } catch (err) {
        this.$toast('你的账号或密码异常')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.am-flexbox-item {
  margin-top: 25px;
  text-align: center;
  a {
    color: #666;
    font-size: 14px;
  }
}
.van-button {
  height: 50px;
  font-size: 18px;
  margin-top: 25px;
}
.hh {
  height: 20px;
}
.van-cell {
  height: 60px;
  /deep/.van-field__control {
    margin-top: 10px;
    /* line-height: 60x; */
    font-size: 17px;
  }
}
</style>
