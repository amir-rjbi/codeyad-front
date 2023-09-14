<template>
    <div>
        <TheHeader :show-categories="false" />
        <main role="main">
            <slot />
        </main>
        <TheFooter />
    </div>
</template>