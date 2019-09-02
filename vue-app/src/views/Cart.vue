<template>
  <div>
    <Head title="购物车" :show="true"></Head>
    <Myshoppingcar ></Myshoppingcar>
  </div>
</template>

<script>
export default {
  data() {
    return {
   
    };
  },
  mounted() {
    if(!sessionStorage.username){
      this.$router.push({name:"mine"})
    }
  }

};
</script>

