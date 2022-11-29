<template>
  <div class="user-page">
    <div class="user">
      <img :src="avatar" alt="" />
      <h3>{{ username }}</h3>
    </div>
    <van-grid clickable :column-num="3" :border="false">
      <van-grid-item icon="clock-o" text="历史记录" to="/" />
      <van-grid-item icon="bookmark-o" text="我的收藏" to="/collect" />
      <van-grid-item icon="thumb-circle-o" text="我的点赞" to="/like" />
    </van-grid>

    <van-cell-group class="mt20">
      <van-cell title="推荐分享" is-link />
      <van-cell title="意见反馈" is-link />
      <van-cell title="关于我们" is-link />
      <!-- <van-cell @click="logout" title="退出登录" is-link /> -->
      <van-cell is-link @click="showPopup">退出登录</van-cell>
<van-popup v-model="show" :style="{ width: '30%',height: '10%'}">
  确定退出吗?
  <van-button @click="logout" type="primary" size="mini">确定</van-button>
  <van-button @click="no" type="danger" size="mini">取消</van-button>
  </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
import { getUserAPI } from '@/API/API'
import { delToken } from '@/utils/localstory'
export default {
  name: 'userPage',
  data () {
    return {
      username: '',
      avatar: '',
      show: false
    }
  },
  async created () {
    const res = await getUserAPI()
    this.username = res.data.username
    this.avatar = res.data.avatar
  },
  methods: {
    showPopup () {
      this.show = true
    },
    logout () {
      this.show = false
      delToken()
      this.$router.push('/login')
    },
    no () {
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.user-page {
  padding: 0 10px;
  background: #f5f5f5;
  height: 100vh;
  .mt20 {
    margin-top: 20px;
  }
  .user {
    display: flex;
    padding: 20px 0;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
    }
    h3 {
      margin: 0;
      padding-left: 20px;
      font-size: 18px;
    }
  }
}
</style>
