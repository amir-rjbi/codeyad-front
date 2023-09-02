<template>
    <div class="navigation" v-if="swiper.activeIndex < totalItemCount! - 1">
        <IconsArrowLeft width="12" height="25" @click="swiper.slideNext()" />
    </div>
</template>
<script setup lang="ts">
defineProps({
    totalItemCount: {
        type: Number
    }
})
const swiper = useSwiper();
</script>
<style scoped lang="scss">
@media screen and (max-width:768px) {
    .navigation {
        display: block !important;
    }
}

.navigation {
    position: absolute;
    left: 8%;
    z-index: 5;
    top: 50%;
    display: none;
}
</style>