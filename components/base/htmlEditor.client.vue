<template>
    <div>
        <label :class="['input-label']" v-if="label">{{ label }}<span class="text-red-600" v-if="required">
                *</span></label>
        <textarea class="form-control" rows="2" :placeholder="placeholder" :id="id">{{ modelValue }}</textarea>
        <p class="input-invalid-text" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>
<script setup lang="ts">
import { useField } from "vee-validate";


const props = defineProps({
    modelValue: {
        default: "",
        type: String || null,
    },
    placeholder: {
        default: ""
    },
    id: {
        type: String,
        required: true
    },
    uploadUrl: {
        type: String,
        default: ""
    },
    label: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true
    },
    required: {
        type: Boolean,
        default: false
    }
});
const emit = defineEmits(['update:modelValue'])
const loading = ref(true);
onMounted(() => {
    //@ts-ignore
    setTimeout(async () => {
        const ckEditor = await loadCkeditor(props.id, props.uploadUrl, "jwtToken");
        ckEditor.model.document.on('change:data', (e: any) => changeData(e, ckEditor))
        loading.value = true;
    }, 500);
});
const changeData = (e: any, editor: any) => {
    const data = editor.getData();
    emit('update:modelValue', data);
    setValue(data)
}


const {
    value: inputValue,
    handleChange,
    setValue,
    errorMessage
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
    handleChange($event);
};
</script>