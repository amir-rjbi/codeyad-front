<template>
    <nav class="flex flex-wrap items-center gap-2 text-h8">
        <template v-for="item in items">
            <template v-if="item.isActive == false">
                <nuxt-link :to="item.link ?? '/'">{{ item.title }}</nuxt-link>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g clip-path="url(#clip0_804_29883)">
                        <path d="M10 4.5L6 8.5L10 12.5" stroke="#464646" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_804_29883">
                            <rect width="16" height="16" fill="white" transform="matrix(-1 0 0 1 16 0.5)" />
                        </clipPath>
                    </defs>
                </svg>
            </template>
            <p class="text-blue" v-else>{{ item.title }}</p>
        </template>
    </nav>
</template>
<script setup lang="ts">
export interface BreadCrumbItem {
    title: string,
    link?: string | null,
    isActive: boolean
}
defineProps<{
    items: BreadCrumbItem[]
}>();
</script>