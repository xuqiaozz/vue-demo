<template>
  <div>
    <Head title="地址列表" :show="true"></Head>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="setaddr"
    />
  </div>
</template>



<script>
import { Dialog, Toast } from "vant"; // js component  必须引入

export default {
  data() {
    return {
      list: [],
      chosenAddressId: ""
    };
  },

  methods: {
    onAdd() {
      this.$router.push({ name: "setaddress" });
    },

    onEdit(item, index) {
   this.$router.push({ name: "updataaddr",query:{item:item} });
  console.log(item)
    },
    setaddr(item, i) {
      console.log(item,i)
      if(item.isdefault==true){
        return
      }else{
        this.$axios.post("/vue/setaddrdefault", item).then(res => {});
      }
    }
  },
  mounted() {
    this.$axios
      .post("/vue/getaddresslist", {
        username: sessionStorage.username
      })
      .then(res => {
        if (res.data.code == 200) {
          this.list = res.data.result;
          // this.chosenAddressId=this.list[0].id
          this.list = this.list.map(function(item, index) {
            return Object.assign(item, { id: index },{address:`${item.province} ${item.city} ${item.county}`});
          });

          if (this.list.length == 0) {
            return;
          } else {
            this.chosenAddressId = this.list.filter(function(item) {
              return item.isdefault == true;
            })[0].id;
          }
        }
      });
  }
};
</script>

