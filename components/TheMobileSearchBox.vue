<template>
    <div class="relative">
        <form @submit.prevent="search" class="search flex">
            <input type="text" v-model="searchValue" placeholder="هرچی میخوای جست و جو کن" />
            <button type="submit" name="search">
                <IconsSearch color="var(--color-white)" />
            </button>
        </form>
        <div class=" container my-6">
            <p class="text-h8 mb-2">نتایج جستوجو در دوره ها <span v-if="data?.courses"> - {{ data?.courses.length }}
                    دروه</span></p>
            <div class="flex gap-2 flex-col" v-if="loading">
                <BaseSkeletonLoaidng width="100%" height="10px" v-for="item in [1, 2, 3]" />
            </div>
            <div v-else class="flex gap-4 flex-col my-5  pr-4">
                <nuxt-link class="text-h9" @click="$emit('closeSideBar')" :to="`/course/${item.slug}`"
                    v-for="item in data?.courses" :key="item.slug">
                    {{ item.courseTitle }} -
                    <span class="text-red" v-if="item.price > 0">{{ item.totalPrice.toLocaleString()
                    }} تومان</span>
                    <span class="text-green" v-else>رایگان</span>
                </nuxt-link>
            </div>

        </div>
        <div class=" container my-6">
            <hr class="mb-4" />

            <p class="text-h8 mb-2">نتایج جستوجو در مقالات <span v-if="data?.articles"> - {{ data?.articles.length }}
                    مقاله</span></p>
            <div class="flex gap-2 flex-col" v-if="loading">
                <BaseSkeletonLoaidng width="100%" height="10px" v-for="item in [1, 2, 3]" />
            </div>
            <div class="flex gap-4 flex-col my-5  pr-4" v-else>
                <nuxt-link class="text-h9" @click="$emit('closeSideBar')" :to="`/mag/post/${item.slug}`"
                    v-for="item in data?.articles" :key="item.slug">
                    {{ item.title }}
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { SearchFilterResult } from '~/models/SearchFilterResult';
import { SearchAll } from '~/services/search.service';

const emits = defineEmits(['closeSideBar']);
const CloseSideBar = () => {
    emits('closeSideBar');
}
const searchValue = ref('');
const loading = ref(false);
const toast = useToast();
const data: Ref<SearchFilterResult | null> = ref(null);
const search = async () => {
    if (searchValue.value.length < 3) {
        toast.showToast('متن جستوجوی کامل تری وارد کنید', ToastType.warning)
        return;
    }
    loading.value = true;
    var res = await SearchAll(searchValue.value);
    if (res.isSuccess)
        data.value = res.data ?? null
    loading.value = false;
}
</script>
<style scoped lang="scss">
div.relative {
    width: 80%;
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    z-index: 1001;
    background: var(--color-white);
    font-size: 16px;
    overflow: auto;

    .search {
        flex-grow: 2;
        width: 90%;
        margin: auto;
        padding-top: 1rem;

        input {
            font-size: var(--h9-font-size);
            width: 100%;
            height: 38px;
            border-radius: 0px 6px 6px 0px;
            box-shadow: 0px 4px 21px 0px rgba(0, 0, 0, 0.11);

            &::placeholder {
                font-size: var(--h9-font-size);
            }
        }

        button {
            @apply bg-primary items-center;
            display: flex;
            border-radius: 6px 0px 0px 6px;
            padding: .5rem;
            box-shadow: 0px 4px 21px 0px rgba(0, 0, 0, 0.11);
        }
    }

}
</style>