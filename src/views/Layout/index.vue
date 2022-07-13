<template>
  <div>
    <keep-alive :include="['home']">
      <router-view></router-view>
    </keep-alive>
    <!-- tab栏 -->
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/find" icon="search">找房</van-tabbar-item>
      <van-tabbar-item replace to="/news" icon="newspaper-o"
        >资讯</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-tabbar {
  /deep/ .van-icon {
    font-size: 25px;
  }
}
</style>
