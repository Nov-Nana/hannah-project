<script setup lang='ts'>
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ref, reactive, Ref, nextTick, computed } from 'vue';
import { icon } from '@/plugins';
import { AddTableData, AddTableHeader } from '@/components/Office'
import { DataTableRowKey, DropdownOption } from 'naive-ui';
import { RowData } from 'naive-ui/es/data-table/src/interface';
const t = window['$t']
const { FileExcelFilled, TableOutlined, EditFilled, FileExcelTwotone } = icon.antd
const { AddCircleOutline, CloseOutline } = icon.ionicons5

// 表格数据
const data = reactive([
    { no: '1', title: 'Hello', length: '3:21' },
    { no: '2', title: 'Roll with It', length: '3:59' },
    { no: '3', title: 'Wonderwall', length: '4:18' },
    { no: '4', title: "Don't Look Back in Anger", length: '4:48' },
    { no: '5', title: 'Hey Now!', length: '5:41' },
    { no: '6', title: 'Untitledsdadsadasdddddddddddddddddddddd', length: '0:44' },
    { no: '7', title: 'Some Might Say', length: '5:29' },
    { no: '8', title: 'Cast No Shadow', length: '4:51' },
    { no: '9', title: "She's Electric", length: '3:40' },
    { no: '10', title: 'Monring Glory', length: '5:03' },
    { no: '11', title: 'Untitled', length: '0:39' },
    { no: '12', title: 'Champagne Supernova', length: '7:27' }
])
// 表格表头
const cols = ref([
    {
        title: 'No.',
        key: 'no',
        ellipsis: {
            tooltip: false
        }
    },
    {
        title: 'Title',
        key: 'title',
        ellipsis: {
            tooltip: true
        }
    },
    {
        title: 'Length',
        key: 'length',
        ellipsis: {
            tooltip: false
        }
    }
])
// 分页
const pagination = ref({
    pageSize: 5
})

// 导出excel
const handleDownload = (select?: boolean) => {
    const workbook = new ExcelJS.Workbook()
    workbook.creator = 'Hannah';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    const sheet1 = workbook.addWorksheet('sheet1')
    const headers = cols.value.map((item: any) => item.title)
    sheet1.addRow(headers)
    if (select) {
        checkedRowKeysRef.value.forEach((item: any) => {
            const val = Object.values(item)
            sheet1.addRow(val)
        })
    } else {
        data.forEach((item: any) => {
            const val = Object.values(item)
            sheet1.addRow(val)
        })
    }

    workbook.xlsx.writeBuffer().then(buffer => {
        const file = new Blob([buffer], { type: "application/octet-stream" });
        saveAs(file, "ExcelJS.xlsx");
    })
}

/**
 * 处理添加表头和添加数据
 */

const modalShow = ref(false)
const component: Ref<string> = ref('')

function handleButtonClick(name: string) {
    modalShow.value = true
    component.value = name
}
function getModalTitle(name: string) {
    switch (name) {
        case 'AddTableHeader':
            return t('office.edit_table_header')
        case 'AddTableData':
            return t('office.add_table_data')
    }
}
function updateCols(value: any) {
    modalShow.value = false
    cols.value = value
}
function addData(form: any) {
    modalShow.value = false
    data.push(form)
}

/**
 * 下拉编辑框
 */
const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)
const editModalShow = ref(false)
const selectRow = ref() // { "no": "1", "title": "Hello", "length": "3:21" }
const options: DropdownOption[] = [
    {
        label: '编辑',
        key: 'edit'
    },
    {
        label: '删除',
        key: 'delete'
    }
]
function handleSelect(key: string) {
    showDropdownRef.value = false
    if (key === 'edit') {
        editModalShow.value = true
    } else if (key === 'delete') {
        const index = data.findIndex((item: any) => item.no === selectRow.value.no)
        data.splice(index, 1)
    }
}
function onClickoutside() {
    showDropdownRef.value = false
}
const rowProps = (row: any) => {
    return {
        onContextmenu: (e: MouseEvent) => {
            selectRow.value = row
            e.preventDefault()
            showDropdownRef.value = false
            nextTick().then(() => {
                showDropdownRef.value = true
                xRef.value = e.clientX
                yRef.value = e.clientY
            })
        }
    }
}
function editData() {
    editModalShow.value = false
    const index = data.findIndex((item: any) => item.no === selectRow.value.no)
    data[index] = selectRow.value
}

/**
 * 处理选中
 */
// 表格表头 + select
const colsSelect = computed(() => {
    return [
        {
            type: 'selection',
        },
        ...cols.value
    ]
})
let checkedRowKeysRef = ref<DataTableRowKey[]>([])
function handleCheck(rowKeys: DataTableRowKey[]) {
    let currentChecked: DataTableRowKey[] = []
    data.forEach((item: any) => {
        if (rowKeys.includes(item.title)) {
            currentChecked.push(item)
        }
    })
    checkedRowKeysRef.value = currentChecked

}
function handleSelectDownload() {
    if (checkedRowKeysRef.value.length === 0) return
    window['$dialog'].success({
        title: t('office.export_selected'),
        positiveText: '确定',
        negativeText: '不确定',
        maskClosable: false,
        onPositiveClick: () => {
            handleDownload(true)
        },
    })
    
}

// 全部导出
function handleAllDownload(){
    window['$dialog'].success({
        title: t('office.export_all'),
        positiveText: '确定',
        negativeText: '不确定',
        maskClosable: false,
        onPositiveClick: () => {
            handleDownload(false)
        },
    })
}


</script>
<template>
    <div class="export-excel-container">
        <!-- 菜单 -->
        <n-flex class="menu">
            <n-button strong secondary type="primary" size="small" round @click="handleButtonClick('AddTableHeader')">
                <n-icon size="20" style="margin-right: 5px">
                    <TableOutlined></TableOutlined>
                </n-icon>
                {{ t('office.edit_table_header') }}
            </n-button>
            <n-button strong secondary type="primary" size="small" round @click="handleButtonClick('AddTableData')">
                <n-icon size="20" style="margin-right: 5px">
                    <AddCircleOutline></AddCircleOutline>
                </n-icon>
                {{ t('office.add_table_data') }}
            </n-button>
            <n-button strong secondary type="primary" size="small" round @click="handleSelectDownload">
                <n-icon size="20" style="margin-right: 5px">
                    <FileExcelTwotone></FileExcelTwotone>
                </n-icon>
                {{ t('office.export_selected') }}
            </n-button>
            <n-button strong secondary type="primary" size="small" round @click="handleAllDownload">
                <n-icon size="20" style="margin-right: 5px">
                    <FileExcelFilled></FileExcelFilled>
                </n-icon>
                {{ t('office.export_all') }}
            </n-button>
        </n-flex>
        <!-- 表格 -->
        <n-data-table :columns="colsSelect" :data="data" :pagination="pagination" :row-key="(row: RowData) => row.title"
            :row-props="rowProps" @update:checked-row-keys="handleCheck" />
        <n-dropdown trigger="manual" :x="xRef" :y="yRef" :options="options" :show="showDropdownRef"
            :on-clickoutside="onClickoutside" @select="handleSelect" />
        <!-- 模拟框 -->
        <n-modal v-model:show="modalShow" :mask-closable="false">
            <div class="get-modal-wrapper" v-if="component !== ''">
                <n-flex justify="space-between">
                    <span>{{ getModalTitle(component) }}</span>
                    <n-icon size="20" style="cursor: pointer" @click="modalShow = false">
                        <CloseOutline></CloseOutline>
                    </n-icon>
                </n-flex>
                <n-divider />
                <n-scrollbar style="max-height: 90%">
                    <template v-if="component === 'AddTableHeader'">
                        <AddTableHeader :data="cols" @update="updateCols"></AddTableHeader>
                    </template>
                    <template v-else-if="component === 'AddTableData'">
                        <AddTableData :columns="cols" @addData="addData"></AddTableData>
                    </template>
                </n-scrollbar>
            </div>
            <div v-else>lala</div>
        </n-modal>
        <!-- 模拟框 -->
        <n-modal v-model:show="editModalShow" :mask-closable="false">
            <div class="get-modal-wrapper">
                <span>{{ t('office.edit_table_data') }}</span>
                <n-divider />
                <n-scrollbar style="max-height: 90%">
                    <n-form :label-width="80" :model="selectRow">
                        <n-form-item v-for="(item) in cols" :label="item.title" :path="item.key">
                            <n-input v-model:value="selectRow[item.key]" />
                        </n-form-item>
                    </n-form>
                    <n-flex justify="center">
                        <n-button strong secondary type="primary" size="small" round @click="editData">
                            <n-icon size="20" style="margin-right: 5px">
                                <EditFilled></EditFilled>
                            </n-icon>
                            {{ t('global.edit') }}
                        </n-button>
                        <n-button strong secondary type="primary" size="small" round @click="editModalShow = false">
                            <n-icon size="20" style="margin-right: 5px">
                                <CloseOutline></CloseOutline>
                            </n-icon>
                            {{ t('global.cancel') }}
                        </n-button>
                    </n-flex>
                </n-scrollbar>
            </div>
        </n-modal>
    </div>
</template>
<style lang='scss' scoped>
.export-excel-container {
    width: 100%;
    padding: 10px;
    .menu{
        margin-bottom: 10px;
    }
}

@include get(modal-wrapper) {
    @include get-bg-color('filter-color');
    @include get-text-color('color');
    @include get-box-shadow('filter-color-shallow');
    backdrop-filter: $--filter-blur-base;
    position: relative;
    width: 90%;
    height: 85vh;
    padding: 20px 25px;
    border-radius: 15px;
    overflow: hidden;
    left: 5%;
}
</style>