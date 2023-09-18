<template>
    <Transition enter-active-class="animate__animated animate__slideInRight animate__faster"
        leave-active-class="animate__animated animate__slideOutRight animate__faster">
        <TheMobileSideBar v-if="isOpenSidebar" @closeSideBar="() => isOpenSidebar = false" />
        <TheMobileSearchBox v-else-if="isOpenSearchBar" @closeSideBar="() => isOpenSearchBar = false" />
    </Transition>
    <header class="main">
        <Transition name="page">
            <div class="sidebar-back" v-if="isOpenSidebar || isOpenSearchBar" @click="closeSideBars"></div>
        </Transition>
        <div class="text-banner " @click="$router.push('/account')">
            <p class="sm:text-h7">"کدنویسی، هنری برای خلق دنیای بهتر"</p>
        </div>
        <div class="container">
            <section class="middel gap-3">
                <IconsHamburger class="hidden sm:block" @click="isOpenSidebar = true" />
                <div class="flex items-center gap-9 w-fit justify-center">
                    <NuxtLink to="/"><img class="logo" src="/logo.png" alt="logo" /></NuxtLink>
                    <div class="search flex lg:!hidden " role="search">
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
                            <NuxtLink to="/mag">بلاگ</NuxtLink>

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
                <div class="avatar flex items-center gap-2 sm:hidden" v-if="authToken">
                    <template v-if="accountStore.currentUser == null">
                        <BaseSkeletonLoaidng width="25px" height="25px" />
                        <BaseSkeletonLoaidng width="60px" height="10px" />
                        <BaseSkeletonLoaidng width="35px" height="35px" />

                    </template>
                    <template v-else>
                        <nuxt-link to="/account/notifications" class="notification bg-secondary rounded-[3px] p-[7px]">
                            <IconsNotification color="var(--primary-color)" />
                        </nuxt-link>
                        <div class="flex relative items-center gap-2 cursor-pointer"
                            v-click-outside="() => showMenu = false" @click="showMenu = !showMenu">
                            <IconsArrowLeft class="transition-all" :style="{ rotate: showMenu ? '90deg' : '-90deg' }" />
                            <p class="font-semibold text-h9 " v-if="accountStore.currentUser.fullName">{{
                                accountStore.currentUser.fullName }}</p>
                            <p class="font-semibold text-h9 " v-else>{{
                                accountStore.currentUser.phoneNumber }}</p>
                            <base-img :src="GetUserAvatar(accountStore.currentUser.imageName)"
                                class="w-[30px] h-[30px]  rounded" width="60px" alt="mohammad" />
                            <Transition name="layout">
                                <div class="account-menu" v-if="showMenu">
                                    <NuxtLink to="/account">پروفایل</NuxtLink>
                                    <NuxtLink to="/account/edit">ویرایش اطلاعات</NuxtLink>
                                    <NuxtLink to="/account/tickets">تیکت ها</NuxtLink>
                                    <NuxtLink to="/account/change-password">تغییر کلمه عبور</NuxtLink>
                                    <a to="#" @click="authStore.logOut" class="text-red">خروج از حساب</a>
                                </div>
                            </Transition>
                        </div>
                    </template>

                </div>
                <BaseButton v-else @click="authStore.isOpenModal = true" size="sm " class="sm:hidden">ورود/ثبت نام
                </BaseButton>

                <IconsSearch @click="isOpenSearchBar = true" color="var(--color-black)" class="hidden sm:block" />
            </section>
            <section class="bottom-header  header-categories" v-if="showCategories">
                <BaseCarousel class="w-[93%]" :modules="[SwiperNavigation]" :navigation="{
                    enabled: true,
                    disabledClass: '!hidden'
                }" :items="['c#', 'Nuxt', 'Next', 'c++', 'python', 'Ruby', 'react', 'unity', 'asp', 'vue']"
                    :breakpoints="breakpoints" :space-between="8"
                    slide-class=" bg-white py-[15px] items-center justify-center text-center category-item dark:bg-slate-800 rounded mb-4 mt-2 ">
                    <template #item="{ index, item }">
                        <nuxt-link :to="`/courses/${item}`" class="  flex-grow !min-w-fit">
                            {{ item }}
                        </nuxt-link>
                    </template>
                </BaseCarousel>


            </section>
        </div>

    </header>
</template>
<script setup lang="ts">
import { useUtilStore } from '~~/stores/util.store';
import { useAuthStore } from '~~/stores/auth.store';
import { useAccountStore } from '~/stores/account.store';
import { GetUserAvatar } from '~/utils/imageUtil';

const showMenu = ref(false);
const porps = defineProps({
    showCategories: {
        type: Boolean,
        default: true
    }
})
const isOpenSidebar = ref(false);
const isOpenSearchBar = ref(false);
const itemToShow = ref(8);
const breakpoints = ref({
    1200: {
        slidesPerView: 10,
    },
    1090: {
        slidesPerView: 8,
    },
    768: {
        slidesPerView: 6,
    },
    576: {
        slidesPerView: 5,
    },
    480: {
        slidesPerView: 4,
    },
    0: {
        slidesPerView: 3,
    },
});
const utilStore = useUtilStore();
const authStore = useAuthStore();
const accountStore = useAccountStore();
const authToken = useCookie("c-access-token");

const closeSideBars = () => {
    isOpenSearchBar.value = false;
    isOpenSidebar.value = false;
}
onMounted(() => {
    if (utilStore.isMobile()) {
        itemToShow.value = 3;
    }
})
</script>
<style  lang="scss">
@media screen and (max-width:768px) {
    .middel {
        &::after {
            content: unset !important;
        }
    }

    header.main {
        img.logo {
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


.account-menu {
    position: absolute;
    width: 150%;
    top: 2.5rem;
    right: 0;
    z-index: 100;
    background: var(--color-white);
    @apply rounded shadow;
    display: flex;
    flex-direction: column;

    a {
        width: 100%;
        padding: .5rem 1rem;
        transition: all ease .2s;

        &:hover {
            @apply bg-slate-100
        }
    }
}

header.main {
    position: relative;

    .category-item {
        box-shadow: 0px 2.6993932723999023px 14.171814918518066px 0px rgba(0, 0, 0, 0.11);
    }





    .middel {
        @apply flex justify-between items-center;
        padding-bottom: 1rem;
        position: relative;
        margin-bottom: 11px;

        &::after {
            @apply bg-gray-200;
            content: " ";
            width: 200%;
            right: -50%;
            position: absolute;
            bottom: -0.50rem;
            height: 1px;
        }

        padding-top: 30px;

        img.logo {
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
}
</style>