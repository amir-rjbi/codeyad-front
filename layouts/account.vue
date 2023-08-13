<template>
    <div >
        <TheHeader />
        <div class="flex relative">
            <AccountThetSideBar />
            <div class="container pt-4 pb-4">
                <slot />
            </div>
        </div>
        <TheFooter />
    </div>
</template>

