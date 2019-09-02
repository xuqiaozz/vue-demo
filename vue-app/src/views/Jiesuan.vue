<template>
  <div>
    <Head title="订单结算" :show="true" :orderid="list._id"></Head>
    <router-link :to="{name:'addresslist'}">
      <div class="addrinfo" v-if="hasadd">
        <div class="defaultaddr">
          <div class="name_tel">
            <p class="name">
              <van-icon name="friends" class="nameicon" />
              <span>{{useradd.name}}</span>
            </p>
            <p class="tel">
              <van-icon name="phone" class="telicon" />
              <span>{{useradd.tel}}</span>
            </p>
          </div>
          <div class="addr">
            <van-icon name="map-marked" class="addricon" />
            <span>{{useradd.province+" "+useradd.city+" "+useradd.county}}</span>
          </div>
        </div>
        <van-icon class="gotoaddr" name="arrow" />
      </div>
      <div class="emptyadd" v-else>点击添加新地址</div>
    </router-link>

    <div class="hr"></div>

    <div class="orderlist">
      <div class="orderitem" v-for="(item,i) in list.goodsinfo" :key="i">
        <div class="imgdiv">
          <img :src="item.goodimg" alt />
        </div>
        <div class="goodinfo">
          <p class="goodtitle">{{item.goodstitle}}</p>
          <p class="goodprice">
            ¥
            <span>{{item.goodsprice}}</span>.00&ensp;&ensp;✘
            <span>{{item.buynum}}</span>
          </p>
        </div>
      </div>
    </div>

    <van-submit-bar :price="totalprice" button-text="提交订单" @submit="onSubmit"></van-submit-bar>
  </div>
</template>



<script>
import { Dialog, Notify } from "vant"; // js component  必须引入

export default {
  data() {
    return {
      list: [],
      totalprice: 0,
      useradd: {},
      hasadd: true
    };
  },
  methods: {
    onSubmit() {
      this.$axios
        .post("/vue/updateuserorder", {
          _id: this.list._id,
          type: 1
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
    }
  },
  mounted() {
    if (sessionStorage.username) {
      this.$axios
        .post("/vue/getuserorder", {
          username: sessionStorage.username,
          type: 0
        })
        .then(res => {
          this.list = res.data.result[0];
          console.log(this.list);
          var a = 0;
          var picelist = this.list.goodsinfo.map(item => {
            a += item.goodsprice * item.buynum;
            return a;
          });
          this.totalprice = picelist[picelist.length - 1] * 100;
        });

      //获取地址
      this.$axios
        .post("/vue/getdefaultaddr", {
          username: sessionStorage.username,
          isdefault: true
        })
        .then(res => {
          this.useradd = res.data.result[0];
          if (res.data.result.length) {
            this.hasadd = true;
          } else {
            this.hasadd = false;
          }
        });
    }
  }
};
</script>


<style lang="scss" scoped>
.addrinfo {
  padding: 0.4rem;
  display: flex;
  justify-content: space-between;
  color: rgb(75, 75, 75);
  .defaultaddr {
    width: 80%;
    height: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name_tel {
      display: flex;
      justify-content: space-between;
      .name {
        display: flex;
        align-items: center;
        .nameicon {
          margin-right: 0.1rem;
          font-size: 0.4rem;
        }
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1; // 控制多行的行数
          -webkit-box-orient: vertical;
          font-size: 0.3rem;
        }
      }
      .tel {
        display: flex;
        align-items: center;
        .telicon {
          margin-right: 0.1rem;
          font-size: 0.4rem;
        }
        span {
          font-size: 0.3rem;
        }
      }
    }
    .addr {
      display: flex;
      align-items: center;
      .addricon {
        margin-right: 0.1rem;
        font-size: 0.4rem;
      }
      span {
        font-size: 0.3rem;
          overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; // 控制多行的行数
      -webkit-box-orient: vertical;
      }
    }
  }
  .gotoaddr {
    width: 10%;
    text-align: center;
    line-height: 1rem;
    font-size: 0.5rem;
  }
}

.hr {
  height: 2px;
  background: repeating-linear-gradient(
    -45deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #1989fa 0,
    #1989fa 45%,
    transparent 0,
    transparent 50%
  );
  background-size: 80px;
}

.orderitem {
  padding: 0.4rem;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #ccc;
  .imgdiv {
    width: 20%;
    margin-right: 0.5rem;
    img {
      width: 100%;
    }
  }
  .goodinfo {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .goodtitle {
      font-size: 0.32rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; // 控制多行的行数
      -webkit-box-orient: vertical;
    }
  }
}

.emptyadd {
  height: 1.5rem;
  text-align: center;
  line-height: 1.5rem;
}
</style>