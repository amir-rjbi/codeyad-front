<template>
  <div class="min-w-[500px] sm:!w-full flex flex-col gap-4">
    <template v-if="order?.isFinally">

      <nuxt-link class="text-h7" :to="`/course/panel-${item.courseId}`" :key="item.id"
        v-for="item in order?.orderDetails">
        -- {{
          item.courseTitle
        }}</nuxt-link>
    </template>
    <template v-else>
      <p class="text-h7 text-gray-400" :key="item.id" v-for="item in order?.orderDetails">
        -- {{
          item.courseTitle
        }}</p>
      <div class="flex justify-end">
        <BaseButton :render-button-tag="false" @click="$emit('closeModal')" color="green" to="/cart">پرداخت سفارش
        </BaseButton>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  order: Order | null
}>();
</script>
