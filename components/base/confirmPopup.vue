<template>
    <Transition name="page">
        <div class="delete-popup" v-if="modelValue" @click.self="$emit('update:modelValue', false)">
            <div :class="['card w-[30%] p-0 rounded-s flex gap-5 items-center sm:!w-[95%]']">
                <div class="flex justify-center  h-[170px] sm:h-[150px] w-[25%] rounded-s items-center bg-slate-800">
                    <slot name="icon" />
                    <template v-if="!$slots.icon">
                        <svg v-if="isQuestionIcon" xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 28 28" fill="none">
                            <path
                                d="M15.1666 19.8333C15.1666 20.4777 14.6443 21 14 21C13.3556 21 12.8333 20.4777 12.8333 19.8333C12.8333 19.189 13.3556 18.6667 14 18.6667C14.6443 18.6667 15.1666 19.189 15.1666 19.8333Z"
                                fill="var(--primary-color)" />
                            <path
                                d="M11.7917 11.2292C11.7917 10.1334 12.736 9.16666 14 9.16666C15.264 9.16666 16.2084 10.1334 16.2084 11.2292C16.2084 11.9804 15.7742 12.6607 15.0867 13.025C14.7809 13.187 14.3549 13.4176 13.9915 13.7741C13.3573 14.3963 13 15.2474 13 16.1359V16.3333C13 16.8856 13.4477 17.3333 14 17.3333C14.5523 17.3333 15 16.8856 15 16.3333V16.1359C15 15.7845 15.1414 15.4478 15.3922 15.2017C15.5259 15.0705 15.7137 14.9562 16.0232 14.7922C17.3078 14.1115 18.2084 12.7836 18.2084 11.2292C18.2084 8.94217 16.2799 7.16666 14 7.16666C11.7202 7.16666 9.79169 8.94217 9.79169 11.2292C9.79169 11.7814 10.2394 12.2292 10.7917 12.2292C11.344 12.2292 11.7917 11.7814 11.7917 11.2292Z"
                                fill="var(--primary-color)" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M2.5 14C2.5 7.64873 7.64873 2.5 14 2.5C20.3513 2.5 25.5 7.64873 25.5 14C25.5 20.3513 20.3513 25.5 14 25.5C7.64873 25.5 2.5 20.3513 2.5 14ZM14 4.5C8.75329 4.5 4.5 8.75329 4.5 14C4.5 19.2467 8.75329 23.5 14 23.5C19.2467 23.5 23.5 19.2467 23.5 14C23.5 8.75329 19.2467 4.5 14 4.5Z"
                                fill="var(--primary-color)" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 28 28" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.42129 6H3.5C2.94772 6 2.5 6.44771 2.5 7C2.5 7.55228 2.94772 8 3.5 8H4.89388L5.88474 23.8538C5.98356 25.4349 7.29471 26.6667 8.8789 26.6667H19.1211C20.7053 26.6667 22.0164 25.4349 22.1153 23.8538L23.1061 8H24.5C25.0523 8 25.5 7.55228 25.5 7C25.5 6.44771 25.0523 6 24.5 6H22.174C22.1685 5.99995 22.1629 5.99995 22.1574 6H19.5787C19.1064 3.34732 16.7884 1.33333 14 1.33333C11.2116 1.33333 8.8936 3.34732 8.42129 6ZM10.4714 6H17.5286C17.0934 4.461 15.6784 3.33333 14 3.33333C12.3216 3.33333 10.9066 4.461 10.4714 6ZM21.1022 8H6.89778L7.88085 23.729C7.91379 24.2561 8.35084 24.6667 8.8789 24.6667H19.1211C19.6492 24.6667 20.0862 24.2561 20.1192 23.729L21.1022 8ZM16.6472 11.8443C17.1982 11.8828 17.6136 12.3607 17.5751 12.9116L17.0868 19.8946C17.0482 20.4455 16.5704 20.8609 16.0194 20.8224C15.4685 20.7838 15.0531 20.306 15.0916 19.755L15.5799 12.7721C15.6184 12.2212 16.0963 11.8058 16.6472 11.8443ZM11.3528 11.8443C11.9037 11.8058 12.3816 12.2212 12.4201 12.7721L12.9084 19.7551C12.9469 20.306 12.5315 20.7839 11.9806 20.8224C11.4297 20.8609 10.9518 20.4455 10.9133 19.8946L10.425 12.9116C10.3865 12.3607 10.8019 11.8829 11.3528 11.8443Z"
                                fill="var(--color-error)" />
                        </svg>
                    </template>
                </div>
                <div class="flex flex-col flex-grow p-2 justify-between  h-[170px] sm:h-[150px]">
                    <div class="pt-2">
                        <h3 class="text-h4 sm:text-h5">{{ title }}</h3>
                        <div v-if="description">
                            <p class="text-h7 sm:text-h8 mt-3">{{ description }}</p>
                        </div>
                    </div>
                    <div :class="['card-footer flex justify-end gap-2 self-end', { 'card-loading': loading }]">
                        <BaseButton color="red" @click="close">{{ cancelText }}</BaseButton>
                        <BaseButton :loading="loading" @click="confirm">{{ confirmText }}</BaseButton>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        default: "حذف !"
    },
    description: {
        type: String,
        default: "آیا از حذف اطمینان دارید ؟"
    },
    confirmText: {
        type: String,
        default: "بله"
    },
    cancelText: {
        type: String,
        default: "منصرف شدم"
    },
    confirmFunction: {
        type: Function,
    },
    modelValue: {
        type: Boolean
    },
    isQuestionIcon: {
        type: Boolean,
        default: false
    }
});
const loading = ref(false);
const emits = defineEmits(['update:modelValue'])
const close = () => {
    emits("update:modelValue", false);
}
const confirm = async () => {
    loading.value = true;
    //@ts-ignore
    await props.confirmFunction();
    loading.value = false;

}
</script>
<style scoped lang="scss">
@media screen and (max-width:768px) {
    div.card {
        svg {
            width: 38px !important;
            height: 38px !important;
        }
    }
}

@media screen and (max-width:1162px) {
    div.card {
        min-width: 50%;

        svg {
            width: 48px;
            height: 48px;
        }
    }
}

.delete-popup {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.288);
    z-index: 10001;
    display: flex;
    align-items: center;
    justify-content: center;

    .card {
        z-index: 10002;
    }
}</style>