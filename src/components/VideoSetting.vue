<template>
  <div class="setting video-setting" :class="show ? '' : 'closedSetting'">
    <span class="close-setting" @click="changeSetting(false)">关闭设置</span>
    <label class="setting-item">
      <span class="setting-title">背景色：</span>
      <input class="setting-input" @change="changeColor" type="color">
    </label>
    <label class="setting-item">
      <span class="setting-title">宽高比：</span>
      <input class="setting-input" type="nuber" @change="changeWtoH" placeholder="默认为2">
    </label>
    <label class="setting-item">
      <span class="setting-title">字体：</span>
      <select class="setting-input" @change="changeFont">
        <option value="Microsoft YaHei">微软雅黑</option>
        <option value="SimSun">宋体</option>
        <option value="KaiTi">楷体</option>
        <option value="LiSu">隶书</option>
        <option value="YouYuan">幼圆</option>
        <option value="STHupo">华文琥珀</option>
        <option value="STCaiyun">华文彩云</option>
        <option value="STXingkai">华文行楷</option>
        <option value="STXinwei">华文新魏</option>
        <option value="LiHei Pro Medium">儷黑</option>
        <option value="LiSong Pro Light">儷宋</option>
        <option value="Apple LiGothic Medium">蘋果儷中黑</option>
        <option value="Apple LiSung Light">蘋果儷細宋</option>
      </select>
    </label>
    <label class="setting-item">
      <span class="setting-title">配色方案：</span>
      <select class="setting-input" style="margin-right:10px" @click="changeColors">
        <option v-for="(item, i) in colors" :key="i" :value="i">{{item.name}}</option>
      </select>
      <span class="color-tip" v-for="(item, i) in colors[colorIndex].colors" :key="i" :style="{backgroundColor: item}"></span>
    </label>
    <label class="setting-item">
      <span class="setting-title">字体缩放范围：</span>
      <input class="setting-input" type="nuber" @change="changeMin" placeholder="默认为20">
      <span>至</span>
      <input class="setting-input" type="nuber" @change="changeMax" placeholder="默认为40">
    </label>
    <label class="setting-item">
      <span class="setting-title">旋转模式：</span>
      <select class="setting-input" @click="changeRotateMode">
        <option value="1">左右交替</option>
        <option value="2">始终左旋</option>
        <option value="3">始终右旋</option>
        <option value="4">随机旋转</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      colorIndex: 0,
      colors: [
        { name: '花海世界', colors: ['#795DB3', '#FFFFFF', '#F2991D', '#17CC10', '#DE0000'] },
        { name: '海天罅隙', colors: ['#4cb4e7', '#ffc09f', '#ffee93', '#e2dbbe', '#a3a380'] },
        { name: '美好回忆', colors: ['#E03636', '#EDD0BE', '#FF534D', '#EDD0BE', '#25C6FC'] },
        { name: '森林之光', colors: ['#82A6F5', '#EAF048', '#9FF048', '#2A5200', '#F6D6FF'] },
        { name: '洋葱花', colors: ['#EACF02', '#6C890B', '#ABC327', '#DFB5B7', '#7F1874'] },
        { name: '粉黛红颜', colors: ['#AAB8A3', '#EBEDF4', '#FF5983', '#C1194E', '#7A023C'] },
        { name: '白色独角兽', colors: ['#EFCEE8', '#F3D7B5', '#FDFFDF', '#DAF9CA', '#C7B3E5'] },
        { name: '盛开的桃花', colors: ['#9DD3FA', '#1F6FB5', '#FCD692', '#FAFFEB', '#FFFFFF'] },
        { name: '午后奶茶', colors: ['#EDE387', '#EDEDED', '#3B200C', '#DE8100', '#CCFC62'] },
        { name: '艺术之旅', colors: ['#DB9019', '#5ED5D1', '#1A2D27', '#FF6E97', '#F1AAA6'] }
      ]
    }
  },
  methods: {
    // 更改旋转模式
    changeRotateMode (e) {
       this.$store.commit('UPDATE_TransMode', e.target.value)
    },
    // 更改字体最小值
    changeMin (e) {
      this.$store.commit('UPDATE_MIN', e.target.value)
    },
    // 更改字体最大值
    changeMax (e) {
      this.$store.commit('UPDATE_MAX', e.target.value)
    },
    // 更改颜色组
    changeColors (e) {
      const index = e.target.value
      this.colorIndex = index
      this.$store.commit('UPDATE_COLORS', this.colors[index].colors)
    },
    // 更改字体
    changeFont (e) {
      this.$store.commit('UPDATE_FONT', e.target.value)
    },
    // 更改宽高比
    changeWtoH (e) {
      this.$store.commit('UPDATA_WtoH', e.target.value)
    },
    // 更改背景色
    changeColor (e) {
      this.$store.commit('UPDATE_BGCOLOR', e.target.value)
    },
    // 更改设置展示状态
    changeSetting (key) {
      this.show = key
    }
  }
}
</script>

<style scoped>
.video-setting {
  box-sizing: border-box;
  /* padding-top: 30px; */
  color: #ddd;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  line-height: 30px;
  vertical-align: bottom;
}
.setting-item {
  margin-left: 40px;
  margin-bottom: 20px;
}
.setting-title {
  display: inline-block;
  /* width: 70px; */
  text-align: right;
}
.setting-input {
  width: 100px;
  border-radius: 8px;
  display: inline-block;
  padding: 2px 5px;
  height: 24px;
  box-sizing: border-box;
}
.color-tip {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 2px;
}
</style>