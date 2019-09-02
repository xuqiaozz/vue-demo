<template>
  <footer>
    <div v-for="(foot,i) in foots" :key="i">
      <router-link :to="{name:foot.name}">
        <i class="iconfont" v-html="foot.icon"></i>
        <span>{{foot.txt}}</span>
       
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      foots: [
        { txt: "首页", path: "/index/home", name: "home", icon: "&#xe62a;" },
        {
          txt: "分类",
          path: "/index/classify",
          name: "classify",
          icon: "&#xe778;"
        },
        { txt: "购物车", path: "/index/cart", name: "cart", icon: "&#xe614;" },
        { txt: "我的", path: "/index/mine", name: "mine", icon: "&#xe60c;" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
  width: 100%;
  height: 0.85rem;
  left: 0;
  bottom: 0;
  background: #fff;
  display: flex !important;
  z-index: 1000;
  padding-top: 0.15rem;
  border-top: 0.01rem solid #ccc;
  div {
    flex: 1;
    height: 0.85rem;
    a {
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 0.06rem 0;
      text-align: center;
      font-family: "微软雅黑";
      color: #999;
      position: relative;
      i {
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.6rem !important;
      }
      span {
        padding-top: 0.05rem;
        width: 100%;
        height: 0.35rem;
        line-height: 0.35rem;
        font-size: 0.25rem;
      }
      .hot {
        position: absolute;
        top: -15%;
        left: 60%;
        width: 0.12rem;
        height: 0.25rem;
        border-radius: 50%;
        line-height: 0.28rem;
      }
    }
    .nav-active,
    .router-link-exact-active {
      color: rgb(255, 38, 0);
      border-color: orangered;
    }
  }
}
</style>
