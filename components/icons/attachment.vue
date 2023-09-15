<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 17 24" fill="none">
        <path
            d="M15.1294 2.53102C15.1294 2.53102 15.9313 5.33406 14.1195 12.0955C11.6608 21.2718 9.08185 23.169 5.21816 22.1337C1.35448 21.0985 0.0696421 18.166 2.52842 8.98971C4.9872 -0.186586 10.1105 0.908974 11.3605 3.07404C12.7747 5.52353 10.48 12.1556 10.48 12.1556C10.48 12.1556 8.97648 17.4468 6.64167 16.8211C3.26091 15.9153 7.03917 7.61017 7.03917 7.61017"
            :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
        default: "17",
    },
    height: {
        type: String,
        default: "24",
    },
});
</script>