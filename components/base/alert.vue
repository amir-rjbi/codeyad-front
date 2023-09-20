<template>
    <div :class="['alert rounded shadow-2xl', alertType]">
        <IconsCheck v-if="alertType == 'success'" color="white" width="25px" height="25" />
        <IconsWarning v-if="alertType == 'warning'" color="white" width="25px" height="25"/>
        <IconsClose v-if="alertType == 'error'" color="white" width="25px" height="25"/>
        <IconsInfo v-if="alertType == 'info'" color="white" width="25px" height="25"/>
        <div>
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    alertType?: "warning" | "error" | "info" | "success"
}>(), {
    alertType: "info"
});
</script>
<style scoped lang="scss">
.alert {
    @apply text-white p-4 flex gap-3 items-start;

    &.warning {
        @apply bg-orange
    }

    &.error {
        @apply bg-red
    }

    &.info {
        @apply bg-blue
    }

    &.success {
        @apply bg-green
    }
}
</style>