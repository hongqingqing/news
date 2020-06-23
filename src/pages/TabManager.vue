<template>
  <div class="tab-manager">
    <news-header>栏目管理</news-header>
    <div class="content">
        <div class="title">点击删除以下频道</div>
        <van-button type="default" v-for="item in activeList" :key="item.id" @click="del(item.id)">{{item.name}}</van-button>
        <div class="title">点击添加以下频道</div>
        <van-button type="default" v-for="item in deactiveList" :key="item.id" @click="add(item.id)">{{item.name}}</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeList: [],
      deactiveList: []
    }
  },
  methods: {
    async getActiveList () {
      const res = await this.$axios.get('/category')
      // console.log(res)
      const { data } = res.data
      // console.log(data)
      this.activeList = data
    },
    del (id) {
      // console.log(id)
      // 添加deactiveList中对应数据
      this.deactiveList.push(this.activeList.find(item => item.id === id))
      // 删除activeList中对应数据
      this.activeList = this.activeList.filter(item => item.id !== id)
      // console.log(this.activeList)
    },
    add (id) {
      // console.log(id)
      // 添加activeList中对应数据
      this.activeList.push(this.deactiveList.find(item => item.id === id))
      // 删除deactiveList中对应数据
      this.deactiveList = this.deactiveList.filter(item => item.id !== id)
    }
  },
  watch: {
    activeList () {
      // 当activeList变化时存储在本地
      localStorage.setItem('activeList', JSON.stringify(this.activeList))
      localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
    }
  },
  created () {
    const activeList = JSON.parse(localStorage.getItem('activeList'))
    const deactiveList = JSON.parse(localStorage.getItem('deactiveList'))
    if (activeList && deactiveList) {
      this.activeList = activeList
      this.deactiveList = deactiveList
    } else {
      this.getActiveList()
    }
  }
}
</script>

<style lang='scss' scoped>
.tab-manager{
  .content{
    padding: 10px;
    .title{
      color:#888;
      padding: 10px 0;
    }
    .van-button{
      background-color: #ddd;
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }
}
</style>
