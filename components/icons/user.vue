<template>
    <svg :width="width" :height="height" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.27734 6.89975C4.57987 6.89975 3.2171 5.53699 3.2171 3.83951C3.2171 2.16594 4.57987 0.779269 6.27734 0.779269C7.95091 0.779269 9.33758 2.16594 9.33758 3.83951C9.33758 5.53699 7.95091 6.89975 6.27734 6.89975ZM7.47275 8.04734C9.76793 8.04734 11.6328 9.91218 11.6328 12.2074C11.6328 12.6616 11.2502 13.0202 10.796 13.0202H1.7348C1.28054 13.0202 0.921922 12.6616 0.921922 12.2074C0.921922 9.91218 2.76285 8.04734 5.05803 8.04734H7.47275Z"
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
        default: "14",
    },
});
</script>
