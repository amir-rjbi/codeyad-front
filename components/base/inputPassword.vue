<template>
    <div>
        <label class="input-label" v-if="label">{{ label }}</label>
        <div :class="['input-group',]">
            <input :type="showText ? 'text' : 'password'" :class="[
                'form-control ',
                { 'bg-transparent': transparent },
                { 'invalid-data': !!errorMessage },
                'has-icon',
                { 'outline': outLine }

            ]" :placeholder="placeholder" :value="inputValue" @input="modelValueChanged" :name="name"
                autocomplete="off" />
            <div class="input__icon">
                <svg class="cursor-pointer" @click="showText = false" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" v-if="showText">
                    <path
                        d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z"
                        stroke="var(--color-blue-gray-400)" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path
                        d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                        stroke="var(--color-blue-gray-400)" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                <svg class="cursor-pointer" @click="showText = true" v-else width="24" height="24" viewBox="0 0 24 24"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z"
                        stroke="var(--color-blue-gray-400)" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path
                        d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77"
                        stroke="var(--color-blue-gray-400)" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path
                        d="M8.41992 19.5299C9.55992 20.0099 10.7699 20.2699 11.9999 20.2699C15.5299 20.2699 18.8199 18.1899 21.1099 14.5899C22.0099 13.1799 22.0099 10.8099 21.1099 9.39993C20.7799 8.87993 20.4199 8.38993 20.0499 7.92993"
                        stroke="var(--color-blue-gray-400)" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M15.5095 12.7C15.2495 14.11 14.0995 15.26 12.6895 15.52" stroke="var(--color-blue-gray-400)"
                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9.47 14.53L2 22" stroke="var(--color-blue-gray-400)" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M21.9993 2L14.5293 9.47" stroke="var(--color-blue-gray-400)" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <slot v-if="hasSlot()" />
        </div>
        <p class="input-invalid-text" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>
  
  
<script setup lang="ts">
import { Ref } from "vue";
import { useField } from "vee-validate";


const showText = ref(false);
const slots = useSlots();
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    placeholder: {
        default: "",
        type: String,
    },
    modelValue: {
        default: "",
        type: String || null,
    },
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        default: "",
    },
    ignoreErrorMessage: {
        type: Boolean,
        default: false,
    },
    transparent: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: ""
    }, outLine: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const {
    value: inputValue,
    errorMessage,
    meta,
    handleChange,
    handleBlur,
    setValue,
} = useField(props.name, undefined, {
    initialValue: props.modelValue,
    validateOnValueUpdate: false,
});

watchEffect(() => {
    emit("update:modelValue", unref(inputValue));
});
watch(
    () => props.modelValue,
    (value) => {
        setValue(value);
    }
);
const modelValueChanged = ($event: any) => {
    emit("update:modelValue", $event.target.value);
    handleChange($event);
};
const hasSlot = () => {
    return !!slots.default;
};
</script>
<style scoped lang="scss">
.checkbox__wrap {
    display: flex;
    gap: 0.5rem;
}

.checkbox__wrap label {
    cursor: pointer;
}

.has-icon {
    padding-left: 2.7rem;
}

.input__icon {
    position: absolute;
    height: 100%;
    left: 1.18rem;
    top: 0;
    display: flex;
    align-items: center;
}

.input {
    position: relative;
}
</style>