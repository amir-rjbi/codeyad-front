<template>
    <section class="links justify-between lg:!gap-4 md:flex-wrap ">
        <nuxt-link to="/courses?filter=freeCourse" class="item free md:!max-w-full md:w-full">
            <div class="logo">
                <IconsBoolInMonitor />
            </div>
            <p class="text-blue font-bold">رایگان یاد بگیر</p>
            <p class="text-black">آموزش رایگان برنامه نویسی</p>
        </nuxt-link>
        <nuxt-link to="/roadmap" class="item road-map md:!max-w-full md:w-full">
            <div class="logo">
                <IconsTeacher />
            </div>
            <p class="text-blue font-bold">نقشه راه</p>
            <p class="text-black">چطور برنامه نویس بشی</p>
        </nuxt-link>
        <nuxt-link to="/bootcamps" class="item boot-camp md:!max-w-full md:w-full">
            <div class="logo">
                <IconsBootcamp />
            </div>
            <p class="text-blue font-bold">ثبت نام بوت کمپ</p>
            <p class="text-black">ثبت نام بوت کمپ طراحی سایت</p>
        </nuxt-link>
    </section>
</template>
<style scoped lang="scss">
@media screen and (max-width:1215px) {
    .links {
        a.item {
            max-width: 40%;
        }
    }

}

@media screen and (max-width:1024px) {
    .links {
        margin-top: 120px;
        gap: 6rem !important;

        .item {
            font-size: 17px !important;
            padding-top: 3.98rem !important;
            padding-bottom: 1.95rem !important;

            .logo {
                width: 5.54238rem !important;
                height: 5.54238rem !important;
            }
        }
    }

}

.links {
    display: flex;
    gap: 3.5rem;
    font-size: var(--h5-font-size);

    .item {
        background: var(--color-white);
        position: relative;
        border-radius: 11.542px;
        box-shadow: 16.928325653076172px 20.775671005249023px 24.623018264770508px 0px rgba(160, 160, 160, 0.12);
        flex-grow: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: .3rem;
        padding-top: 4.5rem;
        padding-bottom: 2.37rem;
        max-width: 30%;

        .logo {
            width: 91.041px;
            height: 91.041px;
            border-radius: 50%;
            background: var(--primary-color);
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: -3rem;
            filter: drop-shadow(0.7694693207740784px 3.0778772830963135px 9.23363208770752px rgba(36, 50, 88, 0.40));
        }
    }
}
</style>