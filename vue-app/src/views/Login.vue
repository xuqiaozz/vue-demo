<template>
  <div>
    <Head title="登 录" :show="true"></Head>

    <van-icon name="wap-home" id="gobackhome" @click="gobackhome" />
    <div id="logo">
      <div>
        <img src="../assets/images/logo1.jpg" alt />
      </div>
    </div>

    <van-cell-group>
      <van-field
        id="username"
        style="margin-top:.3rem"
        v-model="login.username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('请输入用户名')"
      />
    </van-cell-group>

    <van-cell-group>
      <van-field
        id="userpwd"
        style="margin-top:.5rem"
        v-model="login.userpwd"
        type="password"
        right-icon="question-o"
        label="密码"
        placeholder="请输入密码"
        required
        @click-right-icon="$toast('请输入密码')"
      />
    </van-cell-group>

    <van-button style="margin-top:.5rem" @click="todoLogin" type="danger" size="large">马上登录</van-button>
    <h4>
      <p>忘记密码?</p>
      <a @click="clicka" href="javaScript:#">去找回?</a>/
      <router-link :to="{name:'register'}">重新注册</router-link>
    </h4>
  </div>
</template>

<script>
import { Dialog, Notify, Toast } from "vant"; // js component  必须引入

// const bus=new Vue();

export default {
  data() {
    return {
      login: {}
    };
  },
  methods: {
    todoLogin() {
      if (this.login.username) {
        this.$axios.post("/vue/login", this.login).then(res => {
          if (!!res.data.type) {
            console.log(res);
            sessionStorage.username = res.data.result.username;
            sessionStorage.userpic = res.data.result.pic;

            Notify({
              message: res.data.msg,
              color: "#fff",
              background:
                "linear-gradient(to right, #f10180 30%, #fe4e05 100%)",
              duration: 1000
            });

            // bus.$emit("changeshowmy",res)
            setTimeout(() => {
              if (sessionStorage.url) {
                this.$router.push({ path: sessionStorage.url });
              } else {
                this.$router.push({ name: "mine" });
              }
            }, 1000);
          } else {
            Dialog.alert({
              message: res.data.msg
            });
          }
        });
      } else {
        Toast("用户名不能为空");
      }
    },
    clicka() {
      Toast("好马不吃回头草,干嘛要找!");
    },
    gobackhome() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style lang="scss" scoped>
#logo {
  width: 100%;
  height: 3rem;
  position: relative;
  div {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: auto;
    width: 2.5rem;
    height: 2.5rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}

h4 {
  font-weight: 600;
  text-align: center;
  margin-top: 0.3rem;
  p {
    margin-bottom: 0.3rem;
  }
}

#gobackhome {
  position: fixed;
  top: 0.3rem;
  right: 0.2rem;
  font-size: 0.6rem;
  z-index: 1000;
}
</style>