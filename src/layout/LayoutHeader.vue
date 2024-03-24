<script setup lang='ts'>

</script>
<template>
    <n-layout-header>
        <n-flex justify="space-between" :wrap="false">
            <n-flex justify="start">
                <slot name="left"></slot>
            </n-flex>
            <n-flex justify="center">
                <slot name="center"></slot>
            </n-flex>
            <n-flex justify="end">
                <slot name="right-left"></slot>
                hannah
                <slot name="right-right"></slot>
            </n-flex>
        </n-flex>
    </n-layout-header>
</template>
<style lang='scss' scoped></style>