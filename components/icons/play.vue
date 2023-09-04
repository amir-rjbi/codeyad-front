<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 18 18" fill="none">
        <path
            d="M11.1822 10.5901C12.5322 9.81015 12.5322 8.53515 11.1822 7.75515L10.0947 7.12515L9.00719 6.49515C7.65719 5.71515 6.55469 6.35265 6.55469 7.91265V9.16515V10.4176C6.55469 11.6626 7.25969 12.3226 8.23469 12.1351"
            :stroke="color" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M3 4.5C2.0625 5.7525 1.5 7.3125 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5C7.9275 1.5 6.9 1.725 5.9775 2.1375"
            :stroke="color" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
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
        default: "18",
    },
    height: {
        type: String,
        default: "18",
    },
});
</script>