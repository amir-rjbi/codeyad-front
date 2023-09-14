<template>
    <div class="relative">
        <div class="search flex">
            <input type="text" placeholder="هرچی میخوای جست و جو کن" />
            <button name="search">
                <IconsSearch color="var(--color-white)" />
            </button>
        </div>
        <div class=" container my-6">
            <p class="text-h8 mb-2">نتایج جستوجو در دوره ها</p>
            <div class="flex gap-2 flex-col">
                <BaseSkeletonLoaidng width="100%" height="10px" v-for="item in [1, 2, 3]" />
            </div>
        </div>
        <div class=" container my-6">
            <hr class="mb-4"/>

            <p class="text-h8 mb-2">نتایج جستوجو در مقالات</p>
            <div class="flex gap-2 flex-col">
                <BaseSkeletonLoaidng width="100%" height="10px" v-for="item in [1, 2, 3]" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const emits = defineEmits(['closeSideBar']);
const CloseSideBar = () => {
    emits('closeSideBar');
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