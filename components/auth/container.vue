<template>
    <div>
        <Transition name="layout" mode="out-in">
            <auth-login v-if="authStore.currentStep == 'login'" />
            <auth-register v-else-if="authStore.currentStep == 'register'" />
            <auth-forgot-password v-else-if="authStore.currentStep == 'forgotPassword'" />
            <AuthActivateAccount v-else-if="authStore.currentStep == 'activate'" />
        </Transition>

    </div>
</template>


<script setup>
import { useAuthStore } from '~~/stores/auth.store';

const authStore = useAuthStore();
</script>