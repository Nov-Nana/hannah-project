<script setup lang="ts">
import { useThemeOverridesHook, useDarkThemeHook } from '@/hooks'
import { NConfigProvider } from 'naive-ui';
// 主题配置
const overrideTheme = useThemeOverridesHook()
// 暗黑主题
const darkTheme = useDarkThemeHook()

</script>

<template>
  <NConfigProvider :theme="darkTheme" :theme-overrides="overrideTheme">
    <router-view></router-view>
  </NConfigProvider>
</template>

<style lang="scss" scoped></style>
