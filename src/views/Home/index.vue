<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in swiper" :key="index">
        <img
          :src="'http://liufusong.top:8080' + item.imgSrc"
          alt=""
          class="topSwiper"
        />
      </van-swipe-item>
    </van-swipe>

    <!--搜索框  -->
    <div class="location">
      <div class="TopSearch">
        <div @click="fn">
          <van-dropdown-menu @click="fn">
            <van-dropdown-item title="杭州" disabled @click="fn" />
          </van-dropdown-menu>
        </div>
        <!-- <van-button icon="plus" type="default">杭州</van-button> -->
        <van-search
          background="#fff"
          v-model="value"
          placeholder="请输入搜索关键词"
        />
      </div>
      <van-icon name="location-o" color="#fff" />
    </div>

    <!-- 租房导航 -->
    <van-row type="flex">
      <van-col span="6">
        <img src="@/assets/1.png" alt="" />
        <p>整租</p></van-col
      >
      <van-col span="6">
        <img src="@/assets/2.png" alt="" />
        <p>合租</p></van-col
      >
      <van-col span="6">
        <img src="@/assets/3.png" alt="" />
        <p>地图找房</p></van-col
      >
      <van-col span="6" @click="goRent">
        <img src="@/assets/4.png" alt="" />
        <p>去出租</p></van-col
      >
    </van-row>

    <!-- 租房小组 -->
    <div class="group">
      <h3 class="group-title">租房小组 <span class="more">更多</span></h3>
      <div class="group-body">
        <div class="am-grid-item" v-for="item in homeGroup" :key="item.id">
          <div class="am-grid-item-content">
            <img src="@/assets/5.jpg" alt="" />
            <div class="right">
              <p>{{ item.title }}</p>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入请求轮播图的方法
import { getSwiper, getHomeGroup } from '@/api/home'
import { getAllCity } from '@/api/Find'
export default {
  async created () {
    try {
      const res = await getSwiper()
      const res2 = await getHomeGroup('AREA%7C88cff55c-aaa4-e2e0')
      const res3 = await getAllCity(1)
      console.log(res3)
      console.log(res2)
      this.homeGroup = res2.data.body
      this.swiper = res.data.body
      console.log(this.swiper)
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      swiper: [],
      value: '',
      homeGroup: '',
      object: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe'
      }
    }
  },
  methods: {
    goRent () {
      this.$router.push('rent')
    },
    fn () {
      this.$router.push({ path: '/city' })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.group {
  background-color: #f6f5f6;
  overflow: hidden;
  padding: 0 10px;
  .group-title {
    margin: 15px 0 15px 10px;
    position: relative;
    font-size: 15px;
    .more {
      color: #787d82;
      position: absolute;
      right: 0;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .group-body {
    // width: 750px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .am-grid-item {
      width: 172px;
      height: 60px;
      background-color: rgb(255, 255, 255);
      border-radius: 5px;
      margin-bottom: 10px;
      .am-grid-item-content {
        display: flex;
        img {
          width: 50px;
          height: 50px;
          margin: 0 10px;
        }
        p {
          font-size: 14px;
          color: #333;
          &:nth-child(1) {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
/deep/ .van-row {
  // width: 100%;
  padding-top: 10px;
  text-align: center;
  height: 123px;
  background-color: rgb(255, 255, 255);
  .van-col {
    height: 95px;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    color: #333;
  }
  img {
    width: 60px;
    height: 60px;
    margin-bottom: 15px;
  }
}
.van-swipe {
  height: 212px;
  img {
    // background-size: cover;
    width: 100%;
    height: 100%;
    margin-bottom: 15px;
  }
}
.location {
  display: flex;
  position: fixed;
  top: 20px;
  left: 20px;
  align-items: center;
  .TopSearch {
    padding: 5px 5px 5px 8px;
    display: flex;
    border-radius: 3px;
    background-color: #fff;

    margin-right: 8px;
    .van-search {
      width: 6.4rem;
      background-color: unset;
      padding: 0;
      .van-search__content {
        background-color: #fff;
      }
      .van-cell {
        padding: 0;
      }
    }
    // 搜索按钮
    /deep/.van-dropdown-menu__bar {
      box-shadow: unset;
      width: 60px;
      height: 24px;
    }
    /deep/.van-dropdown-menu__item {
      padding-right: 15px;
      font-size: 14px;
      // border: 1px solid rgb(255, 255, 255);
      border-right: 1px solid #c7c7c7;
      .van-dropdown-menu__title {
        font-size: 14px;
        color: #333;
      }
    }
  }
}
</style>
