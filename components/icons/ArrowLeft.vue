<template>
    <svg :width="width" :height="height" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M4.97172 8.65283C5.15999 8.65283 5.32735 8.59007 5.45287 8.46456C5.72482 8.21352 5.72482 7.77421 5.45287 7.52317L2.58688 4.63627L5.45287 1.77028C5.72482 1.51924 5.72482 1.07993 5.45287 0.828896C5.20183 0.556941 4.76252 0.556941 4.51148 0.828896L1.16435 4.17603C0.89239 4.42707 0.89239 4.86638 1.16435 5.11742L4.51148 8.46456C4.637 8.59007 4.80436 8.65283 4.97172 8.65283Z"
            :fill="color" />
    </svg>
</template>
<script setup>
const props = defineProps({
    color: {
        type: String,
        default: "var(--body-text-color)",
    },
    width: {
        type: String,
        default: "12",
    },
    height: {
        type: String,
        default: "12",
    },
});
</script>