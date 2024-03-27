import type { App } from 'vue'
import {
    create,
    NConfigProvider,
    NFlex,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutSider,
    NLayoutFooter,
    NThemeEditor ,
    NText,
    NA,
    NIcon,
    NButton,
    NForm,
    NInput,
    NFormItem,
    NCheckbox,
    NLoadingBarProvider,
    NDialogProvider,
    NMessageProvider,
    NNotificationProvider,
    NDropdown,
    NModalProvider,
    NModal,
    NDivider,
    NVirtualList,
    NGrid,
    NGridItem,
    NScrollbar,
    NAvatar,
    NMenu,
    NDataTable,
    NProgress

} from 'naive-ui'

const naive = create({
    components: [
        NConfigProvider,
        NFlex,
        NLayout,
        NLayoutHeader,
        NLayoutContent,
        NLayoutSider,
        NLayoutFooter,
        NThemeEditor,
        NText,
        NA,
        NIcon,
        NButton,
        NForm,
        NFormItem,
        NInput,
        NCheckbox,
        NLoadingBarProvider,
        NDialogProvider,
        NMessageProvider,
        NNotificationProvider,
        NDropdown,
        NModalProvider,
        NModal,
        NDivider,
        NVirtualList,
        NGrid,
        NGridItem,
        NScrollbar,
        NAvatar,
        NMenu,
        NDataTable,
        NProgress
    ]
})

export function setupNaive(app: App) {
    app.use(naive)
}