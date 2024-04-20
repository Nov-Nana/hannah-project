<script setup lang='ts'>
import Loading from '../../assets/loading.svg'
</script>
<template>
    <div class="get-loading">
        <img :src="Loading" alt="Loading..."/>
    </div>
</template>
<style lang='scss' scoped>
@include get(loading){
    width: 100%;
    height: 100%;
    background-color: transparent;
    img{
        height: 50px;
    }
}
</style>