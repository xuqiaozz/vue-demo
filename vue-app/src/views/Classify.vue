<template>
  <div>
    <div>
      <Searchinput></Searchinput>
    </div>

    <van-tabs v-model="activeName" title-active-color="#f44" swipeable>
      <van-tab
        v-for="(ts,i) in typeList"
        :key="i"
        :title="ts.split('/')[1]"
        :name="ts.split('/')[0]"
      >
        <List
          @changeallgoods="getNewGoodList"
          :goodtype="ts"
          :goodList="goodList"
          :goods="goodList.filter(item=>item.type==ts)"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodList: [],
      typeList: [],
      activeName: 0
    };
  },
  methods: {
    getNewGoodList() {
      this.goodList.reverse();
    }
  },
  created() {
    this.$axios.get("/vue/getgoods").then(res => {
      this.goodList = res.data.result;
      console.log(res);
    });
  },
  mounted() {
    this.$axios.get("/vue/getgoodtypes").then(res => {
      this.typeList = res.data.result;
      console.log(res);
    });
  }
};
</script>
