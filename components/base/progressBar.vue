<template>
    <div class="progress-bar bg-bluegray-100 rounded-full w-full h-[11px] sm:h-[6px]">
        <div class="inner bg-blue h-[11px] sm:h-[6px] rounded-full relative" :style="{ width: `${completed}%` }">
            <p class="absolute left-[-8px] sm:top-3 top-5 text-blue font-bold sm:text-h9">%{{ Number(completed.toFixed(2)) }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps({
    completed: {
        type: Number,
        default: 0
    },
    showPercentage: {
        type: Boolean,
        default: true
    }
})
</script>
<style scoped lang="scss">
.progress-bar {}
</style>