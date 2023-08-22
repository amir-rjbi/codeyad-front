<template>
    <textarea class="form-control" rows="2" :placeholder="placeholder" :id="id">{{ modelValue }}</textarea>
</template>
<script setup lang="ts">
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
});
const emits = defineEmits(['update:modelValue'])
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
    emits('update:modelValue', editor.getData());
}
</script>