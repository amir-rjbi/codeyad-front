<template>
    <base-card class="mt-3 ">
        <template #header>
            <h3>card header</h3>
        </template>
        <div class="flex gap-2 p-2">
            <nuxt-img
                src="test/uploads/BamaImages/VehicleCarImages/9a144757-0bda-4f57-a202-71fdeaa64853/CarImage_638279857293426716_thumb_900_600.jpeg"
                width="210"  style="height:116px ;" height="116"/>
            <img src="https://cdn.bama.ir/uploads/BamaImages/VehicleCarImages/9a144757-0bda-4f57-a202-71fdeaa64853/CarImage_638279857293426716_thumb_900_600.jpeg"
                width="320" fit="fill" />
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
</template>
<script setup lang="ts">
</script>