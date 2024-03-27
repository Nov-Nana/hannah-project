import { createI18n } from "vue-i18n";
import { systemSetting } from "@/settings/systemSetting";
import { LanguageEnum } from "@/enums/styleEnum";
import { getLocalStorage } from "@/utils";
import { StorageEnum } from "@/enums/storageEnum";
import zh from './zh';
import en from './en';

const {lang} = systemSetting
const settingStorage = getLocalStorage(StorageEnum.STORAGE_SYSTEM_SETTING)

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: settingStorage?.lang || lang,
    fallbackLocale: settingStorage?.lang || lang,
    messages: {
        [LanguageEnum.ZH]: zh,
        [LanguageEnum.EN]: en,
    }

})
export default i18n