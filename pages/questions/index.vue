<template>
    <div class="container py-4" ref="rootElement">

        <Head>
            <Title>پرسش و پاسخ</Title>
        </Head>
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
            <div class="w-[65%]  py-4 md:!w-full">
                <div class="flex card justify-between sm:flex-wrap items-center gap-3">
                    <div class="flex gap-3 items-center">
                        <button type="button" @click="isOpenSearchModal = true"
                            class="bg-blue-100 flex items-center flex-col py-2 px-3 rounded gap-1">
                            <IconsFilter />
                            فیلتر
                        </button>
                        <h2 class="text-h4 sm:text-h5 ">
                            همه سوالات
                            <span v-if="data?.data?.category"> {{ data.data.category.categoryTitle }} </span>
                        </h2>
                    </div>
                    <div class="flex items-center flex-col gap-2 sm:w-full">
                        <BaseButton class="items-center justify-center sm:w-full" @click="isOpenModal = true">
                            سوالتو بپرس
                        </BaseButton>
                        <label class="text-h6 sm:text-h8">{{ data?.data?.entityCount.toLocaleString() }} سوال</label>
                    </div>
                </div>
                <div :class="['card-body flex  flex-col sm:px-0', { 'card-loading': pending }]">
                    <template v-if="initLoading">
                        <BaseSkeletonLoaidng class="mb-2" v-for="item in [1, 2, 3, 4]" :key="item" />
                    </template>
                    <div v-for="item in questions" :key="item.id" :class="['question-item overflow-hidden flex gap-4 bg-white mb-2 rounded-sm items-center border-2 p-2 pl-4 last:border-none hover:bg-slate-100 transition-all'
                        , { 'completed': item.isAnyBestAnswer }]">
                        <div class="flex flex-col justify-center items-center">
                            <p>{{ item.questionMessagesCount }}</p>
                            <p>پاسخ</p>
                        </div>
                        <div class="flex flex-col gap-2 flex-grow">
                            <nuxt-link class="text-blue text-h5"
                                :to="`/questions/show/${item.id}/${item.subject.replaceAll(' ', '-')}`">{{ item.subject
                                }}</nuxt-link>
                            <p class="text-h8 description text-justify">
                                {{ removeHtmlTagsFromString(item.text) }}
                            </p>
                            <div class="flex justify-between">
                                <nuxt-link :to="`/questions?category=${item.category.slug}`"
                                    class="label text-h8 !text-white bg-slate-400 py-1 px-2 rounded-sm">{{
                                        item.category.categoryTitle }}</nuxt-link>
                                <label class="text-h8  text-gray-800">{{ toPersianDate(new Date(item.creationDate), true)
                                }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center" v-if="(data?.data?.pageCount ?? 1) > pageId">
                    <BaseButton class="sm:w-10/12" :loading="pending" @click="pageId += 1">مشاهده بیشتر</BaseButton>
                </div>
            </div>

        </div>
        <BaseModal title="پرسش سوال جدید" v-model="isOpenModal">
            <questions-add @close-modal="() => isOpenModal = false" />
        </BaseModal>
        <BaseModal title="فیلتر سوالات" :show-header="false" v-model="isOpenSearchModal">
            <Form @submit="filter" class="min-w-[600px] sm:!min-w-full">
                <div class="flex flex-wrap w-full">
                    <div class="w-1/2 p-2 sm:!w-full">
                        <BaseInput placeholder="متن جستوجوی خود را وارد کنید" v-model="search" out-line name="search"
                            label="جستوجو" />
                    </div>

                    <div class="w-1/2 p-2 sm:!w-full">
                        <template v-if="categoryLoading">
                            <label class="input-label">دسته بندی</label>
                            <BaseSkeletonLoaidng class="mt-1" height="48px" />
                        </template>

                        <BaseSelectBox v-else out-line v-model="categorySlug" label="دسته بندی" name="categorySlug">
                            <option value="">انتخاب کنید</option>
                            <option :value="item.slug" :key="item.id" v-for="item in utilStore.questionCategories">{{
                                item.categoryTitle }}</option>
                        </BaseSelectBox>
                    </div>
                </div>
                <div class="flex w-full gap-1 justify-end mt-3">
                    <BaseButton type="button" :loading="pending" v-if="search || categorySlug" :render-button-tag="false"
                        to="/questions" color="red">حذف فیلتر ها</BaseButton>
                    <BaseButton :loading="pending" type="submit">فیلتر</BaseButton>
                </div>
            </Form>
        </BaseModal>
    </div>
</template>
<script setup lang="ts">
import { Form } from "vee-validate";
import { useUtilStore } from "~/stores/util.store";
import { removeHtmlTagsFromString } from "~/utils/stringUtil";
import { GetQuestionCategories, GetQuestionsByFilter } from "~~/services/questions.service";

const route = useRoute();
const router = useRouter();
const initLoading = ref(false);
const pageId = ref(1);
const categorySlug = ref(route.query.category?.toString());
const search = ref(route.query.search?.toString());
const isOpenSearchModal = ref(false);
const { data, refresh, pending } = await useAsyncData("questions",
    () => GetQuestionsByFilter(pageId.value, categorySlug.value, search.value));

const questions = ref(data.value?.data?.data);
const isOpenModal = ref(false);


watch(data, (val) => {
    val?.data?.data?.forEach(element => {
        questions.value!.push(element)
    });
})
watch(pageId, () => {
    refresh();
})
watch(() => route.query, (val) => {
    categorySlug.value = val.category?.toString();
    search.value = val.search?.toString();
    clear();
    refresh();
});
watch(pending, (val) => {
    if (val == false) {
        isOpenSearchModal.value = false;
        initLoading.value = false;
    }
})
const clear = () => {
    initLoading.value = true;
    questions.value = [];
    pageId.value = 1;

}
const filter = (formd: any, e: any) => {
    search.value = formd.search;
    categorySlug.value = formd.categorySlug;

    router.push({
        path: "questions",
        query: {
            search: search.value,
            category: categorySlug.value
        }
    })
}
const categoryLoading = ref(false);
const utilStore = useUtilStore();
onMounted(async () => {
    if (utilStore.questionCategories.length == 0) {
        categoryLoading.value = true;
        var res = await GetQuestionCategories();
        if (res.isSuccess) {
            utilStore.questionCategories = res.data ?? [];
        }
        categoryLoading.value = false;

    }
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
.question-item
{
    .description{
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
}
</style>