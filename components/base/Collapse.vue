<template>
    <div :class="['w-full', { 'down-to-up': DownToUpIcon }, { 'bg-white': bgWhite }, { 'open': isOpen }]">
        <div :class="['head items-center flex gap-5 justify-between cursor-pointer']" @click="isOpen = !isOpen">
            <p :class="['text-black font-medium', titleClass]">{{ title }}</p>
            <div :class="['icon', { 'opened': isOpen }]">
                <template v-if="DownToUpIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="11" viewBox="0 0 20 11" fill="none">
                        <path
                            d="M1.03125 1.41406L8.39823 8.78104C9.33715 9.71997 10.8594 9.71997 11.7984 8.78104L19.1654 1.41406"
                            stroke="#080808" stroke-width="1.56258" />
                    </svg>
                </template>
                <template v-else-if="$slots.icon">
                    <slot name="icon" />
                </template>
                <IconsArrowLeft v-else />
            </div>
        </div>
        <div class="content mt-2" v-if="isOpen">
            <slot />
        </div>
    </div>
</template>
<script setup lang="ts">
const isOpen = ref(false);
const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    isOpen: {
        type: Boolean,
        default: false
    },
    DownToUpIcon: {
        type: Boolean,
        default: false
    },
    titleClass: {
        type: String,
        default: ""
    },
    bgWhite: {
        type: Boolean,
        default: false
    },
})
</script>
<style scoped lang="scss">
.down-to-up {
    .head {
        border-bottom: 1px solid var(--color-gray-400);
        padding-bottom: .5rem;
    }

    .icon {
        &.opened {
            rotate: -180deg !important;
        }
    }
}

.bg-white {
    padding: 1.5rem;
    border-radius: 8px 8px;
    overflow: hidden;

    .content {
        padding-top: 1.5rem;    
        margin-top: 0;
    }

    &.open {
        .head {
            position: relative;
            padding-bottom: 1.5rem;

            &::before {
                content: " ";
                position: absolute;
                height: .5px;
                width: 120%;
                right: -10%;
                background: var(--color-gray-300);
                bottom: 0;
            }
        }
    }

}

.head {
    width: 100%;
    font-size: 16px;
    p {
        line-height: normal;
        font-weight: bold;

    }

    .icon {
        &.opened {
            rotate: -90deg;
        }
    }
}
</style>