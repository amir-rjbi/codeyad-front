<template>
    <footer class="bg-blue w-full overflow-hidden sm:!pt-9 ">
        <div class="top-footer flex justify-between container flex-wrap sm:justify-center">
            <NuxtLink to="/">
                <img class="logo" src="/logo-white.png" />
            </NuxtLink>
            <div class="flex items-center gap-19 flex-wrap justify-center sm:mt-16 sm:relative sm:w-full sm:!gap-3">
                <p class="text-white text-2xl font-bold font-IranSans sm:!text-xl">عضویت در خبرنامه</p>
                <input type="text" class="sm:!w-full" placeholder="ایمیلتو وارد کن" />
                <button class="text-blue sm:justify-self-end">ارسال</button>
            </div>
        </div>
        <hr />
        <div class="bottom-footer container items-center justify-between flex flex-wrap sm:justify-center sm:gap-7">
            <div class="social flex gap-7">
                <a href="#">
                    <IconsSocialInstagram hash-color="white" width="34" height="34" />
                </a>
                <a href="#">
                    <IconsSocialTelegram hash-color="white" width="34" height="34" />
                </a>
                <a href="#">
                    <IconsSocialTwitter hash-color="white" width="34" height="34" />
                </a>
                <a href="#">
                    <IconsSocialYouTube hash-color="white" width="34" height="34" />
                </a>
            </div>
            <p class="text-white copy-right" dir="ltr">@ 2023 Copyright.codeyad</p>
        </div>
    </footer>
</template>

<style scoped lang="scss">
@media screen and (max-width:768px) {
    input {
        height: 40px !important;
        font-size: 12px !important;
        padding: 10px 19px !important;
        padding-bottom: 11px !important;

        &::placeholder {
            font-size: 12px;
        }
    }
    footer {
        padding-bottom: 58px !important;
    }
    p.copy-right {
        font-size: 20px !important;
        letter-spacing: 0.8px !important;
    }

    img.logo {
        width: 223.977px !important;
        height: 45px !important;
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
    padding-top: 77px;
    padding-bottom: 70px;

    .logo {
        width: 22.02381rem;
        height: 4.25rem;
    }

    hr {
        border-color: rgba(255, 255, 255, 0.089);
        margin-top: 2.69rem;
        margin-bottom: 2.58rem;
    }

    .top-footer {
        input {
            border-radius: 5rem;
            font-size: 1.25rem;
            padding: 0.94rem 1.95rem !important;
            padding-bottom: 0.88rem !important;

            &::placeholder {
                @apply text-blue;

            }
        }

        button {
            background: #5DCAA7;
            border-radius: 5rem;
            padding: 0.62rem;
            width: 6rem;
            height: 60px;

        }
    }

    .copy-right {
        font-size: 26px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 1.04px;
    }
}
</style>