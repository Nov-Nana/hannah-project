<script setup lang="ts">
import { ProjectItemsList } from './components'

</script>

<template>
    <div class="get-project-items">
        <ProjectItemsList></ProjectItemsList>
    </div>
</template>

<style lang="scss" scoped>
@include get(project-items){
    padding: 30px 20px;
}
</style>
