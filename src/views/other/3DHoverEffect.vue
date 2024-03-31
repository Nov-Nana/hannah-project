<script setup lang='ts'>
import { onMounted } from 'vue';
import Avatar from '../../assets/avatar.jpg';
/**
 * CSS 3D Hover Effect
 */
onMounted(() => {
    set3DHoverEffect()
})
function set3DHoverEffect() {
    const xRang = [-10, 10]
    const yRang = [-10, 10]
    const card: HTMLElement | null = document.querySelector('.card')
    function getRange(rang: number[], value: number, length: number) {
        return value / length * (rang[1] - rang[0]) + rang[0]
    }
    if (card) {
        card.onmousemove = (e: MouseEvent) => {
            const { offsetX, offsetY } = e
            const { offsetWidth, offsetHeight } = card
            // console.log(offsetX, offsetY, offsetWidth, offsetHeight)
            const y = -getRange(yRang, offsetX, offsetWidth)
            const x = getRange(xRang, offsetY, offsetHeight)
            card?.style.setProperty('--x', `${x}deg`)
            card?.style.setProperty('--y', `${y}deg`)
        }
        card.onmouseleave = () => {
            card?.style.setProperty('--x', '0deg')
            card?.style.setProperty('--y', '0deg')
        }
    }
}

</script>
<template>
    <div class="get-container">
        <div class="card">
            <img :src="Avatar" />
        </div>

    </div>
</template>
<style lang='scss' scoped>
@include get(container) {
    @include get-bg-color('background-color');
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - $--header-height);
    overflow: hidden;

    .card {
        width: 300px;
        height: 300px;;
        border-radius: 8px;
        overflow: hidden;
        transform: perspective(500px) rotateX(var(--x, '0deg')) rotateY(var(--y, '0deg'));
        @include get-box-shadow('color-item-shadow');

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 8px;
        }
    }

}
</style>