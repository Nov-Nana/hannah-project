<script setup lang='ts'>
import { computed, ref, toRefs } from 'vue';
import { ColorInfo } from '@/components/ThemeColorSelect/index.d'

/**
 * 传入一个切割过的数组，当滚动到底部时，自动加载更多数据
 */
interface Props {
    data: Array<ColorInfo> | undefined
}
const props = defineProps<Props>()
const { data } = toRefs(props)
const visibleItmes= computed(() => {
    loading.value = false
    return data.value && [...data.value]
})

// onMounted(() => {
//     visibleItmes.value.push(...data.value);
// })
// watch(data, (newValue) => {
//     console.log(data.value)
//     visibleItmes.value.push(...newValue);
// })
const loading = ref(false)
const handleScroll = (e: any) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target
    // 如果滚动条高度 - 滚轮滚动距离 - 元素可见高度 < 10 触底
    if (!loading.value && scrollHeight - (scrollTop + clientHeight) < 10) {
        loadMoreItems()
    }
}
const emits = defineEmits(['getMoreData'])
const loadMoreItems = () => {
    loading.value = true
    emits('getMoreData', visibleItmes.value && visibleItmes.value.length)
}

</script>
<template>
    <n-scrollbar style="max-height: 100%" @scroll="handleScroll">
        <slot name="content" :list="visibleItmes">
        </slot>
        <slot name="loading">
        </slot>
    </n-scrollbar>
</template>
<style lang='scss' scoped></style>