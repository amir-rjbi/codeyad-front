<template>
    <aside class="account-aside sm:!w-full">
        <ul class="sm:flex sm:overflow-auto sm:hide-scroll-track sm:h-fit">
            <li>
                <nuxt-link to="/account">داشبورد</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/account/edit">ویرایش حساب</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/account/change-password">
                    تغییرکلمه عبور
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/account/wallet">
                    کیف پول
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/account/notifications">
                    اعلانات
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/account/messages">
                    گفتوگو ها
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/account/orders">
                    فاکتور ها
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/account/orders">
                    دوره های من
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/account/orders">
                    بوتکمپ های من
                </nuxt-link>
            </li>
        </ul>
    </aside>
</template>

<style scoped lang="scss">
@media screen and (max-width:768px) {
    aside {
        position: initial !important;

        ul {
            flex-direction: column;
            margin-bottom: 1rem;

            &::-webkit-scrollbar {
                height: 2px;
            }

            &::-webkit-scrollbar-thumb {
                background: var(--color-blue-gray-400);
            }
        }

    }
}

aside {
    background: rgba(193, 222, 255, 0.22);
    width: 20%;
    height: 100%;
    position: sticky;
    top: 0;
    @apply shadow-sm;

    ul {
        li {
            width: 100%;

            a {
                width: 100%;
                padding: 1rem 2rem;
                display: block;

                &.router-link-exact-active {
                    @apply bg-blue text-white;

                    &:hover {
                        @apply bg-blue text-white;
                        opacity: 0.9;
                    }
                }

                &:hover {
                    background: var(--color-blue-gray-050)
                }
            }
        }
    }
}
</style>