<template>
    <textarea class="form-control" :placeholder="placeholder" :id="id">{{ modelValue }}</textarea>
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
onMounted(() => {
    setTimeout(async () => {
        //@ts-ignore
        const ckEditor = await loadCkeditor(props.id, props.uploadUrl, "auth");
        ckEditor.model.document.on('change:data', (e: any) => changeData(e, ckEditor))
    }, 500);
});
const changeData = (e: any, editor: any) => {
    emits('update:modelValue', editor.getData());
}
</script>