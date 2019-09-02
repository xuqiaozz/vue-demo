<template>
  <div>
    <div class="user-poster">
      <div v-show="isLogin">
        <img :src="src" alt="上传头像" @click="uploadpic" />
        <input type="file" @change="shangchuan" accept="image/*" style="display:none" ref="upload" />
        <p>{{username}}</p>
      </div>

      <div v-show="!isLogin">
        <img src="../assets/images/nologin.jpg" />
        <h4>未登录</h4>
      </div>
    </div>
    <div v-show="isLogin">
      <van-row class="user-links">
        <van-col span="6">
          <van-icon name="pending-payment" />待付款
        </van-col>
        <van-col span="6">
          <van-icon name="tosend" />待发货
        </van-col>
        <van-col span="6">
          <van-icon name="records" />待收货
        </van-col>
        <van-col span="6">
          <van-icon name="edit" />评价
        </van-col>
      </van-row>

      <van-cell-group class="user-group">
        <van-cell icon="records" title="全部订单" is-link />
      </van-cell-group>

      <van-cell-group>
        <van-cell icon="location-o" title="我的地址" is-link @click="gotoaddresslist" />
        <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      </van-cell-group>
    </div>

    <div v-show="isLogin">
      <van-button type="danger" @click="outlogin" size="large" id="btn">退出登录</van-button>
    </div>
    <div v-show="!isLogin">
      <van-button type="info" size="large" id="btn" @click="gotologin">马上登录</van-button>
      <p id="gotoregister">
        没有账号?
        <router-link :to="{name:'register'}">点击注册</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: {
        type: Boolean,
        default: false
      },
      src: "",
      username: ""
    };
  },
  methods: {
    gotoaddresslist() {
      this.$router.push({ name: "addresslist" });
    },

    gotologin() {
      this.$router.push({ name: "login" });
    },
    outlogin() {
      this.isLogin = false;
      sessionStorage.clear();
    },
    uploadpic() {
      this.$refs.upload.click();
    },
    shangchuan() {
      let username = sessionStorage.username;
      let file = this.$refs.upload.files[0];

      let data = new FormData(); //新建  表单对象
      data.append("avatar", file);

      this.$axios("/vue/uploadAvatar", {
        method: "POST",
        data: data,
        username
      }).then(res => {
        console.log(res);
        this.src = res.data.pic;
        sessionStorage.userpic = res.data.pic;
      });
    }
  },
  mounted() {
    // bus.$on("changeshowmy",result=>{
    //   console.log(result)
    // })
    if (sessionStorage.username) {
      this.username = sessionStorage.username;
      this.src = sessionStorage.userpic;
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-poster {
  width: 100%;
  height: 45vw;
  background-image: url("../assets/images/1.jpeg");
  background-size: 100% 100%;
  position: relative;
  margin-bottom: 0.4rem;
  div {
    position: absolute;
    left: 0;
    bottom: 20%;
    top: 0;
    right: 0;
    margin: auto;
    width: 2rem;
    height: 2rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    p,
    h4 {
      font-size: 0.4rem;
      color: #333;
      margin-top: 0.2rem;
      text-align: center;
      font-weight: 600;
    }
  }
}
.user-group {
  margin-bottom: 0.38rem;
}
.user-links {
  padding: 0.32rem 0;
  font-size: 0.25rem;
  text-align: center;
  background-color: #fff;
}
van-icon {
  display: block;
  font-size: 0.45rem;
}

#btn {
  margin-top: 0.4rem;
}

#gotoregister {
  margin-top: 0.4rem;
  text-align: center;
}
</style>