<template>
  <div id="guide">
    <SwipeDemo id="swipeone" :options="swiperOptions">
        <div v-for="(im,i) in imgs" :key="i" class="swiper-slide">
            <img :src="im" alt="" class="g-img" >
            <div>
                <van-button v-if="i==3" type="danger" size="large" id="btn" @click="gotohome(i)">进入首页</van-button>
            </div>
        </div>
    </SwipeDemo>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [
        require("@/assets/images/1.png"),
        require("@/assets/images/2.png"),
        require("@/assets/images/3.png"),
        require("@/assets/images/4.png")
      ],
       swiperOptions: {
        loop: false
      }
    };
  },
  methods:{
      gotohome(i) {
      console.log(i);
      if (i == this.imgs.length - 1) {
        this.$router.push({ name: "home" });
      }
    }
  }
};
</script>


<style scoped>
#guide,
#swipeone,
.g-img {
  width: 100%;
  height: 100%;
}
#btn{
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>