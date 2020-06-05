<template>
  <div class="setting" :class="show ? '' : 'closedSetting'">
    <span class="close-setting" @click="changeSetting(false)">关闭设置</span>
    <p class="tips">通过换行来分割每句话，段落中间空一行</p>
    <textarea @change="changeText" class="textarea" v-model="value" cols="30" rows="8"></textarea>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      value: `淡黄的长裙蓬松的头发
牵着我的手去看那新展出的油画

无人的街道
空荡的家里
无人的街道
空荡的家里
只剩我一个人在那开狂欢的Party

就当是一场梦
醒了很久之后还是很感动

淡黄的长裙蓬松的头发

无人的街道
只有我一个人在家`
    }
  },
  mounted () {
    this.changeText({
      target: {
        value: this.value
      }
    })
  },
  methods: {
    // 更改文本
    changeText (e) {
      const texts = e.target.value
      if (!texts) {
        // todo 错误消息提示
        return
      }
      const arr = texts.split(`
`)
      const result = arr.map(e => {
        if (!e) {
          e = '--（翻页转场）--'
        }
        return e
      })
      this.$store.commit('UPDATE_TEXT', result)
    },
    // 更改设置展示状态
    changeSetting (key) {
      this.show = key
    }
  }
}
</script>

<style scoped>
.textarea {
  resize: none;
  width: 100%;
  border-radius: 22px;
  box-sizing: border-box;
  padding: 5px 10px;
}
</style>