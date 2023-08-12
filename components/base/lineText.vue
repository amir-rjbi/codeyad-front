<template>
    <div class="line-text">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.line-text {
    display: flex;
    gap: 18px;
    align-items: center;
    color: var(--color-blue-gray-600);
    
    &::after {
        content: " ";
        height: 1px;
        flex-grow: 1;
        background: var(--color-blue-gray-200);
    }
    &::before {
        content: " ";
        height: 1px;
        flex-grow: 1;
        background: var(--color-blue-gray-200);
    }
}
</style>