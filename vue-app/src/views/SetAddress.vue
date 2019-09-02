<template>
  <div>
    <Head title="添加地址" :show="true"></Head>
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
      @save="onSave"
    />
  </div>
</template>


<script>
import { Dialog, Toast } from "vant"; // js component  必须引入
import areaList from "../utils/area";

export default {
  data() {
    return {
      areaList:areaList,
    };
  },

  methods: {
    onSave(res) {
      console.log(res);
      //addressDetail: "少时诵诗书所所"
      // areaCode: "110101"
      // city: "北京市"
      // country: ""
      // county: "东城区"
      // isDefault: true
      // name: "三四十"
      // postalCode: "000000"
      // province: "北京市"
      // tel: "16602121210"
        let obj={
          username: sessionStorage.username,
          name: res.name,
          tel: res.tel,
          isdefault: res.isDefault,
          province:res.province,
          city:res.city,
          county:res.county,
          addressDetail:res.addressDetail

        }
        console.log(obj)
      this.$axios
        .post("/vue/addaddress", obj)
        .then(res => {
          this.$router.push({ name: "addresslist" });
        });
    },
  },
};
</script>