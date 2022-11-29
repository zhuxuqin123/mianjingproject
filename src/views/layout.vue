<template>
  <div>
  <router-view>主题内容</router-view>
  <van-tabbar route>
  <van-tabbar-item to="/article" icon="coupon-o">面经</van-tabbar-item>
  <van-tabbar-item to="/collect" icon="star-o">收藏</van-tabbar-item>
  <van-tabbar-item to="/like" icon="like-o">喜欢</van-tabbar-item>
  <van-tabbar-item to="/user" icon="user-o">用户</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutPage'

}
</script>

<style>
</style>
