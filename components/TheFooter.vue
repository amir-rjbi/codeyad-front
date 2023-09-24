<template>
    <footer class="bg-blue w-full overflow-hidden sm:!pt-9" role="contentinfos">
        <div class="top-footer flex justify-between container flex-wrap sm:justify-center">
            <NuxtLink to="/">
                <img class="logo" src="/logo-white.png" />
            </NuxtLink>
            <div class="flex items-center gap-3 flex-wrap justify-center sm:mt-16 sm:relative sm:w-full sm:!gap-3">
                <p class="text-white text-2xl font-bold font-IranSans sm:!text-[20px]">عضویت در خبرنامه</p>
                <input type="text" class="sm:!w-full" placeholder="ایمیلتو وارد کن" />
                <button class="text-blue sm:justify-self-end">ارسال</button>
            </div>
        </div>
        <hr />

        <div class="bottom-footer gap-3 container items-center justify-between flex flex-wrap sm:justify-center sm:gap-7">
            <div class="social flex gap-7">
                <a :href="utilStore.siteSettings?.instagram" target="_blank" v-if="utilStore.siteSettings?.instagram">
                    <IconsSocialInstagram color="white" width="24" height="24" />
                </a>
                <a :href="utilStore.siteSettings?.telegram" target="_blank" v-if="utilStore.siteSettings?.telegram">
                    <IconsSocialTelegram color="white" width="24" height="24" />
                </a>
                <a :href="utilStore.siteSettings?.twitter" target="_blank" v-if="utilStore.siteSettings?.twitter">
                    <IconsSocialTwitter color="white" width="24" height="24" />
                </a>
                <a :href="utilStore.siteSettings?.aparat" target="_blank" v-if="utilStore.siteSettings?.aparat">
                    <IconsSocialYouTube color="white" width="24" height="24" />
                </a>
            </div>
            <p class="text-white copy-right">{{ utilStore.siteSettings?.footerText.trim() }}</p>
        </div>
    </footer>
</template>
<script setup lang="ts">
import { useUtilStore } from '~/stores/util.store';

const utilStore = useUtilStore();
</script>
<style scoped lang="scss">
@media screen and (max-width:768px) {
    input {
        font-size: 14px !important;

        &::placeholder {
            font-size: 14px !important;
        }
    }

    footer {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }

    p.copy-right {
        font-size: 15px !important;
        letter-spacing: 0.8px !important;
        text-align: center;
    }



    button.text-blue {
        position: absolute;
        left: 0;
        bottom: -2.5rem;
        height: 34px !important;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    hr {
        margin-top: 7rem !important;
        margin-bottom: 2rem !important;
    }
}

footer {
    padding-top: 48px;
    padding-bottom: 44px;
    padding-left: 2rem;
    padding-right: 2rem;

    .logo {
        width: 223.977px;
        height: 45px;
    }

    hr {
        border-color: rgba(255, 255, 255, 0.089);
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .top-footer {
        input {
            border-radius: 5rem;
            font-size: 12px;
            min-width: 260px;
            padding: 9px 20px !important;

            &::placeholder {
                @apply text-blue;
                font-size: 12px;
            }
        }

        button {
            background: #5DCAA7;
            border-radius: 5rem;
            width: 70px;
            height: 38.103px;
        }
    }

    .copy-right {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 1.04px;
    }
}
</style>