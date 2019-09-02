<template>
  <div>
    <Head title="首 页"></Head>

    <div class="swipe-box">
      <van-swipe class="h-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(b,i) in imgs" :key="i">
          <img :src="b" class="h-img" alt />
        </van-swipe-item>
      </van-swipe>
    </div>

    <HomeList></HomeList>

    <p>
      <router-link :to="{name:'classify'}" id="more">点击查看更多</router-link>
    </p>
  </div>
</template>

<script>
export default {
  nameL: "home",
  data() {
    return {
      imgs: [
        require("@/assets/images/banner1.jpg"),
        require("@/assets/images/banner2.jpg"),
        require("@/assets/images/banner3.jpg"),
        require("@/assets/images/banner4.jpg"),
        require("@/assets/images/banner5.jpg")
      ]
    };
  },
  mounted() {}
};
</script>


<style scoped>
.swipe-box,
.h-swipe,
.h-img {
  width: 100%;
  height: 3.5rem;
}
p {
  margin-bottom: 1.5rem;
  text-align: center;
}
#more {
  
  font-size: 0.32rem;
  color: #999;
}
</style>