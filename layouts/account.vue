<template>
    <div >
        <TheHeader :show-categories="false"/>
        <div class="flex relative sm:flex-col">
            <AccountThetSideBar />
            <div class="container pt-4 pb-4 sm:!pt-1">
                <slot />
            </div>
        </div>
        <TheFooter class=" mt-[90px]"/>
    </div>
</template>

