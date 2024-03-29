<script setup lang='ts'>
import ExcelJS from 'exceljs';
import { icon } from '@/plugins'
import { Ref, ref } from 'vue';

const { CloudUploadOutlined } = icon.antd
const t = window['$t']
const uploadRef = ref()
// const fileData = ref()

async function beforeUpload(data: any) {
    
    if (data.file.file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && data.file.file.type !== 'application/vnd.ms-excel') {
        window['$message'].error(t('office.file_type_error'))
        return false
    }
    console.log(data);
    const isLt1M = data.file.file.size / 1024 / 1024 < 3
    if (!isLt1M) {
        window['$message'].error(t('office.file_oversize'))
        return false
    }
    // fileData.value = data.file.file
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(data.file.file)
    fileReader.onload = function () {
        ReadExcelData(fileReader.result)
    }

}
// 读取excel文件
function ReadExcelData(buffer: any) {
    const workbook = new ExcelJS.Workbook()
    workbook.xlsx.load(buffer).then(function () {
        const worksheet = workbook.getWorksheet(1)
        worksheet?.eachRow({ includeEmpty: true }, function (row, rowNumber) {
            let arr = Array.isArray(row.values) && row.values.slice(1)
            if (rowNumber === 1) {
                createColumns(JSON.parse(JSON.stringify(arr)))
            } else {
                createData(JSON.parse(JSON.stringify(arr)))
            }
        })
    })
}
const cols: Ref<any[]> = ref([])
const data: Ref<any[]> = ref([])
const pagination = ref({
    pageSize: 5,
})
function createColumns(value: any = []) {
    value.forEach((item: string) => {
        cols.value.push({
            title: item,
            key: item,
            ellipsis: {
                tooltip: true
            }
        })
    })
}
function createData(value: any = []) {
    let obj: any = {}
    cols.value.forEach((item: any, index: string | number) => {
        obj[item.key] = value[index]
    })
    data.value.push(obj)

}

function submit() {
    uploadRef.value.submit()
}

function removeFile() {
    // console.log('removeFile', data);\
    cols.value = []
    data.value = []
}

function errorUpload() {
    // console.log('errorUpload', data);
}

function finishUpload() {
    // console.log(data);
}



</script>
<template>
    <div class="get-upload-excel">
        <div class="upload-dragger">
            <n-upload ref="uploadRef" action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                :on-before-upload="beforeUpload" :on-remove="removeFile" :on-error="errorUpload"
                :on-finish="finishUpload" directory-dnd :max="1" :default-upload="false">
                <n-upload-dragger class="upload">
                    <div style="margin-bottom: 12px">
                        <n-icon size="48" :depth="3">
                            <CloudUploadOutlined />
                        </n-icon>
                    </div>
                    <n-text>
                        {{ t('office.drag_upload_text') }}
                    </n-text>
                </n-upload-dragger>
            </n-upload>
        </div>
        <n-flex justify="space-between" style="margin-bottom: 10px">
            <n-text>{{ t('global.preview') }}
            </n-text>
            <n-button @click="submit" style="float: right" tertiary type="primary" size="small">{{ t('global.submit')
                }}</n-button>
        </n-flex>
        <n-data-table :columns="cols" :data="data" :pagination="pagination" />
    </div>
</template>
<style lang='scss' scoped>
@include get(upload-excel) {
    padding: 10px 20px;

    .upload {
        padding: 10px;
    }

}
</style>