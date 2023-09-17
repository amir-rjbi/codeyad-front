<template>
    <div>
        <label :class="['input-label']" v-if="label">{{ label }}<span class="text-red-600" v-if="required">
                *</span></label>
        <div :class="['input-group']">
            <input type="hidden" :name="name" :value="inputValue" />
            <input :type="type" :class="[
                'form-control ',
                { 'bg-transparent': transparent },
                { 'invalid-data': !!errorMessage },
                { 'has-icon': $slots.icon },
                { 'outline': outLine }
            ]" :placeholder="placeholder" :value="displayValue" :autofocus="autofocus" v-bind="$attrs"
                @input="modelValueChanged" autocomplete="off" inputmode="numeric" />
        </div>
        <p class="input-valid-text" v-if="!errorMessage">{{ message }}</p>
        <p class="input-invalid-text" v-else-if="modelValue">
            {{ errorMessage }}
        </p>
    </div>
</template>
  
  
<script setup lang="ts">
import { useField } from "vee-validate";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    autofocus: {
        default: null,
        type: Boolean,
    },
    required: {
        default: false,
        type: Boolean,
    },
    outLine: {
        default: false,
        type: Boolean,
    },
    placeholder: {
        default: "",
        type: String,
    },
    label: {
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
    classValue: {
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

});

const displayValue = ref('');
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


    if (!$event.target.value) {
        $event.target.value = '';
        emit("update:modelValue", '');

        return;
    }

    var value = $event.target.value.toString().replaceAll(",", "");

    if (isNaN(Number(value))) {
        $event.target.value = props.modelValue;
        displayValue.value = splitNumber(props.modelValue);
        return;
    }

    displayValue.value = splitNumber(value);
    emit("update:modelValue", $event.target.value.toString().replaceAll(",", ""));
    $event.target.value = $event.target.value.toString().replaceAll(",", "");
    handleChange($event);
};

onMounted(() => {
    if (inputValue.value)
        displayValue.value = splitNumber(inputValue.value);
});
</script>