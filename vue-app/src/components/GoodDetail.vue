<template>
  <div class="goods">
    <div id="goodimg">
      <img :src="detail.img" alt />
    </div>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ detail.title }}</div>
        <div class="goods-price">
          <span class="item1">&ensp;快抢价&ensp;&ensp;¥</span>
          <span class="item2">{{ detail.discount }}</span>
        </div>
      </van-cell>
      <van-cell class="goods-express">
        <s>&ensp;¥{{ detail.price}}.00</s>
&ensp;&ensp;
        <span>{{ (detail.discount/detail.price*10).toFixed(1) }}
          <i style="font-style:normal;font-size:0.27rem">折</i>
        </span>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="请选择商品规格" is-link @click="goodSku=true" style="color:#999;font-weight:500" />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">我的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
    </van-cell-group>

    <van-goods-action>
      <router-link :to="{name:'home'}">
        <van-goods-action-icon icon="wap-home">首页</van-goods-action-icon>
      </router-link>
       <router-link :to="{name:'cart'}">
      <van-goods-action-icon icon="cart-o" @click="onClickCart">购物车</van-goods-action-icon>
           </router-link>
      <van-goods-action-button type="warning" @click="sorry">加入购物车</van-goods-action-button>
      <van-goods-action-button type="danger" @click="sorry">立即购买</van-goods-action-button>
    </van-goods-action>

    <van-sku
      v-model="goodSku"
      :sku="sku"
      :goods="goods"
      :goods-id="detail._id"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
import { Dialog, Notify } from "vant"; // js component  必须引入
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from "vant";
export default {
  data() {
    return {
      detail: {},
      goodSku: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "尺寸", // skuKeyName：规格类目名称
            v: [
              {
                id: "30349", // skuValueId：规格值 id
                name: "S" // skuValueName：规格值名称
              },
              {
                id: "1215",
                name: "M"
              },
              {
                id: "1171",
                name: "XM"
              },
              {
                id: "1172",
                name: "XXM"
              }
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 1, // skuId，下单时后端需要
            price: "", // 价格（单位分）
            s1: "1215", // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: 110, // 当前 sku 组合对应的库存
            size: "S",
            title: "",
            goodimg: ""
          },
          {
            id: 2, // skuId，下单时后端需要
            price: "", // 价格（单位分）
            s1: "30349", // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: 110, // 当前 sku 组合对应的库存
            size: "M",
            title: "",
            goodimg: ""
          },
          {
            id: 3, // skuId，下单时后端需要
            s1: "1171", // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: 110, // 当前 sku 组合对应的库存
            size: "XM",
            title: "",
            goodimg: ""
          },
          {
            id: 3, // skuId，下单时后端需要
            price: "", // 价格（单位分）
            s1: "1172", // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: 110, // 当前 sku 组合对应的库存
            size: "XXM",
            title: "",
            goodimg: ""
          }
        ],
        price: "", // 默认价格（单位元）
        stock_num: 227, // 商品总库存

        hide_stock: true // 是否隐藏剩余库存
      },
      goods: {
        // 商品标题
        title: "",
        // 默认商品 sku 缩略图
        picture: ""
      }
    };
  },
  methods: {
    onClickCart() {
      // this.$router.push({name:"cart"});
    },
    sorry() {
      Toast("请选择商品规格~");
    },
    onBuyClicked(res) {
         Toast("来不及后续逻辑了");
    },
    onAddCartClicked(res) {
      if (sessionStorage.username) {
        let obj = {
          username: sessionStorage.username,
          goodsid: res.goodsId,
          goodstitle: res.selectedSkuComb.title,
          goodsprice: res.selectedSkuComb.price / 100,
          goodssize: res.selectedSkuComb.size,
          goodimg: res.selectedSkuComb.goodimg,
          buynum: res.selectedNum
        };
        this.$axios.post("/vue/addshopcar", obj).then(res => {
          if (res.data.code == 200)
            [
              Dialog.confirm({
                message: res.data.msg + ",是否进入购物车结算"
              })
                .then(() => {
                  this.$router.push({ name: "cart" });
                })
                .catch(() => {
                  this.$router.push({ name: "classify" });
                })
            ];
        });
      } else {
        Dialog.confirm({
          message: "您还没有登录,请先登录"
        })
          .then(() => {
            sessionStorage.url=this.$route.fullPath
            this.$router.push({ name: "login" });
          })
          .catch(() => {
            return;
          });
      }
    }
  },
  mounted() {
    this.detail = this.$parent.detail;
    this.sku.price = this.$parent.detail.discount + ".00";
    this.goods.picture = this.$parent.detail.img;
    this.goods.title = this.$parent.detail.title;
    this.sku.list.forEach(item => {
      item.price = this.$parent.detail.discount * 100;
      item.title = this.$parent.detail.title;
      item.goodimg = this.$parent.detail.img;
    });
  }
};
</script>

<style lang="scss" scoped>
.goods {
  padding-bottom: 50px;
  #goodimg {
    width: 100%;
    height: 6rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .goods-title {
    font-size: 0.35rem;
    font-weight: 600;
  }
  .goods-price {
    margin-top: 0.3rem;
    height: 0.6rem;
    line-height: 0.6rem;
    color: aliceblue;
    background: linear-gradient(to right, #f10180 60%, #fe3b07 100%);
    .item1 {
      font-size: 0.3rem;
    }
    .item2 {
      font-size: 0.45rem;
    }
  }
  .goods-express {
    color: #ccc;
    font-size: 0.3rem;
    padding: 0.2rem 0.4rem;
    s {
      color: rgb(253, 0, 0);
      font-size: 0.3rem;

    }
    span{
      font-size: 0.38rem;
      color: #111111;
    }
  }
  .goods-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
  .goods-tag {
    margin-left: 0.1rem;
  }
}
</style>