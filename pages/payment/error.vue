<template>
    <div class="container py-20">
        <base-alert alert-type="error">
            <h5>پرداخت ناموفق</h5>
            <p v-if="$route.query.message">{{ $route.query.message }}</p>
        </base-alert>
        <div class="flex justify-center">
            <base-button :render-button-tag="false" to="/" class="mt-12">بازگشت به خانه</base-button>
        </div>
    </div>
</template>
<script setup lang="ts"></script>