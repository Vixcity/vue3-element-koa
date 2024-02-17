<template>
  <div class="welcome">
    <div class="content">
      <div class="sub-title">欢迎体验</div>
      <div class="title">Vixcity后台通用管理系统</div>
      <!-- <div class="heart">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div> -->
      <canvas id=a></canvas>

      <div class="desc">
        - Vue3.0+elementPlus+Node+Mongo打造的通用后台管理系统
      </div>
    </div>
    <div class="img">
      <img src="" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style lang="scss">
// body {
//   margin: 0;
//   /* 图形在页面窗口的高度 */
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   /* 渐变背景图 */
//   background: radial-gradient(circle at center, #937bda, #000);
// }

// .heart {
//   width: 280px;
//   height: 220px;
//   display: flex;
//   justify-content: space-between;
//   /* border: 1px solid red; */
// }

// .heart span {
//   /* 函数方法多次调用的时候好用 */
//   --c: plum;
//   --h: 50%;
//   --t: 25%;
//   background-color: var(--c);
//   width: 20px;
//   /* 边框圆角 */
//   border-radius: 10px;
//   position: relative;
//   height: var(--h);
//   top: var(--t);
//   /*  播放间隔1s   无限次播放   infinite */
//   animation: beating 1s infinite;
// }

// /* 后代选择器   第一个span和第九个*/
// .heart span:nth-child(1),
// .heart span:nth-child(9) {
//   --c: lightcoral;
//   --h: 80px;
//   --t: 20px;
// }

// .heart span:nth-child(2),
// .heart span:nth-child(8) {
//   --c: lightskyblue;
//   --h: 120px;
//   --t: 12x;
// }

// .heart span:nth-child(3),
// .heart span:nth-child(7) {
//   --c: lightgreen;
//   --h: 160px;
//   --t: 0px;
// }

// .heart span:nth-child(4),
// .heart span:nth-child(6) {
//   --c: gold;
//   --h: 180px;
//   --t: 16px;
// }

// .heart span:nth-child(5) {
//   --c: plum;
//   --h: 180px;
//   --t: 32px;
// }

// @keyframes beating {

//   0%,
//   30% {
//     height: var(--h);
//     top: var(--t);
//     background-color: var(--c);
//     filter: blur(0);
//   }

//   60%,
//   70% {
//     height: 50%;
//     top: 25%;
//     background-color: plum;
//     /* 模糊 */
//     filter: blur(5px);
//   }
// }

.welcome {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .content {
    position: relative;
    bottom: 40px;

    .sub-title {
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }

    .title {
      font-size: 40px;
      line-height: 62px;
      color: #409eff;
    }

    .desc {
      text-align: right;
      font-size: 14px;
      color: #999;
    }
  }

  .img {
    margin-left: 105px;
    background-image: url('@/assets/images/welcome.png');
    width: 371px;
    height: 438px;
  }
}
</style>
