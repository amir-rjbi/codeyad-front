<template>
    <div class="container">
        <div class="">
            <BaseSkeletonLoaidng type="three-line" />
        </div>
       
        <base-card class="mt-3 ">
            <template #header>
                <h3>card header</h3>
            </template>
            <div class="flex gap-2 p-2">

                <BaseButton>
                    خوبی
                </BaseButton>
                <BaseButton outline>
                    سلام
                </BaseButton>

                <BaseButton color="red">
                    خوبی
                </BaseButton>
                <BaseButton color="red" outline>
                    خوبی
                </BaseButton>


                <BaseButton color="green">
                    خوبی
                </BaseButton>
                <BaseButton color="green" outline>
                    خوبی
                </BaseButton>
            </div>

            <div class="bg-blue p-3">

                <BaseButton :color-white="true" class="m-2">
                    خوبی
                </BaseButton>
                <BaseButton :color-white="true" outline class="m-2">
                    خوبی
                </BaseButton>
            </div>
            <h1>سلام</h1>
            <h2>سلام 2</h2>
            <p>سلام</p>
        </base-card>
    </div>
</template>
<script setup lang="ts">

onMounted(() => {

})
</script>