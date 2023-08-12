<template>
    <div class="card dark:bg-gray-900 dark:text-white">
        <div class="border-b border-gray-200" v-if="$slots.header">
            <slot name="header" />
        </div>
        <slot />
    </div>
</template>