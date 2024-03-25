<script setup lang='ts'>
import {ThemeSelect} from '@/components/ThemeSelect/'
</script>
<template>
    <n-layout-header class="header">
        <n-flex justify="space-between" :wrap="false">
            <n-flex justify="start">
                <slot name="left">
                    <div class="header-left"></div>
                </slot>
            </n-flex>
            <n-flex justify="center">
                <slot name="center">
                    <div class="header-center"></div>
                </slot>
            </n-flex>
            <n-flex justify="end">
                <slot name="right-left"></slot>
                <ThemeSelect></ThemeSelect>
                <slot name="right-right"></slot>
            </n-flex>
        </n-flex>
    </n-layout-header>
</template>
<style lang='scss' scoped>
$--padding: 20px;
.header{
    height: $--header-height;
    line-height: $--header-height;
    background-color: pink;
    padding: 0 $--padding;
    .header-left{
        width: 100px;
    }
    .header-center{
        width: 100px;
    }
}
</style>