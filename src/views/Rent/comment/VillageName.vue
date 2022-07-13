<template>
  <van-field center name="Village_name" label="小区名称" @click="goSearch">
    <template #extra>
      {{ $store.state.VillageName }}
      <van-icon name="arrow" size="15" />
    </template>
  </van-field>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      require: true
    }
  },
  async created () {

  },
  data () {
    return {
      newPlaceHold: ''
    }
  },
  methods: {
    goSearch () {
      this.$router.push({ path: '/rent/search' })
      this.$emit('update:value', this.newPlaceHold)
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
