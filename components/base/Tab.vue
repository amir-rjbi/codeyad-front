<template>
    <div class="flex tabs sm:overflow-y-auto sm:w-[104%] sm:pb-2">
        <button @click="selectedTab = item.value" v-for="(item, index) in items" :key="index"
            :class="{ 'active': selectedTab == item.value }">{{ item.title
            }}</button>
    </div>
</template>
<script setup lang="ts">
export interface TabData {
    title: string,
    value: any
}
const props = defineProps<{
    items: TabData[]
}>();
const selectedTab = ref(props.items[0].value);


const emit = defineEmits(['changeTab']);
watch(selectedTab, (val) => {
    emit('changeTab', val)
})
</script>
<style scoped lang="scss">
.tabs {
    button {
        padding: 10.52px 25px;
        border-radius: 10.52px;
        min-width: fit-content !important;
        display: block;

        &.active {
            background: var(--secondary-color, #E4EDF8);
        }
    }
}
</style>