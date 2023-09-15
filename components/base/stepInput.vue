<template>
    <ClientOnly>
        <div class="step__wrapper">
            <input :style="inputStyles" @input="(e) => dataChanged(e, index)" @keydown="back($event, index)"
                :tabindex="item" maxlength="1" v-for="(item, index) in RangeNumber(1, length)" :value="data[index]"
                :name="inputName" type="text"
                :class="[{ 'has__Data': data[index] }, { 'disabled': index > 0 && !data[index - 1] }]" autocomplete="off"
                :inputmode="numberKeyboard ? 'numeric' : 'text'" />
        </div>
        <template #fallback>
            <div class="step__wrapper">
                <BaseSkeletonLoaidng class="loading" :style="inputStyles" v-for="(item, index) in RangeNumber(1, length)" />
            </div>
        </template>
    </ClientOnly>
</template>


<script setup lang="ts">
const props = defineProps({
    length: {
        type: Number,
        default: 5
    },
    modelValue: {
        type: String,
        default: ""
    },
    numberKeyboard: {
        type: Boolean,
        default: true
    },
    inputStyles: {
        type: String,
        default: ""
    },
    onCompleted: {
        type: Function,
        default: () => { }
    }
});
const inputName = ref(newGuid());

const data = ref(unref(props.modelValue))
const back = (e: any, index: number) => {
    if (e.key == 'Backspace') {
        if (!data.value[index] || data.value[index] == " ") {
            document.getElementsByName(inputName.value)[index - 1]?.focus()
            data.value = data.value.substring(0, index - 1);
        } else if (data.value[index]) {
            data.value = replaceAt(data.value, index, " ");
        }
    }
    else if (e.key == "Enter" || e.key == "Alt" || e.key == "Control") {
        return;
    }
    else if (data.value[index] && data.value.length < props.length) {
        data.value += e.key;
        document.getElementsByName(inputName.value)[index + 1]?.focus()
    } else if (data.value[index]) {
        data.value = replaceAt(data.value, index, e.key);
    }
}
const focusInput = () => {
    var currentIndex = data.value.length;
    if (currentIndex < 0)
        currentIndex = 0;
    document.getElementsByName(inputName.value)[currentIndex]?.focus()

}
const dataChanged = (e: any, index: number) => {
    if (e.data?.length) {
        if (data.value[index] == " ") {
            data.value = replaceAt(data.value, index, e.data)
        } else if (data.value[index]) {
            data.value = replaceAt(data.value, index, e.data)
        }
        else {
            data.value += e.data;
        }
        document.getElementsByName(inputName.value)[index + 1]?.focus()
    }
}

const emit = defineEmits(['update:modelValue']);
const calledFunction = ref(false);
watch(data, (val) => {

    emit('update:modelValue', val);
    if (data.value.length == props.length && calledFunction.value == false) {
        props.onCompleted();
        calledFunction.value = true;
    }

});
watch(() => props.modelValue, (val) => {
    data.value = val;
})
</script>
<style lang="scss" scoped>
@media screen and (max-width:460px) {
    .step__wrapper input {
        width: 55px !important;
        height: 55px !important;
    }

    .loading {
        width: 55px !important;
        height: 55px !important;
    }

}

.loading {
    width: 72px;
    height: 72px;
}

.step__wrapper {
    justify-content: space-around;
    display: flex;
    gap: 1rem;
    direction: ltr;
}

input {
    border: 2px solid var(--color-gray-300);
    background: var(--color-white);
    border-radius: 8px;
    width: 72px;
    height: 72px;
    text-align: center;
    color: var(--color-black);

    &:focus {
        border-color: var(--color-blue) !important;
    }

    &.has__Data {
        border-color: #ACD4FF;
    }

    &.disabled {
        background: var(--color-gray-300);
        cursor: default;

        &:focus {
            border-color: transparent !important;
        }

        font-size: 0 !important;
    }
}
</style>