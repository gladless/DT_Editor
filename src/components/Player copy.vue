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
        <div class="part part2" ref="part2" :class="part2class"></div>
        <div class="part part1" ref="part1" :class="part1class"></div>
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
      preColor: -1,
      dir: true,  // true 为左转
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
      setTimeout(() => {
        const p = document.createElement('div')
        p.style.transition = 'all 100ms ease-in-out'
        p.innerText = this.arr[n]
        this.$refs['part' + this.showBox].appendChild(p)
        // 重设样式
        setTimeout(() => {
          // 字体大小
          const fontSize = this.getNumber(this.config.min, this.config.max)
          p.style.fontSize = fontSize + 'px'
          // 颜色
          const color = this.getColor()
          p.style.color = color
          setTimeout(() => {
            this.resetPos()
            setTimeout(() => {
              const scale = this.winH * this.config.WtoH * 0.8 / p.clientWidth
              console.log(p, p.clientWidth, scale)
              this.$refs['part'].style.transform = `scale(${scale}) translateY(${p.clientHeight / 2}px)`
            }, 100)
          }, 120)
        }, 20)
      }, 0)
    },
    showBox: function (n) { // 切换段落
      this.resetPos()
      switch (n) {
        case 2: // 操作part1旋转
          if (this.dir) {
            this.part1class = 'left-rotate'
          } else {
            this.part1class = 'right-rotate'
          }
          this.$refs['part2'].style.display = 'none'
          this.$refs['part2'].innerHTML = ''
          this.part2class = ''
          setTimeout(() => {
            this.$refs['part2'].style.display = 'block'
          }, 0)
          break
        case 1: // 操作part2旋转
          if (this.dir) {
            this.part2class = 'left-rotate'
          } else {
            this.part2class = 'right-rotate'
          }
          this.$refs['part1'].style.display = 'none'
          this.$refs['part1'].innerHTML = ''
          this.part1class = ''
          setTimeout(() => {
            this.$refs['part1'].style.display = 'block'
          }, 0)
          break
      }
    }
  },
  mounted () {
    const vm = this
    window.addEventListener('resize', function () {
      vm.winH = document.body.clientHeight - 250
    })
  },
  methods: {
    // 重新计算偏移位置
    resetPos () {
      const part1 = this.$refs['part1']
      const part2 = this.$refs['part2']
      switch (this.showBox) {
        case 1:
          if (this.dir) {
            part2.style.transform = `rotate(-90deg) translateY(-100%) translateX(${- part2.clientHeight + part1.clientHeight}px)`
          } else {
            // part2.style.transform = `rotate(90deg) translateY(${- part1.clientWidth + part2.clientWidth}px) translateX(${part2.clientHeight - part1.clientHeight}px)`
          }
          part1.style.transform = ''
          break
        case 2:
          if (this.dir) {
            part1.style.transform = `rotate(-90deg) translateY(-100%) translateX(${- part1.clientHeight + part2.clientHeight}px)`
          } else {
            // part1.style.transform = `rotate(90deg) translateY(${- part1.clientWidth + part2.clientWidth}px) translateX(${part2.clientHeight - part1.clientHeight}px)`
          }
          part2.style.transform = ''
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
  transition: all .2s;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  color: #fff;
  font-size: 12px;
  overflow: hidden;
}
.text-part {
  position: absolute;
  left: 10%;
  width: 80%;
  height: 100%;
  transform-origin: 0 50%;
  transition: all .2s ease-in-out;
}
.part {
  position: absolute;
  left: 0;
  bottom: 50%;
  // border: 1px solid red;
  transform-origin: 0 0;
  transition: all .2s ease-in-out;
}
.left-rotate {
  text-align: left;
  transform-origin: 0 0;
  transform: rotate(-90deg) translateY(-100%)
}
.right-rotate {
  text-align: right;
  transform-origin: 100% 0;
  transform: rotate(90deg) translateY(0)
}
</style>