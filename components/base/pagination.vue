<template>
    <!-- <nav aria-label="Page navigation example" v-if="filterResult && filterResult.pageCount > 1"> -->
    <nav aria-label="Page navigation example">
        <ul class="inline-flex -space-x-px  h-10">
            <li :class="{ 'card-loading': modelValue == 1 }" @click="prevPage()">
                <a href="#"
                    class="flex items-center justify-center px-3 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">قبلی</a>
            </li>
            <li v-for="item in RangeNumber(filterPaginationResult.startPage, filterPaginationResult.endPage)">
                <a href="#" @click="changePage(item)" aria-current="page" :class="[`flex items-center justify-center px-3 h-10
                     border border-gray-300  
                      dark:border-gray-700  dark:text-white`,
                    {
                        'bg-blue-50 hover:bg-blue-100 hover:text-blue-700 text-blue-600 dark:bg-gray-700':
                            modelValue == item
                    },
                    {
                        'bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-700 dark:bg-gray-800':
                            modelValue != item
                    }]">
                    {{ item }}

                </a>
            </li>

            <li @click="nextPage()" :class="{ 'card-loading': modelValue == filterPaginationResult.pageCount }">
                <a href="#"
                    class="flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">بعدی</a>
            </li>
        </ul>
    </nav>
</template>
<script setup lang="ts">
import { BaseFilterResult } from '~/models/IApiResponse';

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        default: 1,
    },
    filterResult: {
        type: Object
    }
})
var filterPaginationResult = props.filterResult as BaseFilterResult || null

const prevPage = () => {
    if (props.modelValue > 1)
        emit('update:modelValue', props.modelValue - 1)
}
const changePage = (item: number) => {
    emit('update:modelValue', item)

}

const nextPage = () => {
    if (props.modelValue < filterPaginationResult.pageCount)
        emit('update:modelValue', props.modelValue + 1)

}
</script>