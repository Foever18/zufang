<template>
  <div>
    <!-- 标题栏 -->
    <form action="/">
      <van-search
        background="#21b97a"
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @input="onInput"
        @cancel="$router.back()"
      />
      <!-- 展示单元格 -->
      <van-cell
        :value="item.communityName"
        v-for="(item, index) in list"
        :key="index"
        @click="setVillageName(item.communityName)"
      />
    </form>
  </div>
</template>

<script>
import { getVillageName } from '@/api/Find'
export default {
  created () { },
  data () {
    return {
      value: '',
      list: []
    }
  },
  methods: {
    setVillageName (val) {
      this.$store.commit('setVillageName', val)
      this.$router.back()
    },
    async onInput () {
      try {
        const res = await getVillageName({
          name: this.value,
          id: 'AREA|e4940177-c04c-383d'
        })
        this.list = res.data.body
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
