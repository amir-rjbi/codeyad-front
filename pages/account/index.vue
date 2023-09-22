<template>
  <div class="flex w-full flex-wrap">
    <div class="w-[50%] sm:w-full p-2">

      <base-button v-if="accountStore.currentUser?.roles.includes('مدرس')==false" :render-button-tag="false" to="/account/registerTeacher" v-tooltip="'ثبت نام به عنوان مدرس'" class="btn btn-success mb-1">همکاری
        با کدیاد</base-button>
      <AccountVerifyPhoneNumber />
      <BaseAlert  :alert-type="'info'" class="my-2" v-if="accountStore.currentUser?.isCompleteProfile == false">
        <div class="flex justify-between w-full items-center">
          کاربر عزیز با تکمیل پروفایل خود کدیاد جم دریافت کنید !
          <BaseButton :render-button-tag="false" to="/account/edit" class="min-w-max" :color-white="true">تکمیل پروفایل
          </BaseButton>
        </div>
      </BaseAlert>

      <div class="card">
        <div class="flex gap-4 mt-2">
          <base-img :src="GetUserAvatar(accountStore.currentUser?.imageName ?? '')" width="200px" alt="avatar"
            class="rounded w-[50px] h-[50px]" />
          <div class="flex flex-col gap-2">
            <p>{{ accountStore.currentUser?.fullName }}</p>
            <div v-html="accountStore.currentUser?.aboutMe"></div>
          </div>
        </div>
        <div class="flex justify-end">
          <BaseButton :render-button-tag="false" to="/account/edit" size="sm">ویرایش اطلاعات</BaseButton>
        </div>
      </div>
    </div>
    <div class="w-[48%] sm:w-full">
      <BaseAlert :alert-type="'success'" class="mt-2">
        کاربر عزیز لطفا شماره تلفن همراه خود را تایید کنید
      </BaseAlert>
      <BaseAlert :alert-type="'warning'" class="mt-2">
        کاربر عزیز لطفا شماره تلفن همراه خود را تایید کنید
      </BaseAlert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '~/stores/account.store';

const accountStore = useAccountStore();
definePageMeta({
  layout: "account",
});

</script>
