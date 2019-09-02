<template>
  <div id="mian">
    <div id="searchInput">
      <input type="text" placeholder="请输入商品名称" @focus="gotosearch" />
      <div id="icon">
        <van-icon name="search" id="search" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    gotosearch() {
      this.$router.push({ name: "search" });
    }
  }
};
</script>

<style lang="scss" scoped>
::placeholder {
  color: #999;
  font-size: 0.3rem;
  height: 0.66rem;
  line-height: 0.66rem;
}
#mian {
  width: 100%;
  height: 1.1rem;
  background: linear-gradient(to right, #f10180 30%, #fe4e05 100%);
  position: relative;

  #searchInput {
    width: 70%;
    height: 0.66rem;
    line-height: 0.66rem;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 10px;
    background: #fff;

    input {
      width: 88%;
      height: 0.53rem;
       line-height: 1.1rem;
      outline: none;
      border: none;
      margin-left: 6px;
      padding: 2px 5px;
    }
    #icon {
      position: absolute;
      right: 0.2rem;
      top: 0.13rem;

      #search {
        font-size: 0.45rem;
      }
    }
  }
}
</style>

