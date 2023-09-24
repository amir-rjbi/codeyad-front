<template>
    <div :class="['item', { 'active': slide.isActive }, { 'top-4': currentIndex == swiper.activeIndex + 1 },
        { 'top-4': currentIndex == swiper.activeIndex - 1 }]" @click="swiper.slideTo(currentIndex)">
        <div class="header justify-between w-full items-center">
            <div class="flex items-end gap-[6px]">
                <base-img :src="GetUserAvatar(item.userImageName)" v-if="item.userImageName" width="50px" height="50px"
                    :alt="item.userFullName??item.fullName" />
                <base-img :src="GetUserAvatar(item.userAvatar)" v-else width="50px" height="50px"
                    :alt="item.userFullName??item.fullName" />
                <p class="">{{ item.userFullName??item.fullName }}</p>

            </div>
            <IconsQuote color="var(--primary-color)" />
        </div>
        <p>
            {{ item.text }}
        </p>

    </div>
</template>
<script setup lang="ts">
defineProps<{
    item: any,
    currentIndex: number
}>();
const slide = useSwiperSlide();
const swiper = useSwiper();

onMounted(() => {
    setTimeout(() => {
        swiper.value.slideTo(3);
    }, 500);
})
</script>
<style scoped lang="scss">
.item {
    background: var(--color-white);
    display: flex;
    width: 100%;
    padding: 20.206px 23.412px;
    flex-direction: column;
    align-items: center;
    border-radius: 8.66px;
    gap: 1rem;
    padding-bottom: 3rem;
    opacity: .4;
    transition: all ease .2s;
    position: relative;
    line-height: 25.979px;
    /* 147.273% */
    letter-spacing: -0.505px;
    height: 350px;
    overflow: auto;
    cursor: auto;

    p {
        font-size: 17.64px;
        text-align: right;
        width: 100%;
        font-weight: 500;
        color: var(--color-black);
    }

    &.active {
        opacity: 1;
        top: 1.5rem;
    }

    .header {
        display: flex;

        img {
            width: 40.092px;
            height: 40.092px;
            border-radius: 9.622px;
        }

        p {
            font-weight: 500;
            font-size: var(--h7-font-size);
        }
    }
}
</style>