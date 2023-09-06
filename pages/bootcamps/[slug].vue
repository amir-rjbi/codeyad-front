<template>
    <div class="relative">
        <div class="text-banner">
            <p class="sm:text-h7">"کدنویسی، هنری برای خلق دنیای بهتر"</p>
        </div>
        <header class="main !sticky top-0 ">
            <div class="container py-7">
                <div class="flex justify-between">
                    <NuxtLink to="/"><img src="/logo.png" class="w-[162px] h-[45px]" alt="logo" /></NuxtLink>
                    <nav class="links flex sm:hidden gap-[56px]">
                        <a href="#" class="text-black text-[16px] font-medium">معرفی دوره</a>
                        <a href="#" class="text-black text-[16px] font-medium">منتورهای دوره</a>
                        <a href="#" class="text-black text-[16px] font-medium">منتورهای دوره</a>
                        <a href="#" class="text-black text-[16px] font-medium">سرفصل های دوره</a>
                        <a href="#" class="text-black text-[16px] font-medium">سواالات متداول</a>
                    </nav>
                    <BaseButton class="px-6">ثبت نام بوت کمپ </BaseButton>
                </div>
            </div>
        </header>
        <main>
            <div class="intro py-[67px] text-white text-center d-flex justify-center items-center">
                <h1 class="text-h3 font-bold mb-8">بوت کمپ طراحی گرافیک</h1>
                <p class="text-h5 font-normal w-[50%] m-auto">
                    کدیاد اولین برگزار کننده بوت کمپ طراحی سایت در ایران هستش که بر روی درآمدزایی ، مهارت های نرم ،اصول
                    مذاکره و آموزش و طراحی قالب برای فروش در مارکت های راستچین و ژاکت است
                </p>
                <div class="flex flex-col gap-10 justify-center items-center mt-20">
                    <p class="text-h4 font-bold">طراح گرافیک شوید</p>
                    <BaseButton color="orange" class="text-h5">ثبت نام بوت کمپ</BaseButton>
                </div>
            </div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quas deserunt nisi dolorum
                doloremque
                sapiente, veritatis quam maiores repellendus corporis. Cupiditate doloribus consequuntur in quisquam ducimus
                maiores nisi excepturi quia?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quas deserunt nisi dolorum
                doloremque
                sapiente, veritatis quam maiores repellendus corporis. Cupiditate doloribus consequuntur in quisquam ducimus
                maiores nisi excepturi quia?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quas deserunt nisi dolorum
                doloremque
                sapiente, veritatis quam maiores repellendus corporis. Cupiditate doloribus consequuntur in quisquam ducimus
                maiores nisi excepturi quia?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quas deserunt nisi dolorum
                doloremque
                sapiente, veritatis quam maiores repellendus corporis. Cupiditate doloribus consequuntur in quisquam ducimus
                maiores nisi excepturi quia?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quas deserunt nisi dolorum
                doloremque
                sapiente, veritatis quam maiores repellendus corporis. Cupiditate doloribus consequuntur in quisquam ducimus
                maiores nisi excepturi quia?
            </p>
        </main>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: "empty"
})
</script>
<style scoped lang="scss">
header {
    background: #EEF4FB;
    z-index: 5;
}

main {
    .intro {
        position: relative;
        overflow: hidden;

        &::after {
            background: rgba(40, 107, 184, 0.80);
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            content: " ";
            z-index: -1;
        }

        &::before {
            content: " ";
            background: url('/images/bootcamp-bg.png') no-repeat;
            background-size: cover;
            background-position: center;
            width: 100%;
            height: 100%;
            position: absolute;
            top: -0%;
            right: 0;
            z-index: -2;
        }
    }
}
</style>