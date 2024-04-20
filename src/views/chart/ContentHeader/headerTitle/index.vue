<script setup lang='ts'>
import { computed, ref, nextTick } from 'vue';
import { icon } from '@/plugins';
import { getRouteParams, setTitle } from '@/utils';

const { Browsers } = icon.ionicons5
const getProjectInfoById = () => {
    const id = getRouteParams()
    if (id.length) {
        return id
    }
    return ''
}
const title = ref(getProjectInfoById() || '')
const computedTitle = computed(() => {
    title.value = title.value.replace(/\s/g, '')
    const newTitle = title.value.length ? title.value : '新项目'
    setTitle(`工作空间-${newTitle}`)
    return newTitle
})
const focus = ref(false)
const handleBlur = () => {
    focus.value = false
}
const inputInstRef = ref<HTMLElement | null>(null)
const handleFocus = () => {
    focus.value = true
    nextTick(() => {
        inputInstRef.value && inputInstRef.value.focus()
    })
}
</script>
<template>
    <n-flex :wrap="false" class="header-title">
        <n-icon>
            <Browsers></Browsers>
        </n-icon>
        <n-text>工作空间 -
            <n-button secondary size="tiny" v-show="!focus" @click="handleFocus">
                <span>{{ computedTitle }}</span>
            </n-button>
        </n-text>
        <n-input v-show="focus" ref="inputInstRef" size="small" type="text" maxlength="16" show-count
            placeholder="请输入项目名称" v-model:value.trim="title" @keyup.enter="handleBlur" @blur="handleBlur"></n-input>
    </n-flex>
</template>
<style lang='scss' scoped>
.header-title {
    line-height: 34px;
    height: 34px;

    .n-input {
        width: 200px;
    }
}
</style>