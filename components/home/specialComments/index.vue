<template>
    <div class="sm:mt-10">
        <p class="text-blue container font-bold text-[20px] hidden sm:!block">{{ title }}</p>
        <section class="special-comments sm:!mt-3 sm:!py-0">
            <h6 class="text-blue text-[32px] text-center sm:hidden">{{ title }}</h6>
            <BaseCarousel class="comments sm:!mt-0 sm:w-4/5 sm:!mr-4" :items="[1, 2, 3, 1, 2, 3, 1, 2, 3]" :modules="[]"
                :centered-slides="true" :space-between="17" :breakpoints="breakpoints">
                <template #item="{ item, index }">
                    <HomeSpecialCommentsCommentItem :item="item" :current-index="index" />
                </template>
                <HomeSpecialCommentsMobileNavigation :totalItemCount="9" />
            </BaseCarousel>
        </section>
    </div>
</template>
<script setup lang="ts">
defineProps({
    title:{
        type:String,
        default:"دیدگاه دانشجوها از کدیاد"
    }
})
const breakpoints = ref({
    1200: {
        slidesPerView: 4.2,
    },
    1090: {
        slidesPerView: 3.5,
    },
    768: {
        slidesPerView: 2.5,
    },
    576: {
        slidesPerView: 2,
    },
    480: {
        slidesPerView: 2,
    },
    0: {
        slidesPerView: 1,
    },
});

</script>
<style scoped lang="scss">
.special-comments {
    background: rgba(40, 107, 184, 0.10);
    padding: 53px 0;
    margin-top: 6.25rem;
    position: relative;

    p {
        font-weight: 500;
    }

    h6 {
        font-weight: 700;
    }

    cursor: pointer;

    .comments {
        padding-bottom: 3rem;
        margin-top: 2rem;
        position: unset;
    }
}
</style>