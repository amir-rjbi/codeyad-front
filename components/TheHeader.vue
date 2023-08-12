<template>
    <header>
        <div class="text-banner">
            <p>"کدنویسی، هنری برای خلق دنیای بهتر"</p>
        </div>
        <div class="container">
            <section class="middel gap-3">
                <IconsHamburger class="hidden sm:block" />
                <div class="flex items-center gap-9 w-fit lg:justify-center">
                    <img src="/logo.png" alt="logo" />
                    <div class="search lg:!hidden">
                        <input type="text" placeholder="هرچی میخوای جست و جو کن" />
                        <button>
                            <IconsSearch hash-color="var(--color-white)" />
                        </button>
                    </div>
                </div>
                <nav class="categories sm:hidden ">
                    <ul class="lg:!gap-6">
                        <li>
                            <NuxtLink to="/">دوره ها</NuxtLink>

                        </li>
                        <li>
                            <NuxtLink to="/blog">بلاگ</NuxtLink>

                        </li>
                        <li>
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
                <BaseButton @click="authStore.isOpenModal=true" size="sm " class="sm:hidden">ورود/ثبت نام</BaseButton>
                <IconsSearch hash-color="var(--color-black)" class="hidden sm:block" />
            </section>

        </div>

    </header>
</template>
<script setup lang="ts">
import { useAuthStore } from '~~/stores/auth.store';

const authStore = useAuthStore();
</script>
<style scoped lang="scss">
header {
    position: relative;

    .text-banner {
        background: linear-gradient(270deg, #286BB8 0%, #5FA4F0 23.78%, #286BB6 49.83%, #62A6F3 72.74%, #286BB8 100%);
        width: 100%;
        font-size: var(--t4-font-size);
        font-family: var(--t4-font-family);
        text-align: center;
        padding: 0.75rem;
        color: white;
        margin-bottom: 1rem
    }

    .middel {
        @apply flex justify-between items-center;
        padding-bottom: 1.5rem;

        &::after {
            @apply bg-gray-200;
            content: " ";
            width: 100%;
            right: 0;
            position: absolute;
            bottom: 0;
            height: 1px;
        }

        img {
            width: 60%;
        }

        .search {
            display: flex;

            input {
                border-radius: 0rem 0.75rem 0.75rem 0rem;
                padding-left: 2rem
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

                li {}
            }
        }
    }
}
</style>