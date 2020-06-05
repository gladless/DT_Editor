<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
* {
  margin: 0;
}
html, body {
  width: 100%;
  height: 100%;
  background-color: #000;
  overflow: hidden;
}

/* 按钮 */
.btn {
  display: inline-block;
  padding:4px 12px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0);
  color: #fff;
  font-size: 16px;
  transition: all .2s;
}
.btn:hover {
  cursor: pointer;
  font-weight: bold;
  padding:6px 15px;
}

/* 设置窗口 */
.setting {
  position: absolute;
  left: 10px;
  z-index: 99;
  bottom: 0;
  transition: all .2s ease-in-out;
  background-color: #000;
  width: calc(100% - 10px);
  height: 180px;
  border: 5px dashed rgba(255, 255, 0, .4);
  border-radius: 22px;
  box-sizing: border-box;
  padding: 5px 20px;
}
.closedSetting {
  transform: translateY(100%);
  opacity: 0;
}
.close-setting {
  font-size: 14px;
  color: #fff;
  display: inline-block;
  position: absolute;
  right: 20px;
  top: 5px;
}
.close-setting:hover {
  cursor: pointer;
}

/* 提示文本 */
.tips {
  color: rgba(255, 0, 0, .68);
  font-size: 14px;
  line-height: 24px;
}

/* 彩色窗口 */
.color-box {
  box-shadow: -5px 0 10px rgba(0, 255, 255, .5), 
              5px 0 10px rgba(255, 0, 0, .5);
}
/* 发光窗口  */
.light-box {
    box-shadow: -1px 0 15px rgba(255, 255, 255, .2), 
              1px 0 15px rgba(255, 255, 255, .2);
}

</style>
