<template>
    <div class="l-main">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> 
            <Item v-for="(good,i) in goods" :key="i" :good="good"></Item>
        </van-pull-refresh>
    </div>
</template>

<script>
export default {
    props:["goodtype","goods","goodList"],
    data(){
        return {
            isLoading:false
        }
    },
    methods:{
        onRefresh(){
            console.log("开始 刷新..."+this.isLoading);
            setTimeout(()=>{
                this.isLoading = false;
                this.$toast('下拉刷新成功');
                // 自定义事件
                this.$emit("changeallgoods")
            },1000)
        }
    },
    mounted(){
        console.log(this.goods)
    }
}
</script>

<style lang="scss" scoped>
.l-main{
    width:100%;
    padding:0 10px;
    box-sizing: border-box;
}

</style>