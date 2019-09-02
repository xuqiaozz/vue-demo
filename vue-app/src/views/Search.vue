<template>
  <div>
    <van-search
      v-model="keyword"
      placeholder="请输入商品名称"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />

    <List :goods="goods" @changeallgoods="getgoods"></List>

    <!-- <List :goods="goods" @changeallgoods="getgoods"></List> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      goods: []
    };
  },
  methods: {
    onSearch() {
      // enter 键盘的回车
      console.log(this.keyword);
      this.$axios
        .get("/vue/getgoods", {
          params: {
            keyword: this.keyword
          }
        })
        .then(res => {
          console.log(res)
          this.goods = res.data.result;
        });
    },
    onCancel() {
      (this.keyword = ""), this.$router.go(-1);
    },
    getgoods() {
      this.goods.reverse();
    }
  },
  mounted() {
  }
};
</script>
