<template>
  <div>
    <BaseButton class="relative" color="red">
      <IconsTrash class="absolute right-6" />
      حذف همه</BaseButton
    >
    <div class="notifications py-6">
      <BaseCollapse
        title="آموزش رایگان"
        bg-white
        v-for="item in [1, 2, 3]"
        :class="['mb-4', { new: item == 2 }]"
        :key="item"
      >
        <p>محتوادی نوتیفیکیشن</p></BaseCollapse
      >
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "account",
});
</script>
<style scoped lang="scss">
.new {
  position: relative;
  border: 1px solid var(--color-error) !important;
}
</style>
