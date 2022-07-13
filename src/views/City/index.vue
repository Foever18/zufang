<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="城市列表"
      @change="onChange($event)"
      left-arrow
      fixed
      z-index="99"
      @click-left="onClickLeft"
    />

    <!-- 侧边索引栏 -->
    <van-index-bar
      :index-list="
        Object.keys(this.allCity1).map((item) =>
          item === '热门城市' ? '热' : item === '当前城市' ? '#' : item
        )
      "
      highlight-color="#fff"
      @change="onChange"
      ref="checkbox"
    >
      <div
        v-for="(value, key, index) in allCity1"
        :key="index"
        class="contentTop"
      >
        <!-- 标题栏 -->
        <van-index-anchor
          :id="index"
          :index="key === '热门城市' ? '热' : key === '当前城市' ? '#' : key"
          >{{ key }}
        </van-index-anchor>

        <!-- 城市栏 -->
        <van-cell
          :title="item.label"
          v-for="(item, index) in value"
          :key="index"
          @click="setCity(item, index)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
// 引入请求方法
import { getHotCity, getAllCity } from '@/api/Find'
export default {
  mounted () {

  },
  async created () {
    try {
      // 获取热门城市并储存

      const res = await getHotCity()
      this.hotCity = { 热门城市: res.data.body }
      console.log(this.hotCity)
      // 1.先获取所有的城市
      const res2 = await getAllCity(1)
      console.log(res2)
      // 2.给城市列表排序
      const res3 = res2.data.body.sort((a, b) => {
        const x1 = a.short.substr(0, 1).toUpperCase()
        const x2 = b.short.substr(0, 1).toUpperCase()
        if (x1 < x2) {
          return -1
        }
        if (x1 > x2) {
          return 1
        }
        return 0
      })
      // 3.处理排序好的数据(数据分组)
      res3.forEach(item => {
        const upCase = item.short.substr(0, 1).toUpperCase()
        if (this.allCity[upCase]) {
          this.allCity[upCase].push(item)
        } else { this.allCity[upCase] = [item] }
      })
      this.allCity1 = { ...this.currentCity, ...this.hotCity, ...this.allCity }

      // 获取所有的索引栏dom,并设置排他
      this.$nextTick(() => {
        const arr = document.querySelectorAll('.van-index-bar__index')
        this.arr = [...arr]
        arr.forEach((item) => {
          item.onclick = function () {
            arr.forEach(function (item) {
              item.setAttribute('class', 'van-index-bar__index')
            })
            item.setAttribute('class', 'van-index-bar__index myFn')
          }
        })
        // console.log(this.arr)
      })
    } catch (err) {
      console.log(err)
    }
  },
  //
  data () {
    return {
      hotCity: [],
      allCity: {},
      allCity1: {},
      currentCity: { 当前城市: [{ label: '杭州' }] }
    }
  },
  methods: {
    onChange (e) {
      // this.arr[this.arr.findIndex(item => item.innerText === e)].click()
    },
    myFn (index) {
      location.href = '#' + index
      console.log(333)
      this.flag = index
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    setCity (val, index) {
      console.log(val)
      this.$set(this.allCity1.当前城市, 0, val)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}

}
</script>

<style scoped lang='less'>
.van-index-bar {
  margin-top: 46px;
}
/deep/.van-index-bar__sidebar {
  top: 334px;
  right: 9px;
  left: 348px;
  margin-top: 20px;
  font-size: 20px;
  font-family: "Microsoft YaHei";
  color: #333;
  height: 90%;
  .van-index-bar__index {
    line-height: unset;
    height: 18px !important;
    margin: 9px 0px 0 0;
    font-size: 14px;
    font-weight: 400;
    padding: unset;
  }
  .van-index-bar__index--active {
    display: block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    border-radius: 100%;
    background-color: #21b97a;
  }
}
/deep/.van-index-anchor {
  font-size: 14px;
  color: #999;
}
.van-cell {
  height: 50px;
  padding: 0 15px;
  line-height: 50px;
  font-size: 16px;
  color: #333;
  border-bottom: 1px solid #eee;
  &::after {
    display: none;
  }
}
</style>
