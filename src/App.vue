<script setup lang="ts">
import { useThemeOverridesHook, useDarkThemeHook } from '@/hooks'
import { DialogContent, LoadingContent, MessageContent,I18n } from '@/plugins/Plugin'
import { setHTMLTheme } from './utils';
import { onMounted } from 'vue';
// 主题配置
const overrideTheme = useThemeOverridesHook()
// 暗黑主题
const darkTheme = useDarkThemeHook()

onMounted(() => {
  // 设置主题
  setHTMLTheme()
})
</script>

<template>
  <NConfigProvider :theme="darkTheme" :theme-overrides="overrideTheme">
    <NLoadingBarProvider>
      <NDialogProvider>
        <DialogContent></DialogContent>
        <LoadingContent></LoadingContent>
        <NNotificationProvider>
          <NMessageProvider>
            <MessageContent></MessageContent>
            <I18n></I18n>
            <router-view></router-view>
          </NMessageProvider>
        </NNotificationProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<style lang="scss" scoped></style>
