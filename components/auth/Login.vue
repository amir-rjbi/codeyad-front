<template>
    <div>
        <h5 class="text-blue font-bold text-2xl">ورود به حساب کاربری</h5>
        <Form class="mt-10">
            <base-input name="phoneNumber" number label="شماره تلفن" placeholder="093511100156" />
            <base-input-password name="password" placeholder="**************" class="mt-4 mb-2" label="رمز عبور" />
            <nuxt-link to="/" class="text-blue ">کلمه عبور خود را فراموش کرده اید؟</nuxt-link>
        </Form>
        <base-button class="w-full mt-9" size="lg">ورود</base-button>
        <base-line-text class="text-xl my-8">
            یا
        </base-line-text>
        <base-button class="w-full mt-9 font-bold" transparent>
            <template #icon>
                <IconsGoogle width="40" height="40" />
            </template>
            ورود با گوگل
        </base-button>

        <div class="flex gap-4 items-center justify-center mt-6">
            <p class="m-0">حساب کاربری ندارید ؟ </p><button class="text-blue font-bold">ثبت نام</button>
        </div>
    </div>
</template>