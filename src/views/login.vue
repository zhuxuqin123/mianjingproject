<template>
<div class="login">
   <van-nav-bar
  title="面经登录"
/>
  <van-form @submit="onSubmit">
  <van-field
    v-model="username"
    name="username"
    label="用户名"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' },{ pattern: /^\w{5,}$/, message: '用户名至少包含5个字符' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="password"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' },{ pattern: /^\w{6,}$/, message: '用户名至少包含6个字符' }]"
  />
  <div style="margin: 16px;">
    <van-button block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
<router-link class="link" to='/register'>注册账号</router-link>
</div>

</template>

<script>
import { loginAPI } from '@/API/API'
import { setToken } from '@/utils/localstory'
export default {
  name: 'loginPage',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      const res = await loginAPI(values)
      console.log(res)
      if (res.data.status === 'ok') {
        this.$toast('登录成功')
        setToken(res.data.token)
        this.$router.push('/')
      } else {
        this.$toast('登录失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.link{
  float: right;
  margin-right: 15px;
  font-size: 14px;
  color: #1989fa;
}
</style>
