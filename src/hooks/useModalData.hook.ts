import { ChartEnum } from "@/enums/pageEnum";
import { getPathByName, routerByPath } from "@/utils";
import { ref } from "vue";


export const useModalDataInit = ()=>{
    const modalShow = ref<boolean>(false);
    const modalData = ref()

    // 关闭
    const closeModal = ()=>{
        modalShow.value = false;
        modalData.value = null;
    }
    // 打开
    const openModal = (data:any)=>{
        if(!data) return
        modalShow.value = true;
        modalData.value = data;
    }
    // 打开 Chart界面
    const editModal = (data:any)=>{
        if(!data) return
        const path = getPathByName(ChartEnum.CHART_HOME_NAME, 'href')
        path && routerByPath(path, [data.id],undefined,true)
    }

    return {
        modalShow,
        modalData,
        closeModal,
        openModal,
        editModal
    }

}