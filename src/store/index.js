import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    WtoH: 2, // 宽高比
    bgColor: '#000', // 背景色
    font: '20px/1.5 Tahoma,Helvetica,Arial,Microsoft YaHei,sans-serif;', // 字体
    colors: ['#795DB3', '#FFFFFF', '#F2991D', '#17CC10', '#DE0000'], // 颜色组
    min: 20, // 字体最小值
    max: 40, // 字体最大值
    transMode: 1, // 旋转模式
    textArr: [], // 文本列表
    playIndex: -1, // 当前播放下标
    showBox: 1, // 当前展示的段落容器
  },
  mutations: {
    // 更新文本
    UPDATE_TEXT: (state, data) => {
      state.textArr = data
    },
    // 更新下标
    UPDATE_INDEX: (state, data) => {
      state.playIndex = data
    },
    // 更新背景色
    UPDATE_BGCOLOR: (state, data) => {
      state.bgColor = data
    },
    // 更改宽高比
    UPDATA_WtoH: (state, data) => {
      state.WtoH = data
    },
    // 更新字体
    UPDATE_FONT: (state, data) => {
      // state.font = `20px/1.5 Tahoma,Helvetica,Arial,${data},sans-serif;`
      state.font = data
      console.log(state.font)
    },
    // 更新颜色组
    UPDATE_COLORS: (state, data) => {
      state.colors = data
    },
    // 更新字体最小值
    UPDATE_MIN: (state, data) => {
      if (state.max < data) {
        alert('最小值不能超过最大值')
      }
      state.min = data
    },
    // 更新字体最大值
    UPDATE_MAX: (state, data) => {
      if (state.min > data) {
        alert('最大值不能小于最小值')
      }
      state.max = data
    },
    // 更新旋转模式
    UPDATE_TransMode: (state, data) => {
      state.transMode = data
    },
    // 下一句
    NEXT: state => {
      let i = state.playIndex + 1
      if (i >= state.textArr.length) return
      if (state.textArr[i] == '--（翻页转场）--') {
        console.log('翻页')
        state.showBox = state.showBox == 1 ? 2 : 1
        i++
      }
      state.playIndex = i
    }
  },
  actions: {
  },
  getters: {
    // 获取配置
    getConfig: state => {
      return {
        WtoH: state.WtoH,
        bgColor: state.bgColor,
        font: state.font,
        colors: state.colors,
        min: state.min,
        max: state.max,
        transMode: state.transMode
      }
    },
    // 获取文本
    getTextArr: state => state.textArr,
    // 获取下标
    getIndex: state => state.playIndex,
    // 获取容器盒子
    getShowBox: state => state.showBox
  }
})
