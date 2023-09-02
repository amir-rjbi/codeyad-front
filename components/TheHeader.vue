<template>
    <Transition enter-active-class="animate__animated animate__slideInRight animate__faster"
        leave-active-class="animate__animated animate__slideOutRight animate__faster">
        <TheMobileSideBar v-if="isOpenSidebar" @closeSideBar="() => isOpenSidebar = false" />
    </Transition>
    <header>
        <Transition name="page">
            <div class="sidebar-back" v-if="isOpenSidebar" @click="isOpenSidebar = false"></div>
        </Transition>
        <div class="text-banner ">
            <p class="sm:text-h7">"کدنویسی، هنری برای خلق دنیای بهتر"</p>
        </div>
        <div class="container">
            <section class="middel gap-3">
                <IconsHamburger class="hidden sm:block" @click="isOpenSidebar = true" />
                <div class="flex items-center gap-9 w-fit justify-center">
                    <NuxtLink to="/"><img src="/logo.png" alt="logo" /></NuxtLink>
                    <div class="search flex lg:!hidden ">
                        <input type="text" placeholder="هرچی میخوای جست و جو کن" />
                        <button name="search">
                            <IconsSearch color="var(--color-white)" />
                        </button>
                    </div>
                </div>
                <nav class="categories sm:hidden ">
                    <ul class="gap-6">
                        <li>
                            <NuxtLink to="/courses">دوره ها</NuxtLink>

                        </li>
                        <li>
                            <NuxtLink to="/blog">بلاگ</NuxtLink>

                        </li>
                        <li class=" md:hidden">
                            <NuxtLink to="/about">درباره ما</NuxtLink>

                        </li>
                        <li>
                            <NuxtLink to="/masters">مدرسین</NuxtLink>

                        </li>
                        <li class="lg:hidden">
                            <NuxtLink to="/bootcamps">بوتکمپ ها</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/questions">پرسش و پاسخ</NuxtLink>
                        </li>
                    </ul>
                </nav>
                <BaseButton @click="authStore.isOpenModal = true" size="sm " class="sm:hidden">ورود/ثبت نام</BaseButton>
                <IconsSearch color="var(--color-black)" class="hidden sm:block" />
            </section>
            <section class="bottom-header  header-categories" v-if="showCategories">
                <BaseCarousel class="w-[90%]" :modules="[SwiperNavigation]" :navigation="{
                    enabled: true,
                    disabledClass: '!hidden'
                }" :items="['c#', 'Nuxt', 'Next', 'c++', 'python', 'Ruby', 'react', 'unity', 'asp', 'vue']"
                    :breakpoints="breakpoints" :space-between="8" slide-class="!w-fit mb-4 mt-2 mr-1">
                    <template #item="{ index, item }">
                        <nuxt-link :to="`/courses/${item}`"
                            class="category-item btn flex-grow bg-white dark:bg-slate-800 rounded">
                            {{ item }}
                        </nuxt-link>
                    </template>
                </BaseCarousel>


            </section>
        </div>

    </header>
</template>
<script setup lang="ts">
import { useAuthStore } from '~~/stores/auth.store';

const porps = defineProps({
    showCategories: {
        type: Boolean,
        default: false
    }
})
const authStore = useAuthStore();
const isOpenSidebar = ref(false);
const breakpoints = ref({
    1200: {
        slidesPerView: 8,
    },
    1090: {
        slidesPerView: 6,
    },
    768: {
        slidesPerView: 4,
    },
    576: {
        slidesPerView: 3,
    },
    480: {
        slidesPerView: 3,
    },
    0: {
        slidesPerView: 2,
    },
});
</script>
<style scoped lang="scss">
@media screen and (max-width:768px) {
    .middel {
        &::after {
            content: unset !important;
        }
    }

    header {
        img {
            width: 110px;
            height: 31px;
        }
    }

    .category-item {
        box-shadow: 0px 2.613333225250244px 13.719999313354492px 0px rgba(0, 0, 0, 0.11) !important;
    }
}

.sidebar-back {
    position: fixed;
    width: 100%;
    height: 100%;
    right: 0;
    background: rgba(0, 0, 0, 0.473);
    z-index: 1000;
}

header {
    position: relative;
    overflow: hidden;

    .category-item {
        box-shadow: 0px 2.6993932723999023px 14.171814918518066px 0px rgba(0, 0, 0, 0.11);
    }

    .text-banner {
        background: linear-gradient(270deg, #286BB8 0%, #5FA4F0 23.78%, #286BB6 49.83%, #62A6F3 72.74%, #286BB8 100%);
        width: 100%;
        font-size: var(--h5-font-size);
        text-align: center;
        padding: 0.75rem;
        color: white;
    }



    .middel {
        @apply flex justify-between items-center;
        padding-bottom: 1rem;
        position: relative;
        // &::after {
        //     @apply bg-gray-200;
        //     content: " ";
        //     width: 200%;
        //     right: -50%;
        //     position: absolute;
        //     bottom: .70rem;
        //     height: 1px;
        // }
        padding-top: 30px;
            
        img {
            flex-grow: 1;
            width: 141.718px;
            height: 40px;
        }

        .search {
            flex-grow: 2;

            input {
                border-radius: 0rem 0.75rem 0.75rem 0rem;
                font-size: var(--h7-font-size);
                box-shadow: 0px 2.6993932723999023px 14.171814918518066px 0px rgba(0, 0, 0, 0.11);
                width: 100%;

                &::placeholder {
                    font-size: var(--h9-font-size);
                }
            }

            button {
                @apply bg-primary items-center;
                display: flex;
                border-radius: 0.75rem 0rem 0rem 0.75rem;
                padding: .5rem;
                box-shadow: 0px 4px 21px 0px rgba(0, 0, 0, 0.11);
            }
        }

        .categories {
            ul {
                @apply flex gap-10;
                font-size: var(--h7-font-size);

                li {
                    a {}
                }
            }
        }
    }
}</style>