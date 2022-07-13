<template>
  <div>
    <img
      v-if="this.user && userInfo"
      class="My_bg__2j-VX"
      :src="'http://liufusong.top:8080' + userBackground"
      alt="背景图"
    />
    <img
      v-else
      class="My_bg__2j-VX"
      :src="'http://liufusong.top:8080/img/profile/bg.png'"
      alt="背景图"
    />
    <div class="My_info__eOYeg">
      <div class="My_myIcon__3cKIV">
        <img
          v-if="this.user && userInfo"
          class="My_avatar__2Fbh7"
          :src="'http://liufusong.top:8080' + userBackground"
          alt="icon"
        />
        <img
          v-else
          class="My_avatar__2Fbh7"
          src="http://liufusong.top:8080/img/profile/avatar.png"
          alt="icon"
        />
      </div>
      <div class="My_user__B6O1D">
        <div class="My_name__3U2NB">
          {{ this.user && userInfo ? userInfo.nickname : "游客" }}
        </div>
        <div class="My_edit__3wqlv">
          <van-button type="primary" v-if="this.user && userInfo" @click="logOut"
            >退出</van-button
          >
          <van-button type="primary" to="login" v-else>去登录</van-button>
        </div>
      </div>
    </div>
    <div>
      <van-row type="flex">
        <van-col span="8"
          ><van-icon name="star-o" size="20px" />
          <p>我的收藏</p></van-col
        >
        <van-col span="8"
          ><van-icon name="wap-home-o" size="20px" />
          <p>我的出租</p></van-col
        >
        <van-col span="8"
          ><van-icon name="underway-o" size="20px" />
          <p>看房记录</p></van-col
        >
        <van-col span="8"
          ><van-icon name="debit-pay" size="20px" />
          <p>成为房主</p></van-col
        >
        <van-col span="8"
          ><van-icon name="user-o" size="20px" />
          <p>个人资料</p></van-col
        >
        <van-col span="8"
          ><van-icon name="service-o" size="20px" />
          <p>联系我们</p></van-col
        >
      </van-row>
    </div>
    <div class="My_ad__1wZZj">
      <img src="http://liufusong.top:8080/img/profile/join.png" alt="" />
    </div>
    <!-- <XX></XX> -->
  </div>
</template>

<script>
import { getUserInfo } from '@/api/Login'
import { mapState } from 'vuex'
// import XX from '@/views/City/xx.vue'
export default {
  name: 'My',
  async created () {
    if (this.user) {
      try {
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.body
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: ''
    }
  },
  methods: {
    async logOut () {
      console.log(this.user)
      try {
        await this.$dialog.confirm({ message: '确认退出吗' })
        this.$store.commit('setUser', '')
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user']),
    userBackground: function () {
      if (this.user && this.userInfo) {
        return this.userInfo.avatar || ''
      }
      return '/img/profile/bg.png'
    },
    userName: function () {
      if (this.user && this.userInfo) {
        return this.userInfo.nickname
      }
      return '游客'
    }
  },
  watch: {},
  filters: {}
  // components: { XX }
}
</script>

<style scoped lang='less'>
.My_ad__1wZZj {
  width: 345px;
  height: 85px;
  img {
    width: 100%;
    margin: 210px 15px 0;
  }
}
/deep/ .van-row {
  // width: 100%;
  position: relative;
  top: 110px;
  text-align: center;
  height: 65px;
  line-height: 65px;
  margin-bottom: 30px;
  .van-col {
    height: 95px;
  }
  p {
    font-size: 13px;
    margin: 0;
    line-height: 0px;
  }
}
/deep/ .van-button {
  width: 69px;
  height: 30px;
  padding: 0 12px;
  border-radius: 5px;
  .van-button__text {
    font-size: 13px;
  }
}
.My_bg__2j-VX {
  width: 375px;
  height: 191px;
}
.My_info__eOYeg {
  position: absolute;
  background: #fff;
  width: 280px;
  height: 165px;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 10px 3px #ddd;
  margin: 50px auto 0;
  padding: 0 20px;
  text-align: center;
  font-size: 13px;

  .My_myIcon__3cKIV {
    position: relative;
    transform: translateY(-50%);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    border: 5px solid #f5f5f5;
    display: inline-block;
    box-shadow: 0 2px 2px #bdbdbd;
    .My_avatar__2Fbh7 {
      width: 100%;
      border-radius: 50%;
    }
  }
  .My_name__3U2NB {
    margin-top: -15px;
    margin-bottom: 10px;
  }
}
</style>
