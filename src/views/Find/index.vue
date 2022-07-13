<template>
  <div>
    <!-- 头部搜索框 -->
    <div class="topSearch">
      <van-search
        background="#21b97a"
        v-model="value"
        label="地址"
        placeholder="请输入搜索关键词"
      >
        <template #label>
          <div @click="fn">
            {{ location }}
            <van-icon name="arrow-down" />
          </div>
        </template>
        <template #left>
          <van-icon name="arrow-left" @click="goBack" />
        </template>
      </van-search>
      <van-icon name="location-o" size="25" />
    </div>

    <!-- 下拉列表 -->
    <van-dropdown-menu active-color="#21b97a">
      <!-- 选择器 -->
      <van-dropdown-item title="区域" ref="checkbox">
        <van-picker
          ref="checkbox1"
          show-toolbar
          :columns="columns"
          toolbar-position="bottom"
          @confirm="getValues"
          @cancel="$refs.checkbox.toggle()"
          value-key="label"
        />
      </van-dropdown-item>
      <van-dropdown-item title="方式"> </van-dropdown-item>
      <van-dropdown-item title="租金" />
      <van-dropdown-item title="筛选" />
    </van-dropdown-menu>

    <!-- 下拉加载 -->
    <van-list
      v-model="loading"
      finished-text="没有更多了"
      :finished="finished"
      @load="onLoad"
    >
      <!-- 数据列表 -->
      <van-card
        v-for="(item, index) in HousesList"
        :key="index"
        :price="item.price"
        :desc="item.desc"
        :title="item.title"
        :thumb="'http://liufusong.top:8080' + item.houseImg"
      >
        <template #tags>
          <van-tag
            color="#e1f5f8"
            text-color="#39becd"
            type="danger"
            v-for="(item, index) in item.tags"
            :key="index"
            >{{ item }}</van-tag
          >
        </template>
        <template #price>
          <span class="HouseItem_priceNum">{{ item.price }} </span>
          元/月
        </template>
      </van-card>
    </van-list>
  </div>
</template>

<script>
import { getHousesCondition } from '@/api/home'
import { findHouses } from '@/api/Find'
export default {
  name: 'Find',
  async created () {
    try {
      const res = await getHousesCondition()
      // 处理数据,给没有children的对象加上children
      this.formateCondition(res.data.body.area.children)
      this.formateCondition(res.data.body.subway.children)
      // this.$set(res.data.body.area.children[0], 'children', [{ label: '' }])
      console.log({ ...res.data.body })
      this.columns = [{ ...res.data.body.area }, { ...res.data.body.subway }]
    } catch (err) {
      console.log(err)
    }
    this.findHousesList()
  },
  data () {
    return {
      HousesList: [],
      conditionList: [],
      toggleShow: false,
      columns: [],
      value: '',
      currentCity: '130500',
      location: '杭州',
      loading: false,
      finished: false,
      findHouses: {
        cityId: 'AREA|88cff55c-aaa4-e2e0',
        stat: 0,
        end: 10
      }
    }
  },
  methods: {
    async findHousesList () {
      try {
        const res = await findHouses(this.findHouses)
        console.log(res)
        this.loading = false
        this.HousesList = res.data.body.list
      } catch (err) {
        console.log(err)
      }
    },
    getValues () {
      this.$refs.checkbox.toggle()
      console.log(this.$refs.checkbox1.getValues())
    },
    confirm (val) {
      console.log(1)
    },
    fn () {
      this.$router.push({ path: '/city' })
    },
    goBack () {
      this.$router.push({ path: '/home' })
    },
    formateCondition (arr) {
      arr.forEach(item => {
        if (item.children) {
          this.formateCondition(item.children)
        } else { item.children = [{ label: '' }] }
      })
    },
    onLoad () {
      console.log('开启下拉刷新')
      this.findHouses.end += 10
      this.findHousesList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-card__price {
  color: #fa5741;
}
.HouseItem_priceNum {
  font-size: 16px;
  color: #fa5741;
}
.van-card__title {
  font-size: 15px;
  color: #394043;
}
.van-card__desc {
  font-size: 12px;
  color: #afb2b3;
}
// 联级选择器
/deep/.van-picker__toolbar {
  border-top: 1px solid #e9e9e9;
  height: 50px;
  .van-picker__confirm {
    font-size: 18px;
    display: inline-block;
    width: 250px;
    line-height: 50px;
    text-align: center;
    background-color: #21b97a;
    color: #fff;
    padding: 0;
  }
  .van-picker__cancel {
    width: 100px;
    text-align: center;
    color: #21b97a;
    font-size: 18px;
  }
}
.topSearch {
  position: relative;
  .van-icon-location-o {
    position: absolute;
    top: 14px;
    right: 15px;
    color: #fff;
  }
}
.van-search {
  padding: 8px;
  padding-right: 50px;
  background-color: #fff;
  .van-search__content {
    background-color: #fff;
  }
  /deep/.van-field__left-icon {
    padding-left: 12px;
    margin-left: 12px;
    border-left: 1px solid #9c9fa1;
  }
  .van-icon-arrow-left {
    color: #fff;
    font-size: 22px;
    font-style: normal;
    padding-right: 10px;
    padding-right: -2px;
  }
}
</style>
