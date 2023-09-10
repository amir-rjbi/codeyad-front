<template>
    <button v-if="renderButtonTag == true" :class="[
        'btn ',
        { 'btn-white': colorWhite },
        { '!rounded-full': rounded },
        { 'btn-transparent': transparent },
        outline ? `text-${color}  !border-${color} hover:bg-${color}-250 dark:hover:bg-transparent dark:hover:opacity-80` : `text-white bg-${color} hover:bg-${color}-950`,
        size ? `btn-${size}` : null,
        { 'loading': loading }
    ]" :disabled="loading">
        <div :class="{ 'opacity-0': loading }">
            <template v-if="$slots.icon">
                <div class="flex items-center gap-[6px] justify-center ">
                    <slot />
                    <slot name="icon" />
                </div>
            </template>
            <template v-else>
                <slot />
            </template>
        </div>

        <div class="sp sp-3balls" v-if="loading"></div>
    </button>
    <nuxt-link v-else :class="[
        'btn ',
        { 'btn-white': colorWhite },
        { 'btn-transparent': transparent },
        { 'rounded-full': rounded },
        outline ? `text-${color}  !border-${color} hover:bg-${color}-250 dark:hover:bg-transparent dark:hover:opacity-80` : `!text-white bg-${color} hover:bg-${color}-950`,
        size ? `btn-${size}` : null,
        { 'loading': loading }
    ]" :disabled="loading">
        <div :class="{ 'opacity-0': loading }">
            <template v-if="$slots.icon">
                <div class="flex items-center gap-[6px] justify-center ">
                    <slot />
                    <slot name="icon" />
                </div>
            </template>
            <template v-else>
                <slot />
            </template>
        </div>

        <div class="sp sp-3balls" v-if="loading"></div>
    </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps({
    color: {
        type: String,
        default: "blue",
    },
    loading: {
        type: Boolean,
        default: false,
    },
    rounded: {
        type: Boolean,
        default: false,
    },
    outline: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: "",
    },
    renderButtonTag: {
        type: Boolean,
        default: true
    },
    colorWhite: {
        type: Boolean,
        default: false
    },
    transparent: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped lang="scss">
.loading {
    pointer-events: none;

}

.btn-transparent {
    background: transparent !important;
    color: var(--color-black);
    border: 2.313px solid var(--color-gray-300);

    &:hover {
        opacity: .5;
    }
}

.btn-sm {
    padding: .25rem 1rem;
    @apply rounded-sm;
}

.btn-lg {
    padding: 1.40rem 1rem;
    font-weight: 600;
    line-height: 20px;
}

.sp-3balls,
.sp-3balls:before,
.sp-3balls:after {
    border-radius: 50%;
    background-color: white;
    width: 10px;
    height: 10px;
    transform-origin: center center;
    display: inline-block;
}

.sp-3balls {
    position: absolute;
    width: 10px !important;
    height: 10px !important;
    background-color: white;
    opacity: 1;
    -webkit-animation: spScaleAlpha 1s infinite linear;
    animation: spScaleAlpha 1s infinite linear;
}

.sp-3balls:before,
.sp-3balls:after {
    content: "";
    position: relative;
    opacity: 0.25;
}

.sp-3balls:before {
    left: 18px;
    top: -5px;
    -webkit-animation: spScaleAlphaBefore 1s infinite linear;
    animation: spScaleAlphaBefore 1s infinite linear;
}

.sp-3balls:after {
    left: -18px;
    top: -30px;
    -webkit-animation: spScaleAlphaAfter 1s infinite linear;
    animation: spScaleAlphaAfter 1s infinite linear;
}

@-webkit-keyframes spScaleAlpha {
    0% {
        opacity: 1;
    }

    33% {
        opacity: 0.25;
    }

    66% {
        opacity: 0.25;
    }

    100% {
        opacity: 1;
    }
}

@keyframes spScaleAlpha {
    0% {
        opacity: 1;
    }

    33% {
        opacity: 0.25;
    }

    66% {
        opacity: 0.25;
    }

    100% {
        opacity: 1;
    }
}

@-webkit-keyframes spScaleAlphaBefore {
    0% {
        opacity: 0.25;
    }

    33% {
        opacity: 1;
    }

    66% {
        opacity: 0.25;
    }
}

@keyframes spScaleAlphaBefore {
    0% {
        opacity: 0.25;
    }

    33% {
        opacity: 1;
    }

    66% {
        opacity: 0.25;
    }
}

@-webkit-keyframes spScaleAlphaAfter {
    33% {
        opacity: 0.25;
    }

    66% {
        opacity: 1;
    }

    100% {
        opacity: 0.25;
    }
}

@keyframes spScaleAlphaAfter {
    33% {
        opacity: 0.25;
    }

    66% {
        opacity: 1;
    }

    100% {
        opacity: 0.25;
    }
}
</style>