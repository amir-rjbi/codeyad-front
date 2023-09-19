<template>
  <div class="mt-3">
    <div class="flex items-center gap-4 justify-between flex-wrap">
      <div class="flex items-center gap-4 sm:flex-wrap">
        <p class="text-h6 sm:!text-h7">
          موجودی کیف پول : <b class="text-green-500">{{ userWalletAmount.toLocaleString() }} تومان</b>
        </p>
        <label class="sm:hidden">|</label>
        <p class="text-h6 sm:!text-h7">
          موجودی کیف پول ارزی : <b class="text-green-500">{{userCryptoWalletAmount}}$</b>
        </p>
      </div>
      <BaseButton color="green" @click="(isOpenModal = true)">شارژ کیف پول</BaseButton>
    </div>
    <div class="table-responsive mt-4 shadow-md">
      <table>
        <thead>
          <tr>
            <th>مبلغ</th>
            <th>مبلغ ارزی</th>
            <th>نوع</th>
            <th>تاریخ</th>
            <th>توضیحات</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loading Skeleton -->
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
            </tr>
          </template>

          <!-- Data Table -->
          <template v-else-if="wallets?.length > 0">
            <tr v-for="wallet in wallets">
              <td>{{wallet.amount.toLocaleString()}} تومان</td>
              <td>${{wallet.cryptoAmount}}</td>
              <td>
                <b class="text-green">{{ wallet.walletType }}</b>
              </td>
              <td v-if="wallet.isFinally">{{ wallet.paymentDate.toLocaleDateString('fa') }}</td>
              <td>
                {{wallet.description}}
              </td>
            </tr>
          </template>

          <!-- No Data -->
          <template v-else>
            <tr>
              <td colspan="5">اطلاعاتی وجود ندارد</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <BaseModal title="شارژ کیف پول" v-model="isOpenModal" :mobile-header="true" size="sm">
      <account-wallet-add />
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
import {GetWallets} from "../../services/wallet.service";
import {WalletDto} from "../../models/wallets/WalletFilterResult";

definePageMeta({
  layout: "account",
});
const loading = ref(false);
const isOpenModal = ref(false);
const wallets = ref<WalletDto[]>();
const userWalletAmount = ref(0)
const userCryptoWalletAmount = ref(0)

const pageId = ref(1);
watch(pageId,async (val)=>await getData())

onMounted(async ()=>{
  await getData();
})

const getData= async ()=>{
  loading.value = true;
  const fetchResult = await GetWallets(pageId.value);
  if(fetchResult.isSuccess) {
    wallets.value = fetchResult.data?.wallets;
    userWalletAmount.value = fetchResult.data?.userWalletAmount;
    userCryptoWalletAmount.value = fetchResult.data?.userCryptoWalletAmount;
  }

  console.log(fetchResult);
  loading.value = false;
}
</script>
