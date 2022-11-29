<template>
  <div class="article-page">
    <nav class="my-nav van-hairline--bottom">
      <a
        href="javascript:;"
        :class="{active:this.article.sorter==='weight_desc'}"
        @click="changedata('weight_desc')"
        >推荐</a
      >
      <a
        href="javascript:;"
        :class="{active:this.article.sorter===null}"
         @click="changedata(null)"
        >最新</a
      >
      <div class="logo"><img src="@/assets/logo.png" alt=""></div>
    </nav>

<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
<articleItem v-for="(item,index) in list" :key="index" :item='item'></articleItem>
</van-list>
  </div>
</template>

<script>
import { articleItemAPI } from '@/API/API'
export default {
  name: 'articlePage',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      article: {
        current: 1,
        pageSize: 10,
        sorter: 'weight_desc'
      }
    }
  },
  methods: {
    async onLoad () {
      // async   created () {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const res = await articleItemAPI(this.article)
      this.list.push(...res.data.rows)
      this.current++
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (this.current > res.data.pageTotal) {
        this.finished = true
      }
    },
    changedata (value) {
      this.article.sorter = value
      // 重置所有条件
      this.current = 1 // 排序条件变化，重新从第一页开始加载
      this.list = []
      this.finished = false // finished重置，重新有数据可以加载了
      // this.loading = false
      // 手动加载更多
      // 手动调用了加载更多，也需要手动将loading改成true，表示正在加载中（避免重复触发）
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }
      &.active {
        color: #222;
        &::after {
          width: 14px;
        }
      }
    }
    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}

</style>
