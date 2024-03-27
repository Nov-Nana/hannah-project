<script setup lang='ts'>
import {toRefs} from 'vue'

const props = defineProps(['item'])
const {item} = toRefs(props)
function getRGB(rgb: number[]) {
    let result = 'rgb('
    rgb.forEach(item => {
        result += item + ','
    })
    result = result.slice(0, result.length - 1) + ')'
    return result

}
const emits = defineEmits(['changeThemeColor'])
function changeAppThemeColor(){
    emits('changeThemeColor',item?.value)
}
</script>
<template>
    <div class="color-card-box" @click="changeAppThemeColor">
        <div class="color" :style="{ backgroundColor: item.hex }"></div>
        <div class="info-box">
            <div class="name-box">
                <div class="name" :style="{ color: item.hex }">{{ item.name }}</div>
                <div class="pinyin">{{ item.pinyin }}</div>
            </div>
            <div class="data-box">
                <div class="hex">{{ item.hex }}</div>
                <div class="rgb">{{ getRGB(item.RGB) }}</div>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.color-card-box {
    width: 100%;
    height: 70px;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    @include get-bg-color('color-item-bg');
    @include get-color-box-shadow('color-item-shadow');
    display: flex;

    &:hover {
        @include hover-border-color('background-color5')
    }

    .color {
        width: 50px;
        height: 20px;
        margin-right: 5px;
    }

    .info-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .name-box {
            display: flex;
            flex-direction: row;

            .pinyin {
                font-size: 12px;
                margin-left: 5px;
                line-height: 1rem;
            }
        }

        .data-box {
            display: flex;
            flex-direction: row;
            font-size: 1rem;

            .hex {
                width: 30%;
                margin-right: 5px;
                @include get-border-right-color('background-color3');
            }

            .rgb {
                margin-left: 5px;
            }
        }
    }

}
</style>