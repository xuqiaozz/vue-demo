<template>
  <div>
    <van-nav-bar
      :title="title"
      :left-text="show?'返回':''"
      :left-arrow="show"
      @click-left="onClickLeft"
      id="head"
    >
      <div slot="right">
        <van-icon v-if="searchShow" name="search" @click="goSearch" id="search" />
      </div>
    </van-nav-bar>
  </div>
</template>

<script>
import { Dialog } from "vant"; // js component  必须引入

export default {
  data() {
    return {
      searchShow: true
    };
  },
  props: {
    title: {
      type: String,
      default: "xxx"
    },
    show: {
      type: Boolean,
      default: false
    },
    orderid: {
      type: String,
      default: ""
    }
  },
  methods: {
    goSearch() {
      this.$router.push({ name: "search" });
    },
    onClickLeft() {
      console.log(this.$route.name)
      if (this.$route.name == "jiesuan") {
        Dialog.confirm({
          message: "订单还没有完成,确定离开?"
        })
          .then(() => {
            console.log(this.orderid);
            this.$axios
              .post("/vue/updateuserorder", {
                _id: this.orderid,
                type: -1
              })
              .then(res => {
                if (res.data.code == 200) {
                  Dialog.alert({
                    message: res.data.msg
                  }).then(() => {
                    this.$router.push({ name: "home" });
                  });
                }
              });
          })
          .catch(() => {
            return;
          });
      } else {
        this.$router.go(-1);
      }
    }
  },
  mounted() {
    if (this.$route.name != "home") {
      this.searchShow = false;
    }
    // console.log(this.$route.name);
  }
};
</script>

<style lang="scss" scoped>
#search {
  font-size: 0.5rem;
  margin-left: 0.2rem;
  color: aliceblue;
}

#head {
  background: linear-gradient(to right, #f10180 30%, #fe4e05 100%);
  color: rgba(0, 0, 0, 0);
  height: 1.1rem;
  font-size: 0.3rem;
  line-height: 1.1rem;
}
</style>