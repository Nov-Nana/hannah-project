<script setup lang='ts'>
import { ContentBox } from '../ContentBox'
import { EditRule } from './components/EditRul'
</script>
<template>
    <ContentBox class="get-chart-edit-layout" id="get-chart-edit-layout" :depth="1" :showTop="false"
        :show-bottom="true">
        <EditRule>
            <div class="get-chart-edit-content">

            </div>
        </EditRule>
    </ContentBox>
</template>
<style lang='scss' scoped>
@include get(chart-edit-layout) {
    position: relative;
    width: 100%;
    overflow: hidden;

}
</style>