<template>
    <div id="tabs" :class="tabClass">
        <slot name="tabs" />
    </div>
</template>

<script setup>

var sections = {};
defineProps({
    tabClass: {
        default: "",
        type: String
    }
})

onMounted(() => {
    setTimeout(() => {
        var section = document.querySelectorAll(".section"); +

            section.forEach(function (e) {
                Object.assign(sections, { [e.id]: [e.offsetTop] })
            });
        console.log(sections);

        window.addEventListener('scroll', spy)
    }, 500);
});
onUnmounted(() => {
    window.removeEventListener('scroll', spy)
})
const spy = () => {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    var i = 0;
    for (i in sections) {
        if (sections[i] <= scrollPosition + 65) {

            document.querySelector('.active').setAttribute('class', ' ');
            document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active');
        }
    }
}
</script>