<template>
    <section class="latest-articles container py-[100px] sm:py-[50px]">
        <p class="text-22 font-bold sm:">آخرین مقالات</p>
        <div class="mt-[30px] flex gap-8 flex-wrap lg:gap-4 sm:!flex-col-reverse">
            <div class="w-[48%] flex gap-4  flex-col lg:w-[52%] md:!w-[100%]">
                <BlogArticleCard row />
                <BlogArticleCard row />
            </div>
            <div class="w-[48%] lg:w-[46%] md:!w-[100%]">
                <BlogArticleCard />
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>