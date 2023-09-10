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
                link: '/questions',
                isActive: false
            },
            {
                title: 'عنوان صفحه',
                isActive: true
            }
        ]" />
        <div class="flex justify-between my-8 md:flex-wrap relative md:gap-6">
            <div class="w-[30%] md:!w-full sticky top-2 h-fit md:!relative">
                <BlogPopularArticles />
            </div>
            <div class="w-[65%]   md:!w-full">
                <div class="card py-4">
                    <div class="flex justify-between sm:flex-wrap items-center gap-3">
                        <h1 class="text-h4 sm:text-h5 ">هوش مصنوعی</h1>
                        <div class="flex items-center flex-col gap-2">
                            <BaseButton class="items-center justify-center" @click="isOpenModal = true">
                                سوالتو بپرس
                            </BaseButton>
                        </div>
                    </div>
                    <div class="flex gap-4 flex-wrap text-h8 mt-2">
                        <p>سوال شده توسط: <b>محمد اشرافی</b></p>
                        <p>تاریخ ثبت: <b>1402/06/19</b></p>
                        <p>بازدید: <b>11</b></p>
                        <p>پاسخ: <b>5</b></p>
                        <p class="flex gap-2 items-center">تگ: <nuxt-link class="text-blue font-bold text-h7"
                                to="/questions?category=1">asp.net core</nuxt-link></p>
                    </div>
                    <hr class="mt-2" />
                    <div class="flex py-6 flex-col">
                        <p> سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و</p>
                    </div>
                    <div class="card-body flex flex-col  mt-8 pr-8 sm:pr-5">
                        <div class="question-item 
                    flex gap-4 items-start border-b-2 p-2 last:border-none
                    " v-for="item in [1, 2, 3, 4]">
                            <base-img src="static/images/users/avatar.png" class="rounded" alt="user" width="62px"
                                height="62px" />
                            <div class="flex flex-col gap-2 flex-grow">
                                <p class="text-black text-h6">محمد اشرافی</p>
                                <p class="text-h8">
                                    سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و
                                    سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و
                                    سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و
                                    سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و
                                    سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و
                                    سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و
                                </p>
                                <div class="flex justify-end">
                                    <label class="text-h8  text-gray-800"> 19:44 1402/06/18</label>
                                </div>
                            </div>
                        </div>
                        <div class="question-item 
                    flex gap-4 items-start border-b-2 p-2 last:border-none
                    selected">
                            <base-img src="static/images/users/avatar.png" class="rounded" alt="user" width="62px"
                                height="62px" />
                            <div class="flex flex-col gap-2 flex-grow">
                                <p class="text-black text-h6">محمد اشرافی</p>
                                <p class="text-h8">
                                    سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و
                                    سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و
                                    سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و
                                    سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و
                                    سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و
                                    سلام استاد حسین جان خسته نباشی برادر من خیلی دوره هات رو دوست دارم …لطفا بنابر بی ادبی و
                                </p>
                                <div class="flex justify-end">
                                    <label class="text-h8  text-gray-800"> 19:44 1402/06/18</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="mt-4 flex gap-4 justify-end flex-col items-end w-full">
                    <BaseHtmlEditor name="answer" placeholder="اگر برای پرسش بالا پاسخی دارید لطفا اینجا وارد کنید"
                        id="desc" class="w-full" />
                    <BaseButton>ثبت پاسخ</BaseButton>
                </div>
            </div>

        </div>
        <BaseModal title="پرسش سوال جدید" v-model="isOpenModal">
            <questions-add />
        </BaseModal>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: "un-category"
})
const isOpenModal = ref(false);
</script>

<style scoped lang="scss">
.selected {
    background: #c7eee1;
}
</style>