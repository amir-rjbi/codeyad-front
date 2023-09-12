<template>
    <section class="section flex flex-col gap-6 mb-[70px] pt-16 container" id="sections">
        <p class="text-black text-h5 font-bold">سرفصل های ودره</p>
        <BaseCollapse bg-white title="طراحی گرافیک" class="">
            <template #icon>
                <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.4517 16.543C8.82338 16.543 9.15376 16.4191 9.40155 16.1713C9.93842 15.6757 9.93842 14.8085 9.40155 14.3129L3.74376 8.61381L9.40155 2.95602C9.93842 2.46045 9.93842 1.5932 9.40155 1.09763C8.90597 0.560756 8.03872 0.560756 7.54315 1.09763L0.935517 7.70526C0.398646 8.20083 0.398646 9.06808 0.935517 9.56366L7.54315 16.1713C7.79094 16.4191 8.12132 16.543 8.4517 16.543Z"
                        fill="#080808" />
                </svg>
            </template>
            <div class="episodes">
                <ul>
                    <li class="text-black flex justify-between items-center" v-for="item in [1, 2, 3]">
                        <p>آموزش Docker - قسمت اول</p>
                        <div class="flex gap-4">
                            <span class="text-blue">منتشر شده</span>
                            <span>00:36:20</span>
                        </div>
                    </li>
                </ul>
            </div>
        </BaseCollapse>
    </section>
</template>
<style scoped lang="scss">
ul {
    li {
        margin-bottom: 1.5rem;

        &:last-child {
            margin-bottom: 0;
        }

        p {
            display: flex;
            align-items: center;
            gap: 1rem;

            &::before {
                content: " ";
                width: 4px;
                height: 4px;
                background: var(--color-black);
                border-radius: 50%;
            }
        }
    }
}
</style>