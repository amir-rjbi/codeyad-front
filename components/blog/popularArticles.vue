<template>
    <div>
        <h2 class="text-h5 mb-8 sm:text-h5">محبوب ترین مقالات</h2>
        <nuxt-link :key="index" :to="`/blog/post/${index}`" class="bg-white mb-5 p-3 rounded-[12px] pt-4 text-h7" v-for="(item, index) in 
            ['آموزش کامل ساخت ربات',
                'پروژه های توسعه چابک و قابلیت استفاده',
                'آموزش کامل ربات ایسنتاگرام',
                'آموزش کامل ربات ایسنتاگرام',
            ]">
            {{ item }}</nuxt-link>
    </div>
</template>