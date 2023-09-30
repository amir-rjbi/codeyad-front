<template>
    <div>

        <Head>
            <Title>{{ $route.meta.title ?? 'پنل کاربری' }}</Title>
        </Head>
        <TheHeader :show-categories="false" />
        <div class="flex relative sm:flex-col">
            <AccountThetSideBar />
            <div class="container pt-4 pb-4 sm:!pt-1" id="a_content">
                <template v-if="accountStore.currentUser != null">
                    <p class="text-h5 sm:!text-h6 mb-4">{{ $route.meta.title }}</p>
                    <slot />
                </template>
                <base-alert v-else>
                    درحال دریافت اطلاعات ، لطفا منتظر بمانید...
                </base-alert>
            </div>
        </div>
        <TheFooter class=" mt-[90px]" />
    </div>
</template>
<script setup lang="ts">
import { useAccountStore } from '~/stores/account.store';

const accountStore = useAccountStore();

const router = useRouter();
const toast = useToast();

onMounted(async () => {
    var op = router.currentRoute.value.query.op;
    if (op) {
        if (op.toString() == 'success') {
            toast.showToast("پرداخت با موفقیت انجام شد");
            router.push(router.currentRoute.value.path);
        }
    }
});
</script>

