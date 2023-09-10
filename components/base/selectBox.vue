<template>
    <div>
        <label class="input-label" v-if="label">{{ label }}<span class="text-red-600" v-if="required">
                *</span></label>
        <div>
            <select :class="[
                'form-control ',
                { 'bg-transparent': transparent },
                { 'invalid-data': !!errorMessage },
                { 'has-icon': $slots.icon },
                { 'outline': outLine }
            ]" :disabled="disabled" :placeholder="placeholder" :value="inputValue" @input="modelValueChanged"
                :name="name">
                <slot v-if="hasSlot()" />
            </select>
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
    transparent: {
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
select {
    outline: none !important;
    width: 100%;
    padding-top: .6rem !important;
    padding-bottom: .6rem !important;
}

.form-control.outline {
    outline: none;
}
</style>
