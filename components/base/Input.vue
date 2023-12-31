<template>
    <div>
        <label :class="['input-label']" v-if="label">{{ label }}<span class="text-red-600" v-if="required">
                *</span></label>
        <div :class="['input-group',]">
            <input @blur="handleBlur($event, true)" :type="type" :disabled="disabled" :class="[
                'form-control ',
                { 'bg-transparent': transparent },
                { 'invalid-data': !!errorMessage },
                { 'has-icon': $slots.icon },
                { 'outline': outLine }
            ]" :placeholder="placeholder" :value="inputValue" :autofocus="autofocus" @input="modelValueChanged"
                :name="name" :autocomplete="autocomplete" :inputmode="number ? 'numeric' : 'text'" />
            <div class="input__icon " v-if="$slots.icon && !errorMessage">
                <slot name="icon" />
            </div>

            <slot v-if="hasSlot()" />
            <p class="input-invalid-text" v-if="errorMessage && meta.touched">{{ errorMessage }}</p>
        </div>
    </div>
</template>
  
  
<script setup lang="ts">
import { useField } from "vee-validate";
const slots = useSlots();
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    autofocus: {
        default: null,
        type: Boolean,
    },
    autocomplete: {
        default: "off",
        type: String
    },
    placeholder: {
        default: "",
        type: String,
    },
    modelValue: {
        default: "",
        type: String || null,
    },
    type: {
        default: "text",
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        default: "",
    },
    number: {
        type: Boolean,
        default: false,
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
    if (props.type == 'input') {
        return;
    }
    if (props.type == 'checkbox') {
        if ($event.target.checked) {
            handleChange($event);
            emit("update:modelValue", $event.target.value);
        } else {
            emit("update:modelValue", "");
            setValue("");
        }
    } else {
        if (props.number) {
            if (!isNaN($event.target.value)) {
                emit("update:modelValue", $event.target.value);
            } else {
                $event.target.value = props.modelValue;
            }
        } else {
            emit("update:modelValue", $event.target.value);
        }
        handleChange($event);
    }
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
</style>