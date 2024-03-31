import { ref } from "vue"


export const useDataListInit = () => {
    const list = ref([
        {
            id: 1,
            title: '项目1-hannah',
            release: true,
            label: '官方案例'
        },
        {
            id: 2,
            title: '项目2-hannah',
            release: false,
            label: '官方案例'
        },
        {
            id: 3,
            title: '项目3',
            release: false,
            label: '官方案例'
        },
        {
            id: 4,
            title: '项目4',
            release: false,
            label: '官方案例'
        },
        {
            id: 5,
            title: '项目5',
            release: true,
            label: '官方案例'
        },
        {
            id: 6,
            title: '项目6',
            release: true,
            label: '官方案例'
        },
        {
            id: 7,
            title: '项目7',
            release: true,
            label: '官方案例'
        },
        {
            id: 8,
            title: '项目8',
            release: true,
            label: '官方案例'
        },
        {
            id: 9,
            title: '项目9',
            release: true,
            label: '官方案例'
        },
    ])

    // 删除
    const handleDelete = (_: object, index: number) => {
        window['$dialog'].confirm({
            title: '提示',
            content: '确定要删除吗？',
            onConfirm: () => {
                window.$message.success('删除成功')
                list.value.splice(index, 1)
            }
        })
    }
    return {
        list,
        handleDelete
    }
}