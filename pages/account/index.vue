<template>
  <div>
    <BaseAlert :alert-type="'success'" class="mt-2">
      کاربر عزیز لطفا شماره تلفن همراه خود را تایید کنید
    </BaseAlert>
    <BaseAlert :alert-type="'error'" class="mt-2">
      کاربر عزیز لطفا شماره تلفن همراه خود را تایید کنید
    </BaseAlert>
    <BaseAlert :alert-type="'warning'" class="mt-2">
      کاربر عزیز لطفا شماره تلفن همراه خود را تایید کنید
    </BaseAlert>
    <BaseAlert :alert-type="'info'" class="mt-2">
      کاربر عزیز لطفا شماره تلفن همراه خود را تایید کنید
    </BaseAlert>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "account",
});
</script>
