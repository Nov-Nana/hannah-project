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
    NDropdown

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
        NDropdown
    ]
})

export function setupNaive(app: App) {
    app.use(naive)
}