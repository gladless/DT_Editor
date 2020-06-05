<template>
  <div class="scroller">
    <p class="change-text" :class="getIndex() < 0 ? 'wait-p' : 'close-p'"></p>
    <p class="change-text" :class="getIndex() < 0 ? 'curr-p' : (getIndex() == 0 ? 'wait-p' : 'close-p')">
      <span :class="getIndex() < 0 ? 'curr-text' : (getIndex() == 0 ? 'wait-text' : 'close-text')">--（准备开始）--</span>
    </p>
    <p v-for="(item, i) in getTextArr()" :key="i" class="change-text" :class="i == getIndex() ? 'curr-p' : (i == getIndex() -1 || i == getIndex() + 1 ? 'wait-p' : 'close-p')">
      <span class="change-text" :class="i == getIndex() ? 'curr-text' : (i == getIndex() -1 || i == getIndex() + 1 ? 'wait-text' : 'close-text')">{{item}}</span>
    </p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  methods: {
    ...mapGetters({
      getTextArr: 'getTextArr',
      getIndex: 'getIndex'
    })
  }
}
</script>

<style lang="less" scoped>
.scroller {
  position: absolute;
  top: 10px;
  left: 10%;
  width: 80%;
  height: 100px;
  color: rgba(255,255,0,1);
  overflow: hidden;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
}
.curr-text {
  font-size: 20px;
}
.wait-text {
  color: #9a9a37;
}
.close-text {
  display: inline-block;
  width: 0;
  height: 0;
  overflow: hidden;
}
.change-text {
  transition: all .3s ease-in-out;
}
.curr-p {
  height: 32px;
}
.wait-p {
  height: 30px;
}
.close-p {
  height: 0
}
</style>