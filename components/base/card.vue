<template>
    <div class="card dark:bg-gray-900 dark:text-white">
        <div class="border-b border-gray-200 py-4 mb-4" v-if="$slots.header">
            <slot name="header" />
        </div>
        <slot />
        <div class=" flex justify-end py-4 " v-if="$slots.actions">
            <slot name="actions" />
        </div>
    </div>
</template>