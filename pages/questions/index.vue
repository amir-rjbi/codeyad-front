<template>
    <div class="container py-4">
        <BaseBreadCrumb :items="[
            {
                title: 'خانه',
                link: '/',
                isActive: false
            },
            {
                title: 'پرسش و پاسخ',
                isActive: true
            }
        ]" />
        <div class="flex justify-between my-8 md:flex-wrap relative">
            <div class="w-[30%] md:!w-full sticky top-2 h-fit md:!relative">
                <BlogPopularArticles />
            </div>
            <div class="w-[65%] card py-4 md:!w-full">
                <div class="flex justify-between sm:flex-wrap items-center gap-3">
                    <h2 class="text-h4 sm:text-h5 ">همه سوالات
                        - asp.net core</h2>
                    <div class="flex items-center flex-col gap-2 sm:w-full">
                        <BaseButton :render-button-tag="false" class="items-center justify-center sm:w-full"
                            to="/questions/add">
                            سوالتو بپرس
                        </BaseButton>
                        <label class="text-h6 sm:text-h8">559 سوال</label>
                    </div>
                </div>
                <div class="card-body flex flex-col  mt-8">
                    <div class="question-item 
                    flex gap-4 items-center border-b-2 p-2 last:border-none hover:bg-slate-100 transition-all
                    completed">
                        <div class="flex flex-col justify-center items-center">
                            <p>5</p>
                            <p>پاسخ</p>
                        </div>
                        <div class="flex flex-col gap-2 flex-grow">
                            <nuxt-link class="text-blue text-h5" to="/questions/show/123/test">دوره php</nuxt-link>
                            <p class="text-h8">
                                سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و
                            </p>
                            <div class="flex justify-between">
                                <nuxt-link to="/questions?category=pyt"
                                    class="label text-h8 !text-white bg-slate-400 py-1 px-2 rounded-sm">Asp.net
                                    Core</nuxt-link>
                                <label class="text-h8  text-gray-800"> 19:44 1402/06/18</label>
                            </div>
                        </div>
                    </div>
                    <div class="question-item 
                    flex gap-4 items-center border-b-2 p-2 last:border-none hover:bg-slate-100 transition-all
                    " v-for="item in [1, 2, 3, 4]">
                        <div class="flex flex-col justify-center items-center">
                            <p>0</p>
                            <p>پاسخ</p>
                        </div>
                        <div class="flex flex-col gap-2 flex-grow">
                            <nuxt-link class="text-blue text-h5" to="/questions/show/123/test">دوره php</nuxt-link>
                            <p class="text-h8">
                                سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و
                            </p>
                            <div class="flex justify-between">
                                <nuxt-link to="/questions?category=pyt"
                                    class="label text-h8 !text-white bg-slate-400 py-1 px-2 rounded-sm">Asp.net
                                    Core</nuxt-link>
                                <label class="text-h8  text-gray-800"> 19:44 1402/06/18</label>
                            </div>
                        </div>
                    </div>
                    <div class="question-item 
                    flex gap-4 items-center border-b-2 p-2 last:border-none hover:bg-slate-100 transition-all
                    completed">
                        <div class="flex flex-col justify-center items-center">
                            <p>5</p>
                            <p>پاسخ</p>
                        </div>
                        <div class="flex flex-col gap-2 flex-grow">
                            <nuxt-link class="text-blue text-h5" to="/questions/show/123/test">دوره php</nuxt-link>
                            <p class="text-h8">
                                سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و
                            </p>
                            <div class="flex justify-between">
                                <nuxt-link to="/questions?category=pyt"
                                    class="label text-h8 !text-white bg-slate-400 py-1 px-2 rounded-sm">Asp.net
                                    Core</nuxt-link>
                                <label class="text-h8  text-gray-800"> 19:44 1402/06/18</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: "un-category"
})
</script>

<style scoped lang="scss">
.completed {
    background: #5fd1ad;
    color: white !important;

    label {
        color: white !important;
    }

    .label {
        background: white;
        color: black !important;
    }
}
</style>