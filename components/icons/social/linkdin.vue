<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 27 28" fill="none">
        <circle cx="13.5665" cy="13.9298" r="11.0958" fill="#0077B5" />
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M10.6646 8.54442C10.6646 9.23518 10.1386 9.7942 9.31613 9.7942C8.52567 9.7942 7.99972 9.23518 8.01599 8.54442C7.99972 7.82008 8.52566 7.27734 9.33189 7.27734C10.1386 7.27734 10.6488 7.82008 10.6646 8.54442ZM8.08212 18.8275V10.7815H10.5827V18.827H8.08212V18.8275Z"
            fill="white" />
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M12.5876 13.3488C12.5876 12.3453 12.5545 11.4897 12.5215 10.7821H14.6935L14.8089 11.8844H14.8583C15.1874 11.3742 16.0099 10.6016 17.3426 10.6016C18.9876 10.6016 20.2216 11.6876 20.2216 14.0559V18.8281H17.721V14.3692C17.721 13.3321 17.3594 12.625 16.4545 12.625C15.7632 12.625 15.3522 13.1021 15.1879 13.5625C15.1218 13.7273 15.0892 13.9572 15.0892 14.1881V18.8281H12.5886V13.3488H12.5876Z"
            fill="white" />
    </svg>
</template>
<script setup lang="ts">
const props = defineProps({
    color: {
        type: String,
        default: "var(--body-text-color)",
    },
    width: {
        type: String,
        default: "27",
    },
    height: {
        type: String,
        default: "28",
    },
});
</script>