<template>
  <div class="home">
    <Player ref="player"></Player>
    <div class="control light-box">
      <Scroller></Scroller>
      <button class="btn bottom-btn btn1" @click="openVideoSetting">设置视频参数</button>
      <button class="btn bottom-btn btn2" @click="openTextSetting">设置文本</button>
      <span class="tips bottom-btn right-tips">按键盘方向键"↓"播放下一句</span>
      <button class="btn bottom-btn btn3" @click="reStart">重新开始</button>
    </div>
    <VideoSetting ref="VideoSetting"></VideoSetting>
    <TextSetting ref="TextSetting"></TextSetting>
  </div>
</template>

<script>
import Player from '../components/Player'
import Scroller from '../components/Scroller'
import VideoSetting from '../components/VideoSetting'
import TextSetting from '../components/TextSetting'

export default {
  mounted () {
    const vm = this
    window.addEventListener('keydown', e => {
      if (e.keyCode == 40) {
        vm.$store.commit('NEXT')
      }
    })
  },
  methods: {
    // 重新开始
    reStart () {
      this.$refs['player'].restart()
      this.$store.commit('UPDATE_INDEX', -1)
    },
    // 打开参数设置
    openVideoSetting () {
      this.$refs['VideoSetting'].changeSetting(true)
    },
    // 打开文本设置
    openTextSetting () {
      this.$refs['TextSetting'].changeSetting(true)
    }
  },
  components: {
    Player,
    Scroller,
    VideoSetting,
    TextSetting
  }
}
</script>

<style scoped>
.control {
  position: absolute;
  bottom: 20px;
  left: 20%;
  width: 60%;
  height: 160px;
}
.bottom-btn {
  position: absolute;
  bottom: 4px;
}
.btn1 {
  left: 30px;
}
.btn2 {
  left: 180px;
}
.btn3 {
  right: 30px;
}
.right-tips {
  right: 150px;
}
</style>
