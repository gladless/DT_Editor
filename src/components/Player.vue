<template>
  <div
    class="player-box color-box"
    :style="{
      height: winH + 'px',
      width: winH * config.WtoH + 'px',
      backgroundColor: config.bgColor,
      fontFamily: config.font
      }">
      <div class="text-part" ref="part">
        <div class="part" ref="part1" :class="part1class"></div>
        <div class="part" ref="part2" :class="part2class"></div>
      </div>
      <!-- <p style="font: 20px/1.5 Tahoma,Helvetica,Arial,SimSun,sans-serif;">这是一段测试文字 宋体</p>
      <p style="font: 20px/1.5 Tahoma,Helvetica,Arial,Microsoft YaHei,sans-serif;">这是一段测试文字 微软雅黑</p>
      <p style="font: 20px/1.5 Tahoma,Helvetica,Arial,KaiTi,sans-serif;">这是一段测试文字 楷体</p>
      <p>以下是window系统安装office之后才会有的</p>
      <p style="font: 20px/1.5 Tahoma,Helvetica,Arial,LiSu,sans-serif;">这是一段测试文字 隶书</p>
      <p style="font: 20px/1.5 Tahoma,Helvetica,Arial,YouYuan,sans-serif;">这是一段测试文字 幼圆</p>
      <p style="font: 20px/1.5 Tahoma,Helvetica,Arial,STHupo,sans-serif;">这是一段测试文字 华文琥珀</p>
      <p style="font: 20px/1.5 Tahoma,Helvetica,Arial,STCaiyun,sans-serif;">这是一段测试文字 华文彩云</p>
      <p style="font: 20px/1.5 Tahoma,Helvetica,Arial,STXingkai,sans-serif;">这是一段测试文字 华文行楷</p>
      <p style="font: 20px/1.5 Tahoma,Helvetica,Arial,STXinwei,sans-serif;">这是一段测试文字 华文新魏</p>
      <p>以下是Mac OS系统字体</p>
      <p style="font: 20px/1.5 Tahoma,Helvetica,Arial,LiHei Pro Medium,sans-serif;">这是一段测试文字 儷黑 Pro</p>
      <p style="font: 20px/1.5 Tahoma,Helvetica,Arial,LiSong Pro Light,sans-serif;">这是一段测试文字 儷宋 Pro</p>
      <p style="font: 20px/1.5 Tahoma,Helvetica,Arial,Apple LiGothic Medium,sans-serif;">这是一段测试文字 蘋果儷中黑</p>
      <p style="font: 20px/1.5 Tahoma,Helvetica,Arial,Apple LiSung Light,sans-serif;">这是一段测试文字 蘋果儷細宋</p> -->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      winH: document.body.clientHeight - 250,
      part2class: '',
      part1class: '',
      preColor: -1, // 上一个颜色
      dir: false,  // true 为左转
      preTransY: 0
    }
  },
  computed: {
    config: function () {
      return this.getConfig()
    },
    index: function () {
      return this.getIndex()
    },
    arr: function () {
      return this.getTextArr()
    },
    showBox: function () {
      return this.getShowBox()
    }
  },
  watch: {
    index: function (n) { // 更新语句
      if (n >= 0) {
        this.insert()
        this.resetPos()
      }
    },
    showBox: function () { // 切换段落
      this.rotate()
      this.insert()
      setTimeout(() => {
        this.getPos()
        this.resetPos()
      }, 0)
    }
  },
  mounted () {
    const vm = this
    window.addEventListener('resize', function () {
      vm.winH = document.body.clientHeight - 250
    })
  },
  methods: {
    // 重新开始
    restart () {
      this.winH = document.body.clientHeight - 250,
      this.part2class = '',
      this.part1class = '',
      this.preColor = -1, // 上一个颜色
      this.dir = false,  // true 为左转
      this.preTransY = 0
      this.$refs['part'].style.transform = ''
      this.$refs['part1'].style.transform = ''
      this.$refs['part2'].style.transform = ''
      this.$refs['part1'].innerHTML = ''
      this.$refs['part2'].innerHTML = ''
    },
    // 插入当前语句
    insert () {
      const n = this.index
      const p = document.createElement('p')
      let size = this.getNumber(this.config.min, this.config.max) // 字体大小
      if (this.arr[n].length <= 5) { // 短文本放大
        size = this.getNumber(this.config.min, this.config.min + (this.config.max - this.config.min) / 2)
      }
      if (this.arr[n].length > 10) { // 长文本缩小
        size = this.getNumber(this.config.min, this.config.min + (this.config.max - this.config.min) / 2)
      }
      const color = this.getColor() // 颜色
      p.style.color = color
      p.style.display = 'inline-block'
      p.style.wordBreak = 'keep-all'
      p.style.transition = 'all .2s ease-in-out'
      p.style.transform = 'translateY(46%)'
      p.innerHTML = this.arr[n]
      this.$refs['part' + this.showBox].appendChild(p)
      this.$refs['part' + this.showBox].appendChild(document.createElement('br'))
      setTimeout(() => {
        p.style.fontSize = size + 'px'
      }, 0)
      setTimeout(() => {
        this.scaleWin(p)
      }, 200)
    },
    // 缩放屏幕
    scaleWin (p) {
      const w = this.winH * this.config.WtoH * 0.5 // 展示宽度
      const scale = w / p.clientWidth
      this.$refs['part'].style.transform = `scale(${scale})`
    },
    // 重新设置载体位置
    resetPos () {
      const n = this.showBox
      const part1 = this.$refs['part1']
      const part2 = this.$refs['part2']
      if (n == 2) {
        if (!this.dir) { // 右转
          part1.style.transform = `rotate(90deg) translateX(${-part1.clientWidth+part1.clientHeight-part2.clientHeight}px) translateY(${this.preTransY}px)`
          part2.style.transform = ''
        } else { // 左转
          part1.style.transform = `rotate(-90deg) translateX(${part2.clientHeight}px)`
          part2.style.transform = ''
        }
      } else {
        if (!this.dir) {
          part2.style.transform = `rotate(90deg) translateX(${-part2.clientWidth+part2.clientHeight-part1.clientHeight}px) translateY(${this.preTransY}px)`
          part1.style.transform = ''
        } else { // 左转
          part2.style.transform = `rotate(-90deg) translateX(${part1.clientHeight}px)`
          part1.style.transform = ''
        }
      }
    },
    // 获取载体位置
    getPos () {
      const n = this.showBox
      const part1 = this.$refs['part1']
      const part2 = this.$refs['part2']
      if (n == 2) {
        this.preTransY = -part2.clientWidth - part1.clientHeight
      } else {
        this.preTransY = -part1.clientWidth - part2.clientHeight
      }
    },
    // 重设旋转方向
    resetRotate () {
      switch (Number(this.config.transMode)) {
        case 1: // 左右交替
          this.dir = !this.dir
          break
        case 2: // 左旋
          this.dir = true
          break
        case 3: // 右旋
          this.dir = false
          break
        case 4: // 随机
          if (this.getNumber(0, 1000) > 500) {
            this.dir = true
          } else {
            this.dir = false
          }
          break
      }
    },
    // 旋转载体
    rotate () {
      const n = this.showBox
      const part1 = this.$refs['part1']
      const part2 = this.$refs['part2']
      this.resetRotate()
      if (n == 2) { // 旋转1
        this.part1class = this.dir ? 'left-rotate' : 'right-rotate'
        part2.style.display = 'none'
        part2.innerHTML = ''
        this.part2class = ''
        setTimeout(() => {
          part2.style.display = 'block'
        }, 0)
      } else { // 旋转2
        this.part2class = this.dir ? 'left-rotate' : 'right-rotate'
        part1.style.display = 'none'
        part1.innerHTML = ''
        this.part1class = ''
        setTimeout(() => {
          part1.style.display = 'block'
        }, 0)
      }
    },
    // 获取一个和上次不一样的颜色
    getColor () {
      const max = this.config.colors.length - 1
      let colorIndex = this.preColor
      while (colorIndex == this.preColor) {
        colorIndex = this.getNumber(0, max)
      }
      this.preColor = colorIndex
      return this.config.colors[colorIndex]
    },
    // 获取一个随机数
    getNumber (min, max) {
      const rand = (function(){
        var today = new Date()
        var seed = today.getTime()
        function rnd(){
          seed = ( seed * 9301 + 49297 ) % 233280;
          return seed / ( 233280.0 )
        }
        return function rand(number){
          return Math.ceil(rnd() * number)
        }
      })()
      return Math.ceil(rand((Number(max) - Number(min) + 1))) + Number(min) - 1
    },
    ...mapGetters({
      getConfig: 'getConfig',
      getTextArr: 'getTextArr',
      getIndex: 'getIndex',
      getShowBox: 'getShowBox'
    })
  }
}
</script>

<style lang="less" scoped>
.player-box {
  position: absolute;
  transition: all .3s;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  color: #fff;
  font-size: 12px;
  overflow: hidden;
}
.text-part {
  position: absolute;
  left: 25%;
  width: 50%;
  height: 100%;
  transform-origin: 0 50%;
  transition: all .3s ease-in-out;
}
.part {
  position: absolute;
  left: 0;
  bottom: 50%;
  transform-origin: 0 0;
  transition: all .3s ease-in-out;
}
.left-rotate {
  transform-origin: 0 100%;
}
.right-rotate {
  transform-origin: 0 0;
}
</style>