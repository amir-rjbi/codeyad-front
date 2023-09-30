<template>
    <div class="container">
        <div :class="['nav-tabs flex justify-center  sm:justify-between sm:!gap-8', { 'card-loading': pending }]">
            <button name="all" :class="{ active: selected == BootcampStatus.شروع_ثبت_نام }"
                @click="selected = BootcampStatus.شروع_ثبت_نام">جاری</button>
            <button name="inProgress" :class="{ active: selected == BootcampStatus.درحال_برگزاری }"
                @click="selected = BootcampStatus.درحال_برگزاری">درحال
                برگزاری</button>
            <button name="completed" :class="{ active: selected == BootcampStatus.به_اتمام_رسیده }"
                @click="selected = BootcampStatus.به_اتمام_رسیده">تکمیل
                شده</button>
        </div>
        <div class="tab-content pb-10">
            <template v-if="pending">
                <BaseSkeletonLoaidng height="230px" v-for="item in [1, 2, 3]" class="mb-3 rounded" />
            </template>

            <Transition name="layout" mode="out-in">
                <BaseAlert v-if="filterData?.length == 0 && pending==false" alert-type="warning">
                    بوتکمپ ای برای نمایش وجود ندارد
                </BaseAlert>
                <div v-else>
                    <div class="bootcamp-item rounded-[24px] w-full mb-16 sm:mb-8" v-for="item in filterData"
                        :key="item.id">
                        <base-img :src="GetBootcampImage(item.imageName)" :alt="item.title" />
                        <div class="content">
                            <div class="title">
                                <p class="text-white text-[30px] font-black sm:!text-[22px]">{{ item.title }}</p>
                                <p class="text-orange text-h5 sm:font-bold">مدرس {{ item.teacherName }}</p>
                            </div>
                            <div class="flex items-end gap-1 flex-col">
                                <p class="text-white">از تاریخ {{ toPersianDate(item.startDate) }}</p>
                                <p class="text-white">تا تاریخ {{ toPersianDate(item.endDate) }}۲</p>
                                <base-button :render-button-tag="false" :to="`/bootcamps/${item.slug}`" color="orange"
                                    class="mt-3">شروع
                                    بوتکمپ</base-button>
                            </div>
                        </div>
                        <base-button :render-button-tag="false" :to="`/bootcamps/${item.slug}`" color="orange"
                            class="hidden mt-4 w-full">شروع
                            بوتکمپ</base-button>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BootCampFilterResult, BootcampStatus } from '~/models/bootcamps/BootCampFilterData';
import { GetBootcamps } from '~/services/bootcamp.service';

const selected = ref(BootcampStatus.شروع_ثبت_نام);
const loading = ref(false);
const pageId = ref(1);
const take = ref(20);
const { data, pending, refresh } = useAsyncData('bootcamps', () => GetBootcamps(pageId.value, take.value));

const filterData = computed(() => {
    return data.value?.data?.bootCamps.filter(f => f.status == selected.value)
})

</script>

<style scoped lang="scss">
@media screen and (max-width:500px) {
    .bootcamp-item {
        img {
            display: none;
        }

        height: fit-content !important;

        a.hidden {
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

            a {
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

    .nav-tabs {
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
</style>