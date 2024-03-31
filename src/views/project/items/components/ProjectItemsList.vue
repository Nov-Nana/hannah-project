<script setup lang="ts">
import { ProjectItemsCard } from './index'
import { useDataListInit } from '@/hooks/useData.hook'

const { list } = useDataListInit()
</script>

<template>
    <div class="get-items-list">
            <n-grid :x-gap="24" :y-gap="24" cols="1 s:2 m:3 l:4 xl:4 xxl:4" responsive="screen">
                    <n-grid-item v-for="(item) in list" :key="item.id">
                        <ProjectItemsCard :cardData="item"></ProjectItemsCard>
                    </n-grid-item>
            </n-grid>
    </div>
</template>

<style lang="scss" scoped>
@include get(items-list) {
}
</style>
