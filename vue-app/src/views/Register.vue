<template>
  <div>
    <Head title="注 册" :show="true"></Head>

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
        v-model="register.username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('请输入4到8位用户名,不能以数字开头')"
      />
    </van-cell-group>

    <van-cell-group>
      <van-field
        id="usertel"
        style="margin-top:.3rem"
        v-model="register.usertel"
        required
        clearable
        label="手机号"
        right-icon="question-o"
        placeholder="请输入手机号"
        @click-right-icon="$toast('请输入11位常用手机号')"
      />
    </van-cell-group>

    <van-cell-group>
      <van-field
        id="userpwd"
        style="margin-top:.3rem"
        v-model="register.userpwd"
        required
        clearable
        type="password"
        label="密码"
        right-icon="question-o"
        placeholder="请输入密码"
        @click-right-icon="$toast('请输入4到6位密码')"
      />
    </van-cell-group>

    <van-cell-group>
      <van-field
        id="userdbpwd"
        style="margin-top:.3rem"
        v-model="register.userdbpwd"
        type="password"
        label="确认密码"
        placeholder="请确认密码"
        required
      />
    </van-cell-group>

    <van-button style="margin-top:.5rem" @click="todoRegister" type="primary" size="large">马上注册</van-button>
    <h4>
      <p>
        已有账号?
        <router-link :to="{name:'login'}">去登陆</router-link>
      </p>
    </h4>
  </div>
</template>

<script>
import { Dialog, Notify, Toast } from "vant"; // js component  必须引入

export default {
  data() {
    return {
      register: {}
    };
  },
  methods: {
    todoRegister() {
      var username = this.register.username;
      var usertel = this.register.usertel;
      var userpwd = this.register.userpwd;
      var userdbpwd = this.register.userdbpwd;
      console.log(userpwd,userdbpwd)

      var tagName = /^[a-zA-Z][a-z0-9A-Z]{3,7}$/.test(username);
      var tagTel = /^1\d{10}$/.test(usertel);
      var tagPwd = /^[a-z0-9A-Z]{4,6}$/.test(userpwd);

      if (tagName) {
        if (tagTel) {
          if (tagPwd) {
            if (userpwd == userdbpwd) {
              this.$axios.post("/vue/register", this.register).then(res => {
                if (!!res.data.type) {
                  Notify({
                    message: res.data.msg,
                    color: "#fff",
                    background:
                      "linear-gradient(to right, #f10180 30%, #fe4e05 100%)",
                    duration: 1000
                  });

                  setTimeout(() => {
                    this.$router.push({ name: "login" });
                  }, 1000);
                } else {
                  Dialog.alert({
                    message: res.data.msg
                  });
                }
              });
            } else {
              Toast("两次密码不一致");
            }
          } else {
            Toast("密码格式错误错误");
          }
        } else {
          Toast("手机号格式错误");
        }
      } else {
        Toast("用户名格式错误");
      }

      // this.$axios.post("/vue/register", this.register).then(res => {
      //   if (!!res.data.type) {
      //     Notify({
      //       message: res.data.msg,
      //       color: "#fff",
      //       background: "linear-gradient(to right, #f10180 30%, #fe4e05 100%)",
      //       duration: 1000
      //     });

      //     setTimeout(() => {
      //       this.$router.push({ name: "login" });
      //     }, 1000);
      //   } else {
      //     Dialog.alert({
      //       message: res.data.msg
      //     });
      //   }
      // });
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