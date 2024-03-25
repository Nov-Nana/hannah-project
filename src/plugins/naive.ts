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
    NIcon

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
        NIcon
    ]
})

export function setupNaive(app: App) {
    app.use(naive)
}