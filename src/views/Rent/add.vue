<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar title="发布房源" left-arrow @click-left="onClickLeft" />
    <!--房屋信息  -->
    <van-cell-group>
      <div class="am-list-header">房源信息</div>
      <!-- 小区名称 -->
      <VillageName :value.sync="Village_name"></VillageName>

      <!-- 租金 -->
      <van-field v-model="price" label="租金" placeholder="请输入租金/月">
        <template #extra> ￥/月 </template>
      </van-field>

      <!-- 建筑面积 -->
      <van-field v-model="size" label="建筑面积" placeholder="请输入建筑面积">
        <template #extra> ㎡ </template>
      </van-field>

      <!-- 户型 -->
      <van-field
        center
        readonly
        clickable
        label="户型"
        @click="isRoomTypeShow = true"
      >
        <template #extra>
          {{ RoomTypeText[0].label }}
          <van-icon name="arrow" size="15" />
        </template>
      </van-field>

      <!-- 所在楼层 -->
      <van-field
        center
        readonly
        clickable
        name="floor"
        label="所在楼层"
        @click="isFloorShow = true"
      >
        <template #extra>
          {{ floorText[0].label }}
          <van-icon name="arrow" size="15" />
        </template>
      </van-field>

      <!-- 朝向 -->
      <van-field
        center
        readonly
        clickable
        name="orientation"
        label="朝向"
        @click="isOrientedShow = true"
      >
        <template #extra>
          {{ orientedText[0].label }}
          <van-icon name="arrow" size="15" />
        </template>
      </van-field>

      <!-- 房屋标题 -->
      <p class="am-list-title">房屋标题</p>
      <input
        type="text"
        placeholder="请输入标题(例如:整租小区名2室5000元)"
        class="am-list-line"
        :value="House_title"
      />

      <!-- 房屋图像 -->
      <p class="am-list-title">房屋图像</p>
      <van-uploader :after-read="afterRead" v-model="fileList" />

      <!-- 房屋配置 -->
      <p class="am-list-title">房屋配置</p>

      <van-checkbox-group v-model="result" direction="horizontal">
        <van-checkbox
          :name="item.label"
          v-for="(item, index) in roomList.supporting"
          :key="index"
        >
          <template #default>
            <van-grid clickable>
              <van-grid-item
                icon="star-o"
                :text="item.label"
                :class="{ main: item.flag }"
                @click="item.flag = !item.flag"
              />
            </van-grid>
          </template>
        </van-checkbox>
      </van-checkbox-group>

      <!-- 房屋描述 -->
      <div class="am-list Add_desc__1Gqte" data-role="rent-list">
        <div class="am-list-title">房屋描述</div>
        <div class="am-list-body">
          <div class="am-list-item am-textarea-item">
            <div class="am-textarea-control">
              <textarea
                v-model="description"
                rows="5"
                placeholder="请输入房屋描述信息"
                style="height: 128px"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <van-button type="default">取消</van-button>
        <van-button type="primary" color="#21b97a" @click="commit"
          >提交</van-button
        >
      </div>
    </van-cell-group>

    <!-- 弹出层 -->
    <!-- 户型 -->
    <van-popup
      v-model="isRoomTypeShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        default-index="1"
        title="标题"
        show-toolbar
        :columns="roomType"
        @confirm="onConfirm"
        @cancel="isRoomTypeShow = false"
      />
    </van-popup>

    <!-- 楼层 -->
    <van-popup
      v-model="isFloorShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        default-index="1"
        title="标题"
        show-toolbar
        :columns="floor"
        @confirm="onGetFloor"
        @cancel="isRoomTypeShow = false"
      />
    </van-popup>

    <!-- 朝向 -->
    <van-popup
      v-model="isOrientedShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        default-index="1"
        title="标题"
        show-toolbar
        :columns="oriented"
        @confirm="onGetOriented"
        @cancel="isRoomTypeShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getHouses, addHouse } from '@/api/Find'
import VillageName from './comment/VillageName.vue'
export default {
  async created () {
    // 获取房屋信息
    try {
      const res = await getHouses()
      this.roomList = res.data.body
      this.roomList.supporting.forEach(item => { this.$set(item, 'flag', false) })
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      flag1: false,
      RoomTypeText: [{ label: '请选择' }],
      floorText: [{ label: '请选择' }],
      orientedText: [{ label: '请选择' }],
      roomList: [],
      Village_name: '请输入小区名字', // 小区名称
      price: '', // 租金
      size: '',
      House_title: '',
      isRoomTypeShow: false,
      isFloorShow: false,
      isOrientedShow: false,
      description: '',
      fileList: [],
      result: [],
      supporting: null
    }
  },
  methods: {
    async commit () {
      try {
        const res = await addHouse({ title: '', description: this.description, houseImg: this.fileList[0].content, oriented: this.orientedText.value, supporting: this.result, price: this.price, roomType: this.RoomTypeText.value, size: this.value, floor: this.floorText.value, community: this.$store.state.VillageName })
        console.log(res)
      } catch (err) { console.log(err) }
    },
    onClickLeft () {
      this.$router.push('/home')
      this.$store.commit('setVillageName', '请输入房源信息')
    },
    afterRead (file) {
      this.$set(this.fileList, 0, file)
    },
    // 关闭户型弹出层
    onConfirm (val) {
      const res = this.roomList.roomType.filter(item => item.label === val)
      this.RoomTypeText = res
      this.isRoomTypeShow = false
    },
    // 获取楼层信息
    onGetFloor (val) {
      const res = this.roomList.floor.filter(item => item.label === val)
      this.floorText = res
      this.isFloorShow = false
    },
    // 获取朝向信息
    onGetOriented (val) {
      const res = this.roomList.oriented.filter(item => item.label === val)
      this.orientedText = res
      this.isOrientedShow = false
    }
  },
  computed: {
    roomType () {
      return this.roomList.roomType?.map(item => { return item.label })
    },
    floor () {
      return this.roomList.floor?.map(item => { return item.label })
    },
    oriented () {
      return this.roomList.oriented?.map(item => { return item.label })
    }
  },
  watch: {
    result: function (newVal) {
      this.supporting = ''
      this.result.forEach((item, index) => {
        if (index === 0) {
          this.supporting = item
          return
        }
        this.supporting = this.supporting + '|' + item
      }
      )
      console.log(this.supporting)
    }
  },
  filters: {},
  components: { VillageName }
}
</script>

<style scoped lang='less'>
.main {
  color: #21b97a;
  /deep/.van-grid-item__text {
    color: #21b97a;
  }
}
/deep/.van-checkbox__icon .van-icon {
  display: none;
}
/deep/.van-checkbox__label {
  margin-left: 0px;
}
.van-checkbox--horizontal {
  margin-right: 0px;
}
/deep/.van-grid-item__content {
  width: 75px;
}
.van-uploader {
  margin-top: 9px;
  margin-left: 9px;
}
.btn {
  display: flex;
  justify-content: space-between;
  .van-button {
    width: 50%;
    height: 45px;
    border: unset;
  }
}
.body {
  background-color: #21b97a;
}
.Add_desc__1Gqte {
  padding-top: 20px;
  padding-bottom: 15px;
  background-color: #f6f5f6;
}
// 输入框
.am-textarea-item textarea {
  padding-top: 15px;
  width: 100%;
  min-height: 44px;
  padding-left: 15px;
  padding-right: 15px;
  border: 0;
  &::placeholder {
    font-size: 14px;
    color: #c5c5c5;
  }
}
.am-list-line {
  &::placeholder {
    font-size: 14px;
    color: #c5c5c5;
  }
  width: 100%;
  height: 44px;
  padding-left: 15px;
}
.am-list-title {
  color: #646566;
  background-color: #fff;
  font-size: 15px;
  padding: 15px 15px 9px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #ebedf0;
}
.am-list-header {
  color: #21b97a;
  background-color: #fff;
  font-size: 15px;
  padding: 15px 15px 9px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #ebedf0;
}
.van-field {
  font-size: 14px;
  color: #888;
}
// 输入框右边样式
.van-cell--center {
  .van-icon-arrow {
    margin-left: 8px;
  }
}
</style>
