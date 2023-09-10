<template>
    <div class="course-card flex flex-col gap-3">
        <div class="course-banner">
            <base-img src="static/images/course.jpg" alt="course" />
        </div>
        <div class="card-content flex gap-3 flex-col w-full">
            <p class="course-title">Ionic React: توسعه موبایل با Ionic 5 آغاز شد</p>
            <div class="details flex justify-between">
                <label>سطح متوسط</label>
                <div class="flex gap-[6px] items-center">
                    <label>301</label>
                    <IconsUser color="var(--color-gray-300)" />
                </div>
                <div class="flex gap-[6px] items-center">
                    <label>8</label>
                    <IconsBook color="var(--color-gray-300)" />
                </div>
            </div>
            <div class="footer flex justify-between items-center">
                <p>850,000 تومان</p>
                <BaseButton :render-button-tag="false" size="md" to="/course/test">
                    <div class="flex items-center gap-[6px]">
                        شروع دوره
                        <IconsArrowLeft color="#fff" />
                    </div>
                </BaseButton>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@media screen and (max-width:768px) {
    .course-card {
        width: 49% !important;
    }
}

@media screen and (max-width:620px) {
    .course-card {
        width: 100% !important;
    }
}

.course-card {
    background: var(--color-white);
    @apply rounded;
    padding: 7.65px;
    padding-bottom: 1rem;
    box-shadow: 0px 3.0602409839630127px 16.066267013549805px 0px rgba(36, 50, 88, 0.11);

    .course-title {
        font-size: 13.77px;
    }

    label {
        font-size: 9.946px;
    }

    img {
        @apply rounded;
        height: 11.47588rem;
        object-fit: cover;
        width: 100%;
    }

    .footer {
        a {
            padding: 7.65px 12.241px !important;
            border-radius: 7.651px;
        }
    }

    a {
        font-size: 10px;
    }
}
</style>