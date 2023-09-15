<template>
    <Transition enter-active-class="animate__animated  animate__FadeIn animate__faster"
        leave-active-class="animate__animated  animate__FadeOut animate__faster">
        <div class="modal-wrapper" @click.self="closeModal" v-if="modelValue">
            <Transition enter-active-class="animate__animated animate__slideInUp animate__faster"
                leave-active-class="animate__animated animate__slideOutDown animate__faster">
                <div v-if="showModal" :class="[
                    { ' modal-wrapper--normal': isNormal },
                    'modal-fix-header',
                    'modal-wrapper--inner'
                ]">
                    <div :class="['modal', size, modalClass]" v-if="modelValue">
                        <div :class="[
                            'modal__header',
                            { 'modal__header-hide': showHeader == false },
                            headerClass
                        ]">
                            <div class="modal__close-btn" @click="closeModal" v-if="hideCloseBtn == false">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M1 1L6 6M11 11L6 6M6 6L11 1M6 6L1 11" stroke="#ABADB3" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                </svg>
                            </div>
                            <template v-if="$slots.header">
                                <slot name="header" />
                            </template>
                            <template v-else>
                                <h5 class="modal__name">{{ title }}</h5>
                                <p class="modal__caption" v-if="subTitle">
                                    {{ subTitle }}
                                </p>
                            </template>
                        </div>
                        <div :class="['modal__body', bodyClass]">
                            <slot></slot>
                            <div class="modal__actions mt-1_5 align-items-center" v-if="$slots.actions">
                                <slot name="actions" />
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>

    </Transition>
</template>
  
<script setup lang="ts">
//@ts-ignore
const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    subTitle: {
        type: String,
        default: "",
    },
    modelValue: {
        type: Boolean,
        default: false,
    },
    isNormal: {
        type: Boolean,
        default: false,
    },
    showHeader: {
        type: Boolean,
        default: true,
    },
    mobileHeader: {
        type: Boolean,
        default: false,
    },
    modalClass: {
        type: String,
        default: "overflow-auto",
    },
    size: {
        type: String,
        default: "default",
    },
    hideCloseBtn: {
        type: Boolean,
        default: false,
    },
    bodyClass: {
        type: String,
        default: "",
    },
    headerClass: {
        type: String,
        default: "",
    }
});

const showModal = ref(false);

watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            document.getElementsByTagName("html")[0].style.overflowY = "hidden"
            setTimeout(() => {
                showModal.value = true;
            }, 150);
        } else {
            document.getElementsByTagName("html")[0].style.overflowY = "auto"
            showModal.value = false;
        }
    }
);
const emit = defineEmits(["update:modelValue"]);
const closeModal = () => {
    showModal.value = false;
    setTimeout(() => {
        emit("update:modelValue", false);
    }, 100);
};
</script>
  
<style lang="scss">
.overflow-auto {
    overflow: auto;
}

.overflow-none {
    overflow: initial !important;
}

.modal__actions {
    display: flex;
    flex-direction: row-reverse;
    gap: 1rem;
}

body.modal-open {
    overflow: hidden;
    height: 100vh;
}

.modal-wrapper {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999998;
    background: #00000073;
    justify-content: center;
    overflow: hidden;

}


.modal-wrapper--inner {
    max-height: 90%;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 27.757px;
    position: relative;

    &::-webkit-scrollbar {
        width: 6px;
        margin-top: 2rem;
        padding-top: 2rem;
        top: 10px;
        position: fixed;
        margin-left: 2rem;

    }

    &::-webkit-scrollbar-track {
        border-radius: 8px;
        margin-top: 2.5rem;
        margin-bottom: 2.5rem;
        margin-left: 2rem;
        top: 10px;
        position: fixed;

    }

    &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        top: 5px;
        position: fixed;
        border-radius: 8px;
        background: var(--color-gray-300);
    }
}

.modal {
    border-radius: 27.757px;
    overflow: initial;
    background-color: var(--color-white);
    max-width: 51rem;
    width: 100%;
    flex-shrink: 0;
    overflow: auto;

    &.sm {
        width: 608px;

    }

    &.xs {
        width: 432px;

        .modal__body {
            padding: 1.5rem;
            padding-top: .5rem;

        }

        .modal__header {
            padding: 1.5rem;
            padding-bottom: 0;
            min-height: unset;

            h5 {
                font-size: var(--t5-font-size);
                font-family: var(--t5-font-family);
            }
        }
    }

    .modal__header {
        position: relative;
        background-color: var(--color-gray-200);
        height: 6.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        direction: ltr;
    }
}

.modal-fix-header .modal__close-btn {
    background-color: var(--color-gray-200);
    width: 40px;
    height: 40px;
    border-radius: 10px;
    left: 40px;
    right: auto;
    top: 30px;
}

.modal-fix-header .modal__name {
    font-size: var(--h4-font-size);
}

.modal-fix-header .modal__close-btn svg {
    width: 12px;
    height: 12px;
    stroke-width: 1.5;
}

.modal-fix-header .modal__header {
    background-color: var(--color-white);
    display: block;
    height: auto;
    padding: 40px 40px 0 1.625rem;
    min-height: 4rem;
    border-radius: 20px;
}



.modal__header.modal__header-hide {
    display: none;
}

.modal__close-btn {
    width: 3.5rem;
    height: 3.5rem;
    background-color: var(--color-white);
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 4rem;
    top: 1.5rem;
    cursor: pointer;
}

.modal__close-btn svg {
    width: 18px;
    height: 18px;
    stroke-width: 2;
}

.modal__name {
    font-size: var(--h5-font-size);
}

.modal__caption {
    color: var(--color-gray-600);
    font-size: var(--h8-font-size);
    margin-top: 0.5rem;
}

.modal__body {
    padding: 3rem 3rem 2rem 3rem;
    overflow-x: inherit;
}

.modal__submit-btn {
    min-width: 12rem;
    margin-right: auto;
    margin-top: 2rem;
}

.modal__line {
    display: none;
    background-color: var(--color-gray-200);
    height: 2px;
    margin-top: 1.5rem;
    margin-left: -2rem;
}

@media screen and (max-width: 992px) {
    .modal {
        max-width: 44rem;
    }

    .modal__body {
        padding-left: 3rem;
        padding-right: 3rem;
        padding-bottom: 2rem;
    }

    .modal__close-btn {
        left: 3rem;
    }
}

@media screen and (max-width: 768px) {
    .modal-wrapper--inner {
        width: 100%;
        border-radius: 27.757px 27.757px 0 0;

    }

    .modal-wrapper {
        max-height: 100vh;
        align-items: flex-end;
    }

    .modal-wrapper--normal {
        align-items: flex-start;
        padding: 0 26px;
    }

    .modal-wrapper--normal .modal {
        border-radius: 20px;
        margin-top: 4rem;
    }

    .modal-wrapper--normal .modal__header {
        background-color: var(--color-blue-gray-050);
        display: flex;
        padding: 0;
    }

    .modal__header-hide {
        display: block !important;
    }

    .modal-wrapper--normal .modal__header::before {
        content: none;
    }

    .modal-wrapper--normal .modal__close-btn,
    .modal-wrapper--normal .modal__caption {
        display: none;
    }

    .modal-wrapper--normal .modal__name {
        margin-top: 0;
        text-align: center;
    }

    .modal-wrapper--normal .modal__body {
        padding-top: 1.5rem;
    }

    .modal {
        max-width: 100%;
        width: 100% !important;
        flex-grow: 1;
        border-radius: 20px 20px 0 0;
        transform: none;
        margin-bottom: 0;
        overflow-y: auto !important;

        &.xs {
            .modal__header {
                padding: 1rem;
                margin-bottom: .5rem;


            }



            .modal__body {
                padding: 1rem;
            }
        }
    }

    div.modal .modal__header {
        background-color: var(--color-white);
        display: block;
        height: auto;
        padding: 1.5rem 1.625rem 0 1.625rem !important;
        min-height: 4rem;
    }

    .modal__header::before {
        content: "";
        width: 4rem;
        height: 0.25rem;
        border-radius: 2px;
        background-color: var(--color-gray-300);
        display: block;
        left: 0;
        right: 0;
        margin: auto;
    }

    .modal__close-btn {
        background-color: var(--color-gray-200);
        width: 40px;
        height: 40px;
        border-radius: 10px;
        left: 1.625rem !important;
        right: auto;
    }

    .modal__close-btn svg {
        width: 12px;
        height: 12px;
        stroke-width: 1.5;
    }

    .modal__body {
        padding: 2rem 1.625rem 1.5rem 1.625rem;
    }

    .modal__name {
        font-weight: bold;
        text-align: right;
        margin-top: 1.25rem;
    }

    .modal__caption {
        display: block;
    }

    .modal__submit-btn {
        width: 100%;
        margin-top: 1.5rem;
    }

    .modal__line {
        display: block;
        width: 100%;

    }
}

// @media screen and (max-width: 576px) {
//     .modal__body {
//         padding-top: 0 !important;
//     }
// }
</style>