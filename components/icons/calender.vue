<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 22 21" fill="none">
        <path d="M7.72656 1.80664V4.36723" :stroke="color" stroke-width="1.2803" stroke-miterlimit="10"
            stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14.5547 1.80664V4.36723" :stroke="color" stroke-width="1.2803" stroke-miterlimit="10"
            stroke-linecap="round" stroke-linejoin="round" />
        <path d="M3.88672 7.8584H18.3968" :stroke="color" stroke-width="1.2803" stroke-miterlimit="10"
            stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M3.45898 11.204V7.35457C3.45898 4.79398 4.73928 3.08691 7.72664 3.08691H14.5549C17.5423 3.08691 18.8225 4.79398 18.8225 7.35457V14.6096C18.8225 17.1702 17.5423 18.8772 14.5549 18.8772H7.72664C4.73928 18.8772 3.45898 17.1702 3.45898 14.6096"
            :stroke="color" stroke-width="1.2803" stroke-miterlimit="10" stroke-linecap="round"
            stroke-linejoin="round" />
        <path d="M14.2932 11.793H14.3008" :stroke="color" stroke-width="1.70706" stroke-linecap="round"
            stroke-linejoin="round" />
        <path d="M14.2932 14.3535H14.3008" :stroke="color" stroke-width="1.70706" stroke-linecap="round"
            stroke-linejoin="round" />
        <path d="M11.1369 11.793H11.1446" :stroke="color" stroke-width="1.70706" stroke-linecap="round"
            stroke-linejoin="round" />
        <path d="M11.1369 14.3535H11.1446" :stroke="color" stroke-width="1.70706" stroke-linecap="round"
            stroke-linejoin="round" />
        <path d="M7.97872 11.793H7.98638" :stroke="color" stroke-width="1.70706" stroke-linecap="round"
            stroke-linejoin="round" />
        <path d="M7.97872 14.3535H7.98638" :stroke="color" stroke-width="1.70706" stroke-linecap="round"
            stroke-linejoin="round" />
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
        default: "22",
    },
    height: {
        type: String,
        default: "21",
    },
});
</script>