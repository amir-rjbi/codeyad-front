<template>
  <div class="mt-3">
    <div class="flex items-center gap-4 justify-between flex-wrap">
      <div class="flex items-center gap-4 sm:flex-wrap">
        <p class="text-h6 sm:!text-h7">گفتگو ها</p>
      </div>
    </div>
    <div class="table-responsive mt-4 shadow-md">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>عنوان</th>
            <th>وضعیت</th>
            <th>تاریخ ثبت</th>
            <th>تعداد گفتوگو</th>
            <th>گیرنده / فرستنده</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <tr c v-for="item in [1, 2, 3]">
              <td width="140">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="140">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="150">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="160">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td>
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td>
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td>
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td>390,000 تومان</td>
              <td>$0.00</td>
              <td>
                <b class="text-green">واریز</b>
              </td>
              <td>1402/06/13</td>
              <td>1402/06/13</td>
              <td>1402/06/13</td>
              <td class="flex justify-center">
                <BaseButton @click="router.push('/account/messages/edit')"
                  >نمایش</BaseButton
                >
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();
definePageMeta({
  layout: "account",
});
const loading = ref(false);
</script>
