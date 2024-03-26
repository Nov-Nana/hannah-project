<script setup lang='ts'>
import LayoutHeader from '@/layout/LayoutHeader.vue';
import LayoutFooter from '@/layout/LayoutFooter.vue';
import { onMounted, reactive, ref, toRefs, watch } from 'vue';
import { useDesignStore } from '@/store/modules/designStore/designStore';
import { setLocalStorage } from '@/utils';
import { StorageEnum } from '@/enums/storageEnum'
import { cryptoEncode } from '@/utils/crypto';
import { routerByName } from '@/utils'
import { PageEnum } from '@/enums/pageEnum';
import { icon } from '@/plugins'
import { onUpdated } from 'vue';
const t = window['$t']

const { PersonOutline,
    LockClosedOutline } = icon.ionicons5
const formRef = ref()
const autoLogin = ref(false)
const loading = ref(false)
const formInline = reactive({
    username: 'admin',
    password: '123456'
})
const designStore = useDesignStore()
const { getLang } = toRefs(designStore)
watch(getLang, () => {
    formRef.value.restoreValidation()
    rules.username.message = `${t('login.user_placeholder')}`
    rules.password.message = `${t('login.pwd_placeholder')}`
})
const rules = reactive({
    username: {
        required: true,
        message: `${t('login.user_placeholder')}`,
        trigger: ['input', 'blur']
    },
    password: {
        required: true,
        message: `${t('login.pwd_placeholder')}`,
        trigger: 'blur'
    }
})
const { STORAGE_USER_INFO } = StorageEnum
function handleSubmit() {
    window['$loading'].start()
    formRef.value?.validate((errors: any) => {
        if (!errors) {
            const { username, password } = formInline
            loading.value = true
            // 存储信息
            setLocalStorage(STORAGE_USER_INFO, cryptoEncode(JSON.stringify({ username, password })))

            window['$message'].success('登录成功')
            // 跳转路由
            routerByName(PageEnum.BASE_HOME_NAME, true)
            loading.value = false
            window['$loading'].finish()
        } else {
            window['$loading'].error()
            window['$message'].erorr('登录失败')
        }
    })
}
function createBubble(bubbles: Element | null) {
    const num = 50
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
        let bubble = document.createElement('div')
        bubble.className = 'bubble'
        const w = Math.random() * 150 + 100
        const x = Math.random() * 100
        const y = Math.random() * 100 + 150
        const d = Math.random() * 2 + 1
        bubble.style.setProperty('--w', `${w}px`)
        bubble.style.setProperty('--x', `${x}vw`)
        bubble.style.setProperty('--y', `-${y}px`)
        bubble.style.setProperty('--d', `${d}s`)
        fragment.appendChild(bubble)
    }
    bubbles?.appendChild(fragment)
}
function setTitle() {
    const title = document.querySelector('.login-account-top')
    let text = t('login.title')
    if (title && title.innerHTML) {
        title.innerHTML = text.split('').map((t: any) => {
            return `<span>${t}</span>`
        }).join('')
    }


}
onMounted(() => {
    const bubbles: Element | null = document.querySelector('.bubbles')
    createBubble(bubbles)
    // 标题交错排列
    setTitle()
})
onUpdated(() => {
    setTitle()
})

</script>
<template>
    <div class="get-login-box">
        <LayoutHeader>
        </LayoutHeader>
        <div class="get-login-content">

            <div class="login-account">
                <div class="login-account-top">
                    {{ t('login.title') }}
                </div>
                <div class="login-account-form">

                    <n-form ref="formRef" label-placement="left" size="large" :model="formInline" :rules="rules">
                        <n-form-item path="username">
                            <n-input v-model:value="formInline.username" type="text" maxlength="16"
                                :placeholder="t('login.user_placeholder')">
                                <template #prefix>
                                    <n-icon size="18">
                                        <PersonOutline></PersonOutline>
                                    </n-icon>
                                </template>
                            </n-input>
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input v-model:value="formInline.password" type="password" maxlength="16"
                                :placeholder="t('login.pwd_placeholder')" show-password-on="click">
                                <template #prefix>
                                    <n-icon size="18">
                                        <LockClosedOutline></LockClosedOutline>
                                    </n-icon>
                                </template>
                            </n-input>
                        </n-form-item>
                        <n-form-item>
                            <n-checkbox v-model:checked="autoLogin">
                                {{ t('login.auto_login') }}
                            </n-checkbox>
                        </n-form-item>
                        <n-form-item>
                            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
                                {{ t('login.title') }}</n-button>
                        </n-form-item>
                    </n-form>
                </div>
            </div>
        </div>
        <div class="login-bg">
            <div class="bubbles">
            </div>
            <!-- 添加交融效果 -->
            <svg style="display: none">
                <defs>
                    <filter id="blob">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7">
                        </feColorMatrix>
                    </filter>
                </defs>
            </svg>
        </div>
        <LayoutFooter class="login-footer"></LayoutFooter>
    </div>
</template>
<style lang='scss'>
@include get(login-box) {
    --login-height: 100vh;
    height: var(--login-height);
    font-size: 1rem;
    overflow: hidden;
    @include get-bg-color('background-color');
    @include get-text-color('color');

    @include get(login-content) {
        position: relative;
        height: calc(100vh - $--header-height - $--footer-height);
        display: flex;
        justify-content: space-around;
        align-items: center;
        z-index: 10;


        .login-account {
            width: 30vw;
            height: 70vh;
            @include get-bg-color('filter-color');
            @include get-box-shadow('filter-color-shallow');
            border-radius: $--border-radius-base;
            padding: 20px 40px;

            &-top {
                height: 40%;
                font-size: 5rem;
                text-align: center;
                padding-top: 4rem;
                letter-spacing: 10px;

                span {
                    @include get-login-text-color('login-text-color');
                    text-shadow: 1px -1px #fff, -1px 1px #999, -6px 4px 5px #80808080;

                }
            }

            &-form {
                height: 60%;
            }
        }
    }


    .login-bg {
        z-index: 1;
        position: absolute;
        width: 100%;
        height: 50vh;
        bottom: 0;
        left: 0;
        overflow: hidden;

        .bubbles {
            position: absolute;
            width: 100%;
            height: 30vh;
            bottom: 0;
            left: 0;
            z-index: 1;
            @include get-other-bg-color('other-background-color');
            filter: url('#blob');


            .bubble {
                // --x: 100px;
                // --y: -200px;
                // --d: 2s;
                // --w: 150px;
                position: absolute;
                width: var(--w);
                height: var(--w);
                @include get-other-bg-color('other-background-color');
                border-radius: 50%;
                animation: moveBubbles var(--d) infinite linear;

                @keyframes moveBubbles {
                    from {
                        transform: translateX(var(--x)) translateY(0);
                    }

                    to {
                        transform: translateX(var(--x)) translateY(var(--y)) scale(0);
                    }
                }
            }

        }

    }

    .n-icon svg {
        position: absolute;
        top: 0;
        left: 0;
    }

    .login-footer {
        background-color: transparent;
        z-index: 10;
        position: relative;
    }
}

@media only screen and (max-width: 768px) {
    .login-account {
        width: 90vw !important;
    }
}
</style>