<template>
    <div class="pt-6 sm:pt-0">
        <div :class="{ 'card-loading': loading }">
            <h5 class="text-blue font-bold text-h3 sm:text-h5">دوست داری تو کدوم دسته آموزش ببیینی؟</h5>
            <p class="mt-6">
                لطفا موضوعاتی که دوست داری آموزش ببینی رو انتخاب کن.
            </p>
            <div class="categories flex gap-8 flex-col mt-8 sm:gap-4">
                <template v-if="utilStore.operationLoading">
                    <base-skeleton-loaidng height="60px" v-for="item in [1, 2, 3, 4]" :key="item" />
                </template>
                <template v-else>
                    <div @click="toggleCatItem(item.slug)" :class="['item border p-4 text-black text-h5 sm:text-h7',
                        { 'selected': selected.includes(item.slug) }
                    ]" v-for="item in utilStore.courseCategories">
                        {{ item.title }}
                    </div>
                </template>
            </div>
            <hr class="my-5" />
            <base-button :loading="loading" :disabled="selected.length == 0" class="w-full" @click="submit" size="lg">ثبت
                اطلاعات</base-button>
        </div>
    </div>
</template>


<script setup lang="ts">
import { SetFavoriteCategories } from '~/services/account.service';
import { useAccountStore } from '~/stores/account.store';
import { useUtilStore } from '~/stores/util.store';

const selected: Ref<string[]> = ref([]);
const utilStore = useUtilStore();
const accountStore = useAccountStore();
const toast = useToast();

const loading = ref(false);

onMounted(async () => {
    await utilStore.setCourseCategories();
});
const toggleCatItem = (catSlug: string) => {
    if (selected.value.includes(catSlug)) {
        selected.value = selected.value.filter(f => f != catSlug);
    } else {
        selected.value.push(catSlug)
    }
}
const submit = async () => {
    loading.value = true;
    var res = await SetFavoriteCategories(selected.value.join('_'));
    if (res.isSuccess) {
        accountStore.currentUser!.favoriteCategories = selected.value;
        utilStore.isOpenFavoriteModal=false;
        toast.showToast();
    }
    loading.value=false;
}
</script>
<style scoped lang="scss">
.item {
    border-radius: 13.547px;
    border: 0.732px solid var(--primary-color);
    cursor: pointer;
    transition: all ease .2s;
    box-shadow: 0px 1.69339px 3.38678px 0px rgba(16, 24, 40, 0.05);

    &:hover {
        background: var(--color-gray-200);
        scale: 1.02;
    }

    &.selected {
        color: white;
        background: var(--primary-color);
    }
}
</style>