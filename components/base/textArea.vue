<template>
    <div class="w-full">
        <label :class="['input-label']" v-if="label">{{ label }}<span class="text-red-600" v-if="required">
                *</span></label>
        <div :class="['input-group  ',]">
            <textarea :placeholder="placeholder" :class="[
                'form-control ',
                { 'invalid-data': !!errorMessage },
                { 'has-icon': $slots.icon },
                { 'outline': outLine }
            ]" :disabled="disabled" :name="name" @input="modelValueChanged">{{ inputValue }}</textarea>
            <div class="input__icon " v-if="$slots.icon && !errorMessage">
                <slot name="icon" />
            </div>
            <slot v-if="hasSlot()" />
            <p class="input-invalid-text" v-if="errorMessage">{{ errorMessage }}</p>
        </div>
    </div>
</template>
  
  
<script setup lang="ts">
import { useField } from "vee-validate";
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

    label: {
        type: String,
        default: ""
    },
    outLine: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    required: {
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
    left: 1.25rem;
    top: 0;
    display: flex;
    align-items: center;
}

.input {
    position: relative;
}
</style>