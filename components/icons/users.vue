<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="width" viewBox="0 0 22 21" fill="none">
        <path
            d="M16.0113 6.21087C15.9601 6.20233 15.9004 6.20233 15.8492 6.21087C14.6713 6.16819 13.7324 5.2037 13.7324 4.00875C13.7324 2.7882 14.714 1.80664 15.9345 1.80664C17.1551 1.80664 18.1366 2.79674 18.1366 4.00875C18.1281 5.2037 17.1892 6.16819 16.0113 6.21087Z"
            :stroke="color" stroke-width="1.2803" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M15.1311 12.4246C16.3004 12.6209 17.5892 12.4161 18.494 11.81C19.6975 11.0077 19.6975 9.69329 18.494 8.89097C17.5807 8.28496 16.2748 8.08011 15.1055 8.28496"
            :stroke="color" stroke-width="1.2803" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M5.74053 6.21087C5.79174 6.20233 5.85149 6.20233 5.9027 6.21087C7.08057 6.16819 8.01946 5.2037 8.01946 4.00875C8.01946 2.7882 7.0379 1.80664 5.81735 1.80664C4.5968 1.80664 3.61523 2.79674 3.61523 4.00875C3.62377 5.2037 4.56266 6.16819 5.74053 6.21087Z"
            :stroke="color" stroke-width="1.2803" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M6.62099 12.4246C5.45165 12.6209 4.16282 12.4161 3.25808 11.81C2.0546 11.0077 2.0546 9.69329 3.25808 8.89097C4.17136 8.28496 5.47726 8.08011 6.6466 8.28496"
            :stroke="color" stroke-width="1.2803" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M10.8883 12.5859C10.8371 12.5773 10.7773 12.5773 10.7261 12.5859C9.54826 12.5432 8.60938 11.5787 8.60938 10.3838C8.60938 9.1632 9.59093 8.18164 10.8115 8.18164C12.032 8.18164 13.0136 9.17174 13.0136 10.3838C13.0051 11.5787 12.0662 12.5517 10.8883 12.5859Z"
            :stroke="color" stroke-width="1.2803" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M13.3721 15.2743C12.015 14.3695 9.77021 14.3695 8.40456 15.2743C7.20108 16.0766 7.20108 17.391 8.40456 18.1933C9.77021 19.1066 12.0065 19.1066 13.3721 18.1933"
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
        default: "22",
    },
    height: {
        type: String,
        default: "21",
    },
});
</script>