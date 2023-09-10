<template>
    <div>
        <label :class="['input-label']" v-if="label">{{ label }}<span class="text-red-600" v-if="required">
                *</span></label>
        <input type="file" :disabled="disabled" :class="[
            'form-control ',
            { 'bg-transparent': transparent },
            { 'invalid-data': !!errorMessage },
            { 'has-icon': $slots.icon },
            { 'outline': outLine }
        ]" :placeholder="placeholder" :accept="accept" @input="modelValueChanged" :name="name" />
        <p class="input-invalid-text" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>
  
  
<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps({
    placeholder: {
        default: "",
        type: String,
    },
    accept: {
        type: String,
        default: "image/*"
    },
    name: {
        type: String,
        required: true,
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
    validateOnValueUpdate: false,
});
const modelValueChanged = ($event: any) => {
    handleChange($event);
};
</script>
<style scoped lang="scss">
.invalid-data {
    box-shadow: 0 0 1px 1px #ff0000a3;
}

.input-invalid-text {
    font-size: 16px;
    color: red;
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

.form-control {
    padding-bottom: 10px;
}
</style>