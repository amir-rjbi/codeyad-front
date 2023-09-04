<template>
    <div>
        <TheHeader :show-categories="false"/>
        <div >
            <slot />
        </div>
        <TheFooter />
    </div>
</template>