<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="width" viewBox="0 0 21 21" fill="none">
        <path d="M13.6836 13.0564L11.0376 11.4773C10.5767 11.2042 10.2012 10.547 10.2012 10.0092V6.50977" :stroke="color"
            stroke-width="1.2803" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M3.68753 5.22077C2.62062 6.64616 1.98047 8.42151 1.98047 10.342C1.98047 15.0534 5.80429 18.8773 10.5158 18.8773C15.2273 18.8773 19.0511 15.0534 19.0511 10.342C19.0511 5.63046 15.2273 1.80664 10.5158 1.80664C9.29523 1.80664 8.12589 2.0627 7.07605 2.53214"
            :stroke="color" stroke-width="1.2803" stroke-linecap="round" stroke-linejoin="round" />
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
        default: "21",
    },
    height: {
        type: String,
        default: "21",
    },
});
</script>