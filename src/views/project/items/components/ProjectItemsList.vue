<script setup lang="ts">
import { ProjectItemsCard, ProjectItemsModalCard } from './index'
import { useDataListInit } from '@/hooks/useData.hook'
import { useModalDataInit } from '@/hooks/useModalData.hook'
const { splitList, handleDelete, page, pageSize, pageSizes, itemCount, updatePage,
    updatePageSize, handleSend, handleCreate } = useDataListInit()

const { modalData, modalShow, closeModal, openModal, editModal } = useModalDataInit()
const t = window['$t']

</script>

<template>
    <div class="get-items-list">
        <div class="create-item">
            <n-button type="primary" @click="handleCreate">{{ t('project.create') }}</n-button>
        </div>
        <n-grid :x-gap="24" :y-gap="24" cols="1 s:2 m:3 l:4 xl:4 xxl:4" responsive="screen">
            <n-grid-item v-for="(item) in splitList" :key="item.id">
                <ProjectItemsCard :cardData="item" @expand="openModal" @delete="handleDelete(item.id)" @edit="editModal"
                    @send="handleSend"></ProjectItemsCard>
            </n-grid-item>
        </n-grid>
        <div class="list-pagination">
            <n-pagination v-model:page="page" v-model:page-size="pageSize" :item-count="itemCount"
                :page-sizes="pageSizes" show-size-picker :on-update:page="updatePage"
                :on-update:page-size="updatePageSize" />
        </div>
        <ProjectItemsModalCard v-if="modalData" :modalShow="modalShow" :cardData="modalData" @close="closeModal"
            @edit="editModal"></ProjectItemsModalCard>
    </div>
</template>

<style lang="scss" scoped>
@include get(items-list) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .create-item {
        margin-bottom: 20px;
        margin-left: 10px;
    }

    .list-pagination {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
    }
}
</style>
