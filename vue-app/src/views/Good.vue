<template>
  <div v-if="show">
    <Head :title="$route.query.title" :show="true"></Head>
    
    
    <GoodDetail></GoodDetail>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      detail: {},
      flag: false,
      rating: 5,
      count: 1,
      total: 0
    };
  },
  mounted() {
    this.$axios
      .get("/vue/getgooddetail", {
        params: {
          goodId: this.$route.params.goodId
        }
      })
      .then(res => {
        this.detail = res.data.result;
        this.show = true;
      });
  }
};
</script>