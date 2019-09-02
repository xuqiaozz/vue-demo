<template>
  <div class="l-item move-in" v-if="good.type">
    <router-link :to="{name:'good',params:{goodId:good._id},query:{title:good.title}}">
      <li>
        <div class="goodsimg">
          <img :src="good.img" alt />
        </div>
        <div class="goodsdetail">
          <p class="goodsname">&ensp;{{good.title}}</p>
          <p class="price">
            &ensp;快抢价&ensp;&ensp;￥
            <span>{{good.discount}}</span>.00
          </p>
          <p class="discount">
            <s>￥{{good.price}}.00</s>&ensp;&ensp;
            <span>{{(good.discount/good.price*10).toFixed(1)}}折</span>
          </p>
        </div>
      </li>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["good"]
};
</script>

<style lang="scss" scoped>
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

.move-in {
  animation: fadeIn 0.9s;
}
</style>
