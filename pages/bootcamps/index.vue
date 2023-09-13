<template>
    <div class="container">
        <div class="tabs flex justify-center  sm:justify-between sm:!gap-8">
            <button name="all" :class="{ active: selected == 'all' }" @click="selected = 'all'">جاری</button>
            <button name="inProgress" :class="{ active: selected == 'inProgress' }" @click="selected = 'inProgress'">درحال
                برگزاری</button>
            <button name="completed" :class="{ active: selected == 'completed' }" @click="selected = 'completed'">تکمیل
                شده</button>
        </div>
        <div class="tab-content">
            <div class="bootcamp-item rounded-[24px] w-full mb-16 sm:mb-8" v-for="item in [1, 2, 3, 4]" :key="item">
                <base-img src="static/bootcamp.png" alt="salam" class="" />
                <div class="content">
                    <div class="title">
                        <p class="text-white text-[30px] font-black sm:!text-[22px]"> بوت کمپ طراحی گرافیک</p>
                        <p class="text-orange text-h5 sm:font-bold">مدرس باربارا کریمی</p>
                    </div>
                    <div class="flex items-end gap-1 flex-col">
                        <p class="text-white">از تاریخ ۱۴۰۲/۰۴/۰۴</p>
                        <p class="text-white">تا تاریخ ۱۴۰۲/۰۵/۲۲</p>
                        <base-button :render-button-tag="false" to="/bootcamps/123" color="orange" class="mt-3">شروع
                            بوتکمپ</base-button>
                    </div>
                </div>
                <base-button :render-button-tag="false" to="/bootcamps/123" color="orange" class="hidden mt-4 w-full">شروع
                            بوتکمپ</base-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const selected = ref('all');
</script>

<style scoped lang="scss">
@media screen and (max-width:500px) {
    .bootcamp-item {
        img {
            display: none;
        }
        height: fit-content !important;
        a.hidden{
            display: flex !important;
        }
        div.content {
            left: 0 !important;
            transform: none !important;
            position: initial !important;
            width: 100% !important;
            background: var(--primary-color);
            border-radius: 16px;
            padding: 1.5rem;
            justify-content: center;
            align-items: center;
            a{
                display: none !important;
            }
            .title {
                p {
                    text-align: center;
                    margin-bottom: 1rem;
                }
            }

            &::before {
                display: none;
            }
        }
    }
}

@media screen and (max-width:1190px) {
    .bootcamp-item {
        div.content {
            left: 49%;
            transform: translate(-49%, 0);
        }
    }
}

@media screen and (max-width:998px) {
    .bootcamp-item {
        div.content {
            &::before {
                background: rgba(0, 0, 0, 0.445);
                border-radius: 8px;
                position: absolute;
                left: 0;
                right: 0;
                content: " ";
                width: 110%;
                height: 110%;
                right: -5%;
                top: -5%;
                z-index: -1;
            }

            z-index: 3;
            left: 49%;
            transform: translate(-49%, 0);
        }
    }
}

@media screen and (max-width:768px) {
    .bootcamp-item {
        img {
            object-fit: cover !important;
        }

        div.content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            &::before {
                background: rgba(0, 0, 0, 0.651);
            }

            width: 80%;
            top: 10%;
            height: 80%;
        }
    }

    .tabs {
        margin-top: 25px !important;
        margin-bottom: 25px !important;

        button {
            font-size: var(--h7-font-size) !important;


        }
    }
}

.bootcamp-item {
    width: 100%;
    border-radius: 24.882px;
    position: relative;
    height: 313px;

    img {
        width: 100%;
        position: absolute;
        border-radius: 24.882px;
        left: 0;
        top: 0;
        height: 100%;
        object-fit: fill;
    }

    .content {
        position: absolute;



        left: 52%;
        transform: translate(-52%, 0);
        top: 30%;
    }
}


.tabs {
    border-bottom: 1px solid var(--color-gray-400);
    gap: 120px;
    margin-bottom: 80px;
    margin-top: 80px;
    width: 100%;

    button {
        position: relative;
        padding-bottom: 21px;
        font-size: var(--h5-font-size);
        font-weight: 500;
        min-width: fit-content;

        &.active {
            font-weight: 900;

            &::before {
                content: " ";
                bottom: -4px;
                height: 6px;
                z-index: 4;
                background: var(--primary-color);
                width: 110%;
                left: 50%;
                transform: translate(-50%, 0);
                position: absolute;
            }
        }
    }
}
</style>