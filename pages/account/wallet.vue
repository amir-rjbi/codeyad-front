<template>
  <div class="mt-3">
    <div class="flex items-center gap-4 justify-between flex-wrap">
      <div class="flex items-center gap-4 sm:flex-wrap" v-if="walletsResult">
        <p class="text-h6 sm:!text-h7">
          موجودی کیف پول : <b class="text-green-500">{{ walletsResult.userWalletAmount.toLocaleString() }} تومان</b>
        </p>
        <label class="sm:hidden">|</label>
        <p class="text-h6 sm:!text-h7">
          موجودی کیف پول ارزی : <b class="text-green-500">{{ walletsResult.userCryptoWalletAmount }}$</b>
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
          <template v-else-if="wallets.length > 0">
            <tr v-for="wallet in wallets">
              <td>{{ wallet.amount.toLocaleString() }} تومان</td>
              <td>${{ wallet.cryptoAmount }}</td>
              <td>
                <b class="text-red" v-if="wallet.walletType == WalletType.برداشت">برداشت</b>
                <b class="text-green" v-else>واریز</b>
              </td>
              <td v-if="wallet.isFinally">{{ toPersianDate(new Date(wallet.paymentDate)) }}</td>
              <td>
                {{ wallet.description }}
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
    <div class="w-full flex items-center justify-center mt-4" v-if="walletsResult">
      <base-pagination v-if="!loading" v-model="pageId" :filter-result="walletsResult"></base-pagination>
    </div>
    <BaseModal title="شارژ کیف پول" v-model="isOpenModal" :mobile-header="true" size="sm">
      <account-wallet-add />
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
import { GetWallets } from "../../services/wallet.service";
import { WalletDto, WalletFilterResult, WalletType } from "../../models/wallets/WalletFilterResult";

definePageMeta({
  layout: "account",
});
const loading = ref(false);
const isOpenModal = ref(false);
const wallets: Ref<WalletDto[]> = ref([]);
const walletsResult: Ref<WalletFilterResult | null> = ref(null);
const router = useRouter();
const toast = useToast();

const pageId = ref(1);
watch(pageId, async (val) => await getData())

onMounted(async () => {
  await getData();
  var op = router.currentRoute.value.query.op;
  if (op) {
    if (op.toString() == 'success') {
      router.push('/account/wallet')
      toast.showToast('کیف پول با موفقیت شارژ شد');
    }
  }
})

const getData = async () => {
  loading.value = true;
  const fetchResult = await GetWallets(pageId.value);
  if (fetchResult.isSuccess) {
    wallets.value = fetchResult.data!.wallets;
    walletsResult.value = fetchResult.data ?? null;
  }

  loading.value = false;
}
</script>
