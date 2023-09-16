<template>
    <div>
        <TheHeader :show-categories="false" />
        <div class="flex relative sm:flex-col">
            <AccountThetSideBar />
            <div class="container pt-4 pb-4 sm:!pt-1">
                <template v-if="accountStore.currentUser != null">
                    <slot />
                </template>
                <div v-else>
                    لطفا منتظر بمانید
                </div>
            </div>
        </div>
        <TheFooter class=" mt-[90px]" />
    </div>
</template>
<script setup lang="ts">
import { useAccountStore } from '~/stores/account.store';

const accountStore = useAccountStore();
</script>

