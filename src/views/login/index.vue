<script setup lang='ts'>
import LayoutHeader from '@/layout/LayoutHeader.vue';
import LayoutFooter from '@/layout/LayoutFooter.vue'
</script>
<template>
    <div class="get-login-box">
        <LayoutHeader>
        </LayoutHeader>
        <div class="get-login-content">登录界面</div>
        <LayoutFooter class="login-footer"></LayoutFooter>
    </div>
</template>
<style lang='scss' scoped>
$--login-height: 100vh;

@include get(login-box){
    height: $--login-height;
    overflow: hidden;

    @include get(login-content){
        height: calc(100vh - $--header-height - $--footer-height);
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
}

.login-footer{
    background-color: transparent;
}

</style>