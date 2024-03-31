import { computed, ref } from "vue"


export const useDataListInit = () => {
    const list = ref([
        {
            "id": "860054923356803072",
            "projectName": "project1",
            "state": 1,
            "createTime": "2023-09-08 17:18:03",
            "createUserId": "1",
            "isDelete": -1,
            "indexImage": "undefined",
            "remarks": null
        },
        {
            "id": "860056412603158528",
            "projectName": "project2",
            "state": -1,
            "createTime": "2023-09-08 17:23:58",
            "createUserId": "1",
            "isDelete": -1,
            "indexImage": "https://admin.mtruning.club/static/file_upload/c31aa60ed99f0a3607d50c64f70d4103.png",
            "remarks": null
        },
        {
            "id": "860056872571506688",
            "projectName": "project3",
            "state": -1,
            "createTime": "2023-09-08 17:25:48",
            "createUserId": "819508604724973568",
            "isDelete": -1,
            "indexImage": "https://admin.mtruning.club/static/file_upload/d9c4a17a49331912d47e961b9afaebbc.png",
            "remarks": null
        },
        {
            "id": "860056919925198848",
            "projectName": "project4",
            "state": -1,
            "createTime": "2023-09-08 17:25:59",
            "createUserId": "1",
            "isDelete": -1,
            "indexImage": "https://admin.mtruning.club/static/file_upload/e51de5adc3e2251707a182db66c31b7d.png",
            "remarks": null
        },
        {
            "id": "860057439863705600",
            "projectName": "project5",
            "state": -1,
            "createTime": "2023-09-08 17:28:03",
            "createUserId": "1",
            "isDelete": -1,
            "indexImage": null,
            "remarks": null
        },
        {
            "id": "860057994950479872",
            "projectName": "project6",
            "state": -1,
            "createTime": "2023-09-08 17:30:15",
            "createUserId": "1",
            "isDelete": -1,
            "indexImage": null,
            "remarks": null
        },
        {
            "id": "860058774726119424",
            "projectName": "project7",
            "state": -1,
            "createTime": "2023-09-08 17:33:21",
            "createUserId": "1",
            "isDelete": -1,
            "indexImage": null,
            "remarks": null
        },
        {
            "id": "860059539125440512",
            "projectName": "project8",
            "state": 1,
            "createTime": "2023-09-08 17:36:23",
            "createUserId": "819508604724973568",
            "isDelete": -1,
            "indexImage": "https://admin.mtruning.club/static/file_upload/95bd69547e364cd34dfa6ea0301c4085.png",
            "remarks": null
        },
        {
            "id": "860061546628386816",
            "projectName": "project9",
            "state": -1,
            "createTime": "2023-09-08 17:44:22",
            "createUserId": "819508604724973568",
            "isDelete": -1,
            "indexImage": null,
            "remarks": null
        },
        {
            "id": "860065086042148864",
            "projectName": "project10",
            "state": -1,
            "createTime": "2023-09-08 17:58:26",
            "createUserId": "1",
            "isDelete": -1,
            "indexImage": "https://admin.mtruning.club/static/file_upload/c3b53779b4d41e4891b5f1e79902d2ad.png",
            "remarks": null
        },
        {
            "id": "860065648401846272",
            "projectName": "project11",
            "state": -1,
            "createTime": "2023-09-08 18:00:40",
            "createUserId": "1",
            "isDelete": -1,
            "indexImage": null,
            "remarks": null
        },
        {
            "id": "860065707759636480",
            "projectName": "project12",
            "state": -1,
            "createTime": "2023-09-08 18:00:54",
            "createUserId": "1",
            "isDelete": -1,
            "indexImage": "https://admin.mtruning.club/static/file_upload/1f6923f724927aa6fbd748f224621974.png",
            "remarks": null
        },
        {
            "id": "860065707759636480",
            "projectName": "project12",
            "state": -1,
            "createTime": "2023-09-08 18:00:54",
            "createUserId": "1",
            "isDelete": -1,
            "indexImage": "https://admin.mtruning.club/static/file_upload/1f6923f724927aa6fbd748f224621974.png",
            "remarks": null
        },
    ])

    // 删除
    const handleDelete = (id: string) => {
        window['$dialog'].warning({
            title: '提示',
            content: '确定要删除吗？',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
                list.value = list.value.filter((item) => item.id !== id)
                updatePage(1)
                window['$message'].success('删除成功')
            }
        })
    }

    const page = ref(1) // 当前页数
    const itemCount = computed(()=>list.value.length) // 总数
    const pageSize = ref(12)
    const pageSizes = [12, 24, 36] // 每页条数
    const splitList = ref(list.value.slice(0, pageSize.value))
    function updatePage(p: number) {
        page.value = p
        splitList.value = list.value.slice((p - 1) * pageSize.value, p * pageSize.value)
    }

    function updatePageSize(pz: number) {
        pageSize.value = pz
        splitList.value = list.value.slice((page.value - 1) * pz, page.value * pz)
    }

    return {
        list,
        handleDelete,
        page,
        pageSize,
        pageSizes,
        itemCount,
        splitList,
        updatePage,
        updatePageSize
    }
}