<script setup lang='ts'>
defineProps({
    load: {
        type: Boolean,
        default: true
    },
    repeat: {
        type: Number,
        default: 1
    }
})
</script>
<template>
    <div v-show="load" class="get-skeleton">
        <div v-show="repeat === 1">
            <n-skeleton class="item" v-bind="$attrs"></n-skeleton>
        </div>
        <div v-show="repeat === 2">
            <n-skeleton class="item" v-bind="$attrs"></n-skeleton>
            <n-skeleton class="item" v-bind="$attrs" style="width: 60%;"></n-skeleton>
        </div>
        <div v-show="repeat > 2">
            <n-skeleton class="item" v-bind="$attrs" :repeat="repeat - 2"></n-skeleton>
            <n-skeleton class="item" v-bind="$attrs" style="width: 60%;"></n-skeleton>
            <n-skeleton class="item" v-bind="$attrs" style="width: 50%;"></n-skeleton>
        </div>
    </div>
</template>
<style lang='scss' scoped>
@include get(skeleton) {
    .item{
        margin-top: 5px;
        margin-left: 5px;
    }
    padding-bottom: 5px;
}
</style>