<template>
    <div class="container py-12 sm:pt-5">
        <h1 class="mb-4 text-h3">سفارش شما</h1>
        <div class="flex gap-4 flex-wrap justify-between mt-5">

            <div class=" sm:bg-transparent flex-grow flex gap-2 flex-col h-fit">
                <div class="item sm:justify-center  bg-white flex sm:gap-3 sm:flex-wrap justify-between items-center shadow border rounded-md p-3 w-full"
                    v-for="item in [1, 2, 3]">
                    <div class="flex gap-2 items-center sm:flex-wrap">
                        <NuxtLink to="/course/test" class="text-blue">آموزش برناه نویسی فول استک php</NuxtLink>
                        <p>مدرس: حسین عنایتی</p>
                    </div>
                    <div class="flex gap-2 items-center">
                        <p>990,000 تومان</p>
                        <BaseButton size="sm" color="red">حذف</BaseButton>
                    </div>
                </div>
            </div>
            <div class="card p-4 w-[30%] flex gap-2 flex-col md:w-[60%] md:m-auto sm:!w-full">
                <div class="flex gap-2 flex-col">
                    <BaseInput name="discount" out-line placeholder="اگر کد تخفیفی دارید اینجا وارد کنید" label="کدتخفیف" />
                    <BaseButton class="w-full">اعمال کد تخفیف</BaseButton>
                </div>
                <hr />
                <p><span>مبلغ کل</span> :1,635,000 تومان </p>
                <p><span>تخفیف</span> : 0 تومان</p>
                <p><span>قابل پرداخت </span> : 1,635,000 تومان</p>
                <p><span>قابل پرداخت ارزی (تتر) </span> : 5$</p>
                <hr />
                <b>نحوه پرداخت</b>
                <div class="my-3 flex gap-4 flex-col">
                    <label class="flex items-center gap-4  font-semibold cursor-pointer">
                        <input type="radio" value="wallet" name="gateway" />
                        کیف پول
                    </label>
                    <label class="flex items-center gap-4 font-semibold cursor-pointer">
                        <input type="radio" value="wallet" name="gateway" />
                        درگاه پرداخت
                    </label>
                </div>
                <BaseButton class="w-full" color="green">پرداخت</BaseButton>
                <BaseButton class="w-full" color="orange">پرداخت با ارز دیجیتال</BaseButton>
            </div>
        </div>
    </div>
</template>