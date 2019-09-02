<template>
  <div>
    <Head title="地址管理" :show="true"></Head>
    <van-address-edit
      :area-list="areaList"
      :address-info="addressDetail"
      show-search-result
      show-delete
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>


<script>
import { Dialog, Toast } from "vant"; // js component  必须引入
import areaList from "../utils/area";

export default {
  data() {
    return {
      areaList: areaList,
      addressDetail: {}
    };
  },

  methods: {
    onSave(res) {
      this.$axios.post("/vue/updateaddr", res).then(res => {
        if (res.data.code == 200) {
          this.$router.push({ name: "addresslist" });
        }
      });
    },
    onDelete(res) {
      let { isdefault, _id, username } = res;
      this.$axios
        .post("/vue/deladdr", { isdefault, _id, username })
        .then(res => {
          this.$router.push({ name: "addresslist" });
        });
    }
  },
  mounted() {
    this.addressDetail = this.$route.query.item;
    console.log(this.$route.query.item);
  }
};
</script>