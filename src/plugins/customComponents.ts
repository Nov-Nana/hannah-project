import type { App } from "vue";
import { SketchRule } from 'vue3-sketch-ruler'

export function setupCustomComponents(app: App) {
    app.component('SketchRule', SketchRule)
}