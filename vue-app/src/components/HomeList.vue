<template>
  <div>
    <div id="list">
      <router-link :to="{name:'classify'}">
           <van-row type="flex" justify="space-around">
        <van-col span="5">
          <div class="item">
            <img src="../assets/images/men.jpg" alt />
            <p>男装</p>
          </div>
        </van-col>
        <van-col span="5">
          <div class="item">
            <img src="../assets/images/women.jpg" alt />
            <p>女装</p>
          </div>
        </van-col>
        <van-col span="5">
          <div class="item">
            <img src="../assets/images/shirt.jpg" alt />
            <p>衬衫</p>
          </div>
        </van-col>
        <van-col span="5">
          <div class="item">
            <img src="../assets/images/jeans.jpg" alt />
            <p>牛仔裤</p>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col span="5">
          <div class="item">
            <img src="../assets/images/sweater.jpg" alt />
            <p>卫衣</p>
          </div>
        </van-col>
        <van-col span="5">
          <div class="item">
            <img src="../assets/images/pants.jpg" alt />
            <p>休闲裤</p>
          </div>
        </van-col>
        <van-col span="5">
          <div class="item">
            <img src="../assets/images/suits.jpg" alt />
            <p>西服</p>
          </div>
        </van-col>
        <van-col span="5">
          <div class="item">
            <img src="../assets/images/downcoat.jpg" alt />
            <p>羽绒服</p>
          </div>
        </van-col>
      </van-row>
      </router-link>
    </div>

    <div id="banneradd">
      <router-link :to="{name:'classify'}">
        <img src="../assets/images/cuxiao.jpeg" alt />
      </router-link>
    </div>

    <div id="newgoods">
      <h4>______ 新品推荐 ______</h4>
      <!-- <img id="ggpic" src="../assets/images/newgoods.jpg" alt /> -->
      <!-- <ul id="newgoodslist">
        <li v-for="(item,i) in goodslist" :key="i" :id="item._id">
          <div class="goodsimg">
            <img :src="item.img" alt />
          </div>
          <div class="goodsdetail">
            <p class="goodsname">&ensp;{{item.title}}</p>
            <p class="price">
              &ensp;快抢价&ensp;&ensp;￥
              <span>{{item.discount}}</span>.00
            </p>
            <p class="discount">
              <s>￥{{item.price}}.00</s>&ensp;&ensp;
              <span>{{(item.discount/item.price*10).toFixed(1)}}折</span>
            </p>
          </div>
        </li>
      </ul> -->
      <GoodsList></GoodsList>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodslist: []
    };
  },
  mounted() {
    this.$axios.get("/vue/getgoods").then(res => {
      this.goodslist = res.data.result;
    });
  }
};
</script>



<style lang="scss" scoped>
#list {
  margin-top: 0.3rem;
  .item {
    width: 100%;
    margin-bottom: 0.2rem;
    img {
      width: 100%;
      border-radius: 50%;
      background-color: rgb(0, 0, 0, 0.5);
    }
    p {
      font-size: 0.3rem;
      font-weight: 600;
      text-align: center;
    }
  }
}

#banneradd {
  width: 100%;
  margin-bottom: 0.3rem;
  img {
    width: 100%;
    border-radius: 0.3rem;
  }
}

#newgoods {
  margin-bottom: 0.3rem;
  padding: 0 0.2rem;
  h4 {
    text-align: center;
    font-weight: 600;
  }
  #newgoodslist {
    li {
      display: flex;
      justify-content: space-around;
      width: 100%;
      height: 3.5rem;
      border-bottom: 1px solid #ccc;
      .goodsimg {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 70%;
          height: 70%;
          vertical-align: middle;
        }
      }
      .goodsdetail {
        width: 50%;
        padding: 5% 0;
        p {
          margin-bottom: 0.3rem;
        }
        .goodsname {
          font-size: 0.3rem;
          line-height: .5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; // 控制多行的行数
          -webkit-box-orient: vertical;
        }
        .price {
          height: 0.5rem;
          color: snow;
          font-size: 0.28rem;
          background: linear-gradient(to right, #f10180 30%, #fe4e05 100%);
          span {
            line-height: 0.5rem;
            font-size: 0.4rem;
          }
        }
      }
    }
  }
}
</style>