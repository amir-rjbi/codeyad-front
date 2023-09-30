
<template>
    <article :class="['article-card', { 'row': row }]">
        <base-img width="900px" :src="GetArticleImage(item.imageName)" :alt="item.title" />
        <div class="article-conten">
            <p class="date-label">{{ getPersianDate(new Date(item.dateRelease), null) }}</p>
            <nuxt-link :to="`/mag/post/${item.slug}`" class="title">{{ item.title }}</nuxt-link>
            <p class="description">{{ item.body }}</p>
            <div class="tags flex-wrap">
                <nuxt-link :to="`/mag/categort?cTitle=${item.mainCategory.slug}`">
                    <label :class="color">{{ item.mainCategory.categoryTitle }}</label>
                </nuxt-link>
                <nuxt-link :to="`/mag/categort?cTitle=${item.subCategory.slug}`" v-if="item.subCategory">
                    <label :class="color">{{ item.subCategory.categoryTitle }}</label>
                </nuxt-link>
            </div>
        </div>
    </article>
</template>
<script setup lang="ts">
import { Article } from '~/models/articles/Article';

withDefaults(defineProps<{
    row?: boolean,
    item: Article
}>(), {
    row: false
})
const color = ref('red');

onMounted(() => {
    generateColor();
});

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const generateColor = () => {
    var colors = ['red', 'blue', 'green', 'purple', 'yellow', 'orange']
    var random = getRandomInt(0, 6);
    color.value = colors[random];
}
</script>
<style scoped lang="scss">
@media screen and (max-width:768px) {
    article.article-card {
        padding: 11px !important;
        gap: 0.75rem !important;

        &.row {
            img {
                height: 112.312px !important;
            }
        }

        .date-label {
            font-size: 7.86px !important;
        }

        .tags {
            margin-top: 13px !important;
            height: fit-content !important;

            label {
                font-size: 10px !important;
            }
        }

        .title {
            font-size: 12px !important;
            font-weight: 600;
            margin-top: 6px !important;
            margin-top: 4.5px !important;
        }

        .description {
            font-size: 10px !important;

        }
    }
}

article.article-card {
    background: var(--color-white);
    padding: 18.33px;
    border-radius: 9.163px;
    display: flex;
    flex-direction: column;
    gap: 22px;

    &.row {
        flex-direction: row;
        align-items: center;

        img {
            height: 186px;
            width: 50%;
        }
    }

    .date-label {
        color: #6941C6;
        font-size: 13px;
        line-height: 18.688px;
        /* 142.857% */
        font-weight: 600;
    }

    .title {
        font-size: 16.819px;
        font-weight: 600;
        margin-top: 11px;
        margin-bottom: 7px;
        color: var(--color-black);
        display: block;

        &:hover {
            color: var(--primary-color);
        }
    }

    p.description {
        font-size: 15px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    img {
        border-radius: 7.636px;
        height: 240px;
        box-shadow: 0px 3.05429px 16.03502px 0px rgba(0, 0, 0, 0.11);
        width: 100%;
    }

    .tags {
        margin-top: 22px;
        display: flex;
        gap: .5rem;

        label {
            padding: 2px 9px;
            border-radius: 14.95px;
            font-size: 13.082px;
            font-weight: 500;
            cursor: pointer;

            &.red {
                color: #C11574;
                background: #FDF2FA;
            }

            &.green {
                color: #027A48;
                background: #ECFDF3;
            }

            &.blue {
                color: var(--primary-color);
                background: #F0F9FF;
            }

            &.purple {
                color: purple;
                background: rgb(255, 225, 255);
            }

            &.yellow {
                color: rgb(255, 145, 0);
                background: rgb(255, 255, 180);
            }

            &.orange {
                color: orange;
                background: rgb(255, 238, 213);
            }
        }
    }
}
</style>