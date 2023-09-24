<template>
    <div :class="['card dark:bg-gray-900 dark:text-white', { 'card-loading': loading }]">
        <div class="border-b border-gray-200 py-4 mb-4" v-if="$slots.header">
            <slot name="header" />
        </div>
        <slot />
        <div class=" flex justify-end py-4 " v-if="$slots.actions">
            <slot name="actions" />
        </div>
        <div v-if="loading" class="bg-gray-500 rounded absolute inset-0 z-10 opacity-50 animate-pulse grid place-items-center">
            <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps({
    loading: {
        type: Boolean,
        default: false
    }
})
</script>
<style scoped lang="scss">
.lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    transform: scale(200%);
}

.lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
}

@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(24px, 0);
    }
}
</style>