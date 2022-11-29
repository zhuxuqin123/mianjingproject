<template>
    <div class="like-page">
    <van-nav-bar fixed title="我的点赞" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <article-item v-for="(item,i) in list" :key="i" :item="item" />
    </van-list>
  </div>
</template>

<script>
import { getlikecollectAPI } from '@/API/API'
export default {
  name: 'likePage',
  data () {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1
    }
  },
  methods: {
    async  onLoad () {
      const res = await getlikecollectAPI({ optType: 1, pageSize: 10, page: this.page })
      console.log(res)
      this.list.push(...res.data.rows)
      this.loading = false
      if (this.page === res.data.pageTotal || !res.data.row.length) {
        this.finished = true
      } else {
        this.page++
      }
    }
  }
}
</script>

<style>
</style>
