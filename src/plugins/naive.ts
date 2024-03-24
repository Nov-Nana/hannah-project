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
    NThemeEditor 

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
        NThemeEditor 
    ]
})

export function setupNaive(app: App) {
    app.use(naive)
}