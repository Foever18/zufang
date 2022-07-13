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
  </div>
</template>

<script>
import { getHousesCondition } from '@/api/home'
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
  },
  data () {
    return {
      conditionList: [],
      toggleShow: false,
      columns: [],
      value: '',
      currentCity: '130500',
      location: '杭州'
    }
  },
  methods: {
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
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
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
