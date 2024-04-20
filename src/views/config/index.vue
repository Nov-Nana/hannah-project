<script setup lang='ts'>
import { menuSetting } from '@/settings/menuSetting'
import { ref } from 'vue';

// const t = window['$t']
const menuList = ref(menuSetting)
const setMenuList = () => {
    console.log(menuList.value);

}
setMenuList()
</script>
<template>
    <n-flex class="get-menu-box">
        <div class="menu-list">
            <n-scrollbar style="max-height: 100%;">

                <n-collapse accordion>
                    <template v-for="(item, index ) in menuList.menu">
                        <div class="name" v-if="!item.children" :name="index">{{ item.key }}</div>
                        <n-collapse-item v-else :title="item.key" :name="index">
                            <div class="name" v-for="(c, i) in item.children" :name="i">{{ c.key }}</div>
                        </n-collapse-item>
                    </template>
                </n-collapse>
                
            </n-scrollbar>
        </div>
        <div class="menu-form">
            表单
        </div>
    </n-flex>
</template>
<style lang='scss' scoped>
@include get(menu-box) {
    padding: 20px;
    height: calc(100vh - 60px);
    background-color: pink;
    overflow: hidden;

    .menu-list {
        height: 100%;
        width: 200px;

        .n-collapse {
            height: 100%;

            .name:not(:first-child) {
                padding-top: 16px;
            }

            .name {
                padding-left: 20px;
                cursor: pointer;
            }

            .n-collapse-item {
                border: none;
                padding: 0;
                margin: 0;
            }
        }

    }
}
</style>