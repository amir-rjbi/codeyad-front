<template>
    <div class="container py-[10px] sm:py-6">
        <BaseSeoData :meta="articleData.article.seoData"></BaseSeoData>
        <div class="flex relative justify-between sm:flex-wrap">
            <div class="w-[30%] sticky top-2 h-fit sm:w-full sm:relative sm:mb-11">
                <BaseBreadCrumb class="mb-4" :items="[{
                    title: 'خانه',
                    isActive: false,
                    link: '/'
                },
                {
                    title: 'بلاگ',
                    isActive: false,
                    link: '/mag'
                }, {
                    title: articleData.article.mainCategory.categoryTitle,
                    isActive: false,
                    link: '/mag/category?cTitle=' + articleData.article.mainCategory.slug
                },
                {
                    title: articleData.article.title,
                    isActive: true,
                }]" />
                <BlogPopularArticles />
            </div>
            <div class="w-[67%] sm:w-full">
                <template v-if="pending">
                    <div class="card">
                        <BaseSkeletonLoaidng height="500px" width="100%" />

                        <div class="writer flex items-center gap-[11px] mt-5">
                            <BaseSkeletonLoaidng width="30px" height="30px" style="border-radius: 50%;" />
                            <BaseSkeletonLoaidng width="50px" height="8px" />
                        </div>
                        <BaseSkeletonLoaidng class="mt-2" width="100px" height="8px" />
                        <BaseSkeletonLoaidng class="my-4" width="200px" height="10px" />
                        <BaseSkeletonLoaidng type="three-line" width="200px" height="10px" />


                    </div>
                </template>
                <div class="card" v-else-if="articleData">
                    <base-img class="article-banner w-full mb-8 sm:!h-[300px]"
                        :src="GetArticleImage(articleData.article.imageName)" :alt="articleData.article.title"
                        height="600px" />
                    <div class="writer flex items-center gap-[11px]">
                        <base-img :src="GetUserAvatar(articleData.ownerUser.imageName)" class="rounded-full" alt="user"
                            width="30" height="30" />
                        <nuxt-link :to="`/writers/${articleData.ownerUser.userId}`" class="text-h8 font-bold text-black">{{
                            articleData.ownerUser.fullName }}</nuxt-link>
                    </div>
                    <p class="date">{{ getPersianDate(new Date(articleData.article.dateRelease)) }}</p>
                    <h1 class="text-black text-h4">{{ articleData.article.title }}</h1>
                    <div class="blog-content" v-html="articleData.article.body">

                    </div>
                    <Comments class="mt-12 w-[90%] sm:!w[100%]" :link-id="articleData.article.id"
                        :comment-type="CommentType.article" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { CommentType } from '~/models/comments/Comment';
import { GetArticleBySlug } from '~/services/article.service';


const route = useRoute();
const router = useRouter();
const toast = useToast();
const slug = route.params.slug;
const { data, pending } = await useAsyncData('single-article', () => GetArticleBySlug(slug.toString()))
if (!data.value?.data) {
    if (process.server) {
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    } else {
        toast.showToast("مقاله مورد نظر یافت نشد", ToastType.warning)
        router.push('/');
    }
}
const articleData = ref(data.value!.data!)

onMounted(() => {
    setTimeout(() => {
        //@ts-ignore
        hljs.highlightAll();
    }, 500);
})
useSchemaOrg([
    defineArticle({
        image: GetArticleImage(articleData.value.article.imageName),
        datePublished: articleData.value.article.dateRelease,
        author: {
            name: articleData.value.ownerUser.fullName,
            image: GetUserAvatar(articleData.value.ownerUser.imageName),
            url: `/writers/${articleData.value.ownerUser.userId}`,
        }
    }),
    defineBreadcrumb({
        itemListElement: [{
            name: "صفحه اصلی", item: '/'
        }, {
            name: articleData.value.article.mainCategory.categoryTitle, item: `/mag/category?cTitle=${articleData.value.article.mainCategory.slug}`
        },
        {
            name: articleData.value.article.title, item: `/mag/post/${articleData.value.article.slug}`
        }]
    }),

])
</script>
<style scoped lang="scss">
.article-banner {
    border-radius: 7.535px;
    box-shadow: 0px 3.0141px 15.82403px 0px rgba(0, 0, 0, 0.11);
    height: 500px;
}

.date {
    color: #6941C6;
    font-size: 14px;
    font-weight: 600;
    line-height: 18.442px;
    margin-top: 11px;
    margin-bottom: 11px;
}



.card {
    padding: 18px;
}
</style>