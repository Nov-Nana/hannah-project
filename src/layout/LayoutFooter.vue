<script setup lang='ts'>

const codePath = 'https://github.com/Nov-Nana/hannah-project'

</script>
<template>
    <n-flex class="footer" justify="center" align="center" :wrap="false">
        <slot>
            <n-text depth="2">
                <n-a>项目源码</n-a>
                <n-a italic :href="codePath" target="_blank">{{ codePath }}</n-a>
            </n-text>
            <n-text depth="3">
                <n-a italic href="https://beian.miit.gov.cn/" target="_blank">京ICP备2024XXXXXX号-1</n-a>
            </n-text>
        </slot>
    </n-flex>
</template>
<style lang='scss' scoped>
// $--footer-height: 50px;
.footer {
    height: $--footer-height;
}
</style>