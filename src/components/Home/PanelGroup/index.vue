<script setup lang='ts'>
import { icon } from '../../../plugins'
import { CountTo } from 'vue3-count-to'

const { Person } = icon.ionicons5
const {
    MessageOutlined,
    ShoppingCartOutlined,
    AccountBookOutlined
} = icon.antd
const emit = defineEmits(['handleSetLineChartData'])
const handleSetLineChartData = (type: string) => {
    emit('handleSetLineChartData', type)
}
</script>
<template>
    <n-grid :x-gap="24" :y-gap="12" cols="2 s:2 m:4 l:4 xl:4 2xl:4" responsive="screen">
        <n-grid-item>
            <n-flex justify="space-between" class="get-card-panel" @click="handleSetLineChartData('newVisits')">
                <div class="card-panel-icon icon-people">
                    <n-icon>
                        <Person></Person>
                    </n-icon>
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">New Visits</div>
                    <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
                </div>
            </n-flex>
        </n-grid-item>
        <n-grid-item>
            <n-flex justify="space-between" class="get-card-panel" @click="handleSetLineChartData('messages')">
                <div class="card-panel-icon icon-message">
                    <n-icon>
                        <MessageOutlined></MessageOutlined>
                    </n-icon>
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">Messages</div>
                    <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
                </div>
            </n-flex>
        </n-grid-item>
        <n-grid-item>
            <n-flex justify="space-between" class="get-card-panel" @click="handleSetLineChartData('purchases')">
                <div class="card-panel-icon icon-money">
                    <n-icon>
                        <AccountBookOutlined></AccountBookOutlined>
                    </n-icon>
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">Purchases</div>
                    <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />
                </div>
            </n-flex>
        </n-grid-item>
        <n-grid-item>
            <n-flex justify="space-between" class="get-card-panel" @click="handleSetLineChartData('shoppings')">
                <div class="card-panel-icon icon-shopping">
                    <n-icon>
                        <ShoppingCartOutlined></ShoppingCartOutlined>
                    </n-icon>
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">Shoppings</div>
                    <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
                </div>
            </n-flex>
        </n-grid-item>

    </n-grid>
</template>
<style lang='scss' scoped>
@include get(card-panel) {
    height: 108px;
    cursor: pointer;
    font-size: 1rem;
    position: relative;
    overflow: hidden;
    @include get-text-color('color1');
    @include get-box-shadow('color-item-shadow');
    @include get-bg-color('background-color');

    .card-panel-icon {
        float: left;
        margin: 10px;
        transition: all 0.38s ease-out;
        font-size: 60px;
        width: 72px;
        height: 72px;
        text-align: center;
    }

    .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        width: 90px;

        .card-panel-text {
            line-height: 18px;
            font-size: 16px;
            margin-bottom: 12px;
        }

        .card-panel-num {
            font-size: 20px;
        }
    }

    &:hover {
        .card-panel-icon {
            color: #fff;
            border-radius: 3px;
        }

        .icon-people {
            background: #59c4e6;
        }

        .icon-message {
            background: #edafda;
        }

        .icon-money {
            background: #a5e7f0;
        }

        .icon-shopping {
            background: #cbb0e3
        }
    }

    .icon-people {
        color: #59c4e6;
    }

    .icon-message {
        color: #edafda;
    }

    .icon-money {
        color: #a5e7f0;
    }

    .icon-shopping {
        color: #cbb0e3
    }
}

@media screen and (max-width:583px) {

    .card-panel-icon{
        width: 100% !important;
    }
    .card-panel-description {
        display: none;
    }

}
</style>