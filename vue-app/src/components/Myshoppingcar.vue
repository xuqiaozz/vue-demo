<template>
  <div id="content">
    <div v-if="hasgoods">
      <div v-for="(item,i) in list" :key="i" class="goodsItem" :id="item._id">
        <div class="picked">
          <van-checkbox class="checkedInput" v-model="item.ischecked"></van-checkbox>
        </div>
        <div class="good">
          <div class="imgdiv">
            <img :src="item.goodimg" alt />
          </div>
          <div class="gooddes">
            <p class="title">{{item.goodstitle}}</p>
            <p class="goodsku">
              <span class="pricebox">
                ￥
                <span class="price">{{item.goodsprice}}</span>.00
              </span>
              <span class="size">
                尺寸 :
                <a href="javascript:#">{{item.goodssize}}</a>
              </span>
            </p>
            <div class="_num">
              <van-icon name="delete" class="delete" @click="delone(i,item._id)" />
              <div class="numbox">
                <van-stepper v-model="item.buynum" @change="changebuynum(item.buynum,item._id)" />
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link v-else :to="{name:'classify'}" class="emptydiv">
      <div class="empty">
        <i>
          <img src="../assets/images/gwc.jpg" alt />
        </i>
        <p>
          购物车既然是空的
          <br />再忙,也要记得买点什么犒劳自己
        </p>
      </div>
    </router-link>

    <van-submit-bar id="sss" :price="total" button-text="去结算" @submit="onSubmit">
      <van-checkbox v-model="quan">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>


<script>

import { Dialog, Toast } from "vant"; // js component  必须引入
export default {
  data() {
    return {
      list: [],
      isLogin: false,
      hasgoods: true
    };
  },
  computed: {
    total: {
      get() {
        var total = 0;
        this.list.forEach(item => {
          if (item.ischecked) {
            total += item.goodsprice * item.buynum;
          }
        });

        return total * 100;
      }
    },
    quan: {
      get() {
        var flag = true;
        this.list.forEach(item => {
          if (!item.ischecked) {
            flag = false;
          }
        });

        return flag;
      },
      set(val) {
        this.list = this.list.map(item => {
          item.ischecked = val;
          return item;
        });
      }
    }
  },
  methods: {
    changebuynum(count, id) {
      this.$axios
        .post("/vue/addone", {
          _id: id,
          buynum: count
        })
        .then(res => {});
    },

    onSubmit() {
      let truelist = this.list.filter(item => {
        if (item.ischecked) {
          return item;
        }
      });

      console.log(truelist);

      if (truelist.length == 0) {
        Dialog.alert({
          message: "至少选择一件商品!"
        });
        return;
      } else {
        //创建新订单
        this.$axios
          .post("/vue/adduseroder", {
            username: sessionStorage.username,
            goodsinfo: truelist
          })
          .then(res => {
            if (res.data.code == 200) {
              console.log(res.data.msg);

              let _ids = truelist.map(item => {
                return { _id: item._id };
              });
              //新订单创建完毕  删除购物车信息
              this.$axios
                .post("/vue/delcartinfo", {
                  _ids
                })
                .then(res => {
                  if (res.data.code == 200) {
                    this.$router.push({ name: "jiesuan" });
                  }
                });
            }
          });
      }
    },
    delone(i, id) {
      this.$axios
        .post("/vue/delusercart", {
          _id: id
        })
        .then(res => {
          if (res.data.code == 200) {
            this.list.splice(i, 1);
          }
        });
    },
    addone(id, count) {
      this.$axios
        .post("/vue/addone", {
          _id: id,
          buynum: count,
          type: 1
        })
        .then(res => {
          if (res.data.code == 200) {
          }
        });
    },

    reduceone(id, count) {
      if (count == 1) {
        Toast("至少要留一件哟");
        return;
      }

      this.$axios
        .post("/vue/addone", {
          _id: id,
          buynum: count,
          type: -1
        })
        .then(res => {});
    }
  },
  mounted() {
    if (sessionStorage.username) {
      this.$axios
        .post("/vue/getusercarinfo", {
          username: sessionStorage.username
        })
        .then(res => {
          this.list = res.data.carList;
          if (this.list.length) {
            this.hasgoods = true;
          } else {
            this.hasgoods = false;
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#content {
  margin-bottom: 2.5rem;
}

.goodsItem {
  margin: 0.1rem 0;
  padding: 0.1rem;
  height: 1.8rem;
  display: flex;
  justify-content: flex-start;
  color: #000;
  background: rgb(252, 252, 252);
  .picked {
    display: flex;
    align-items: center;
  }
  .good {
    flex: 1;
    display: flex;
    .imgdiv {
      width: 25%;
      display: flex;
      justify-content: center;
      img {
        width: 80%;
        display: inline-block;
      }
    }
    .gooddes {
      padding: 0 0.2rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        margin: 0.1rem 0;
      }
      .title {
        font-size: 0.3rem;
        font-weight: 550;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; // 控制多行的行数
        -webkit-box-orient: vertical;
        color: rgb(50, 50, 68);
      }
      .goodsku {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .size {
          margin-right: 0.25rem;
          font-size: 0.25rem;
          color: #999;
          a {
            font-size: 0.22rem;
            color: rgb(110, 0, 86);
          }
        }
        .pricebox {
          color: rgb(170, 32, 32);
        }
      }
      ._num {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .delete {
          color: rgb(51, 23, 23);
          font-size: 0.5rem;
        }
        .numbox {
          display: flex;
          justify-content: space-between;
          input {
            font-size: 0.32rem;
            width: 0.5rem;
            height: 0.5rem;
            line-height: 0.5rem;
          }
          .add,
          .reduce {
            font-size: 0.4rem;
          }

          .buy_num {
            text-align: center;
            margin: 0 0.05rem;
            outline: none;
            border: none;
          }
        }
      }
    }
  }
}

#sss {
  bottom: 1rem;
  padding: 0.2rem;
}

.empty {
  width: 100%;
  height: 100%;
  line-height: 100%;
  text-align: center;
  position: relative;

  i {
    display: block;
    width: 2rem;
    height: 2rem;
    line-height: 5rem;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  p {
    position: absolute;
    left: 0;
    bottom: 10%;
    right: 0;
    margin: auto;
    font-size: 0.3rem;
  }
}

.emptydiv {
  display: block;
  overflow: hidden;
  height: 5rem;
  margin-top: 1rem;
}
</style>