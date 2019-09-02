<template>
 
  <ul id="newgoodslist">
    <li v-for="(item,i) in goodslist" :key="i" :id="item._id">
      <router-link :to="{name:'good',params:{goodId:item._id},query:{title:item.title}}">
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
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      goodslist: []
    };
  },
  mounted() {
    this.$axios.get("/vue/getgoods",{params:{limit:30}}).then(res => {
      this.goodslist = res.data.result;
    });
  }
};
</script>

<style lang="scss" scoped>
#newgoodslist {
  a {
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
        line-height: 0.5rem;
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
</style>