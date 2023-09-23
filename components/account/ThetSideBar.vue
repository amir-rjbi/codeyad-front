<template>
  <aside class="account-aside sm:!w-full">
    <ul class="sm:flex sm:overflow-auto sm:hide-scroll-track sm:h-fit">
      <li>
        <nuxt-link to="/account#a_content">داشبورد</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/account/edit#a_content">ویرایش حساب</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/account/change-password#a_content"> تغییرکلمه عبور </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/account/wallet#a_content"> کیف پول </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/account/notifications#a_content"> اعلانات
          <span class="text-white font-bold text-h9 px-2 rounded-[4px] bg-red"
            v-if="accountStore.newAlertsCount?.newNotificationsCount ?? 0 > 0">{{
              accountStore.newAlertsCount?.newNotificationsCount }}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/account/messages#a_content"> گفتوگو ها
          <span class="text-white font-bold text-h9 px-2 rounded-[4px] bg-red"
            v-if="accountStore.newAlertsCount?.newMessagesCount ?? 0 > 0">{{
              accountStore.newAlertsCount?.newMessagesCount }}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/account/tickets#a_content"> تیکت ها </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/account/orders#a_content"> فاکتور ها </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/account/my-courses"> دوره های من </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/account/my-bootcamps#a_content"> بوتکمپ های من </nuxt-link>
      </li>
      <template v-if="accountStore.userHasTeacherRole">
        <li>
          <nuxt-link to="/account/cards#a_content"> کارت های بانکی </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/account/withdrawals#a_content"> برداشت از حساب </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/account/courses#a_content"> دوره های مدرس </nuxt-link>
        </li>
      </template>
    </ul>
  </aside>
</template>
<script setup lang="ts">
import { useAccountStore } from '~/stores/account.store';

const accountStore = useAccountStore();
</script>
<style scoped lang="scss">
@media screen and (max-width: 768px) {
  aside {
    position: initial !important;

    ul {
      flex-direction: column;
      margin-bottom: 1rem;

      &::-webkit-scrollbar {
        height: 2px;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--color-blue-gray-400);
      }
    }
  }
}

aside {
  background: rgba(193, 222, 255, 0.22);
  width: 20%;
  height: 100%;
  position: sticky;
  top: 0;
  @apply shadow-sm;

  ul {
    li {
      width: 100%;

      a {
        width: 100%;
        padding: 1rem 2rem;
        display: block;

        &.router-link-exact-active {
          @apply bg-blue text-white;

          &:hover {
            @apply bg-blue text-white;
            opacity: 0.9;
          }
        }

        &:hover {
          background: var(--color-blue-gray-050);
        }
      }
    }
  }
}
</style>
