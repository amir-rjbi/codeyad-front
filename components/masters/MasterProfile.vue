<template>
    <div class="mb-[70px]">
        <div class="bg-blue text-white w-full py-[80px] sm:py-[40px]">
            <BaseModal v-model="isOpenModal" :title="`ارسال پیام به ${teacherData.teacher.fullName}`">
                <Form @submit="sendMessage" :validation-schema="schema" v-slot="{ meta }"
                    class="min-w-[500px] sm:min-w-fit">
                    <BaseInput v-model="sendMessageData.title" out-line name="title" label="عنوان گفتوگو" />
                    <BaseTextArea v-model="sendMessageData.message" out-line class="mt-4 mb-4" name="description"
                        label="متن پیام" />
                    <div class="flex justify-end">
                        <BaseButton :loading="sendMessageLoading" :disabled="!meta.valid">
                            <span v-if="authStore.isLogin">ارسال پیام</span>
                            <span v-else>ورود به حساب و ارسال پیام</span>
                        </BaseButton>
                    </div>
                </Form>
            </BaseModal>
            <div class="container">
                <div class="flex gap-10 sm:flex-wrap sm:gap-5 items-end">
                    <div class="w-[40%] h-[370px] sm:h-[280px] sm:w-[100%]">
                        <BaseImg :src="GetUserAvatar(teacherData.teacher.imageName)" :alt="teacherData.teacher.fullName"
                            class=" rounded-[10px] w-full h-full" fit="contain" height="600px" width="600px" />
                    </div>

                    <div class="info flex gap-[18px] flex-col w-[55%] sm:w-full">
                        <h1 class="text-h3 sm:text-h4">
                            {{ teacherData.teacher.fullName }}
                        </h1>
                        <div class="text-h7 t-about" v-html="teacherData.teacher.aboutMe"></div>
                        <div class="flex gap-7 sm:flex-wrap sm:justify-center">
                            <div class="flex gap-[10px] items-center">
                                <p>تاریخ عضویت: {{ toPersianDate(new Date(teacherData.teacher.creationDate)) }}</p>
                                <IconsCalender color="white" width="24" height="24" />
                            </div>
                            <div class="flex gap-[10px] items-center">
                                <p class="flex items-center  gap-1"> دوره ها:
                                    <BaseSkeletonLoaidng v-if="loading" height="10px" width="15px" />
                                    <span v-else>{{ courseFilterData?.entityCount }}</span>
                                </p>
                                <IconsTime color="white " width="24" height="24" />
                            </div>
                            <div class="flex gap-[10px] items-center">
                                <p>{{ teacherData.teacher.studentsCount.toLocaleString() }} دانشجو</p>
                                <IconsUsers color="white" width="24" height="24" />
                            </div>
                        </div>
                        <div class="flex justify-between items-center mt-4">
                            <h3 class="text-h4 sm:text-h6">شبکه های اجتماعی</h3>
                            <div class="flex gap-5">
                                <a :href="teacherData.teacher.socialNetworks.linkeDin"
                                    v-if="teacherData.teacher.socialNetworks.linkeDin">
                                    <BaseImg src="static/images/icons/linkdin.png" alt="linkdin" />
                                </a>
                                <a :href="teacherData.teacher.socialNetworks.instagram"
                                    v-if="teacherData.teacher.socialNetworks.instagram">
                                    <BaseImg src="static/images/icons/instagram.png" alt="instagram" />
                                </a>
                            </div>
                        </div>
                        <div class="flex gap-5 mt-2 sm:gap-3">
                            <BaseButton :loading="buttonLoading" v-if="teacherData.isFollow == false"
                                :disabled="teacherData.teacher.userId == accountStore.currentUser?.id" color="green"
                                class="flex-grow text-[18px] sm:text-[14px]" @click="toggleFollow">دنبال کردن</BaseButton>
                            <BaseButton :loading="buttonLoading" v-else
                                :disabled="teacherData.teacher.userId == accountStore.currentUser?.id" color="red"
                                class="flex-grow text-[18px] sm:text-[14px]" @click="toggleFollow">لغو دنبال
                                کردن
                            </BaseButton>
                            <BaseButton @click="() => isOpenModal = true"
                                :disabled="teacherData.teacher.userId == accountStore.currentUser?.id" :color-white="true"
                                class="flex-grow text-[18px] sm:text-[14px]">ارسال پیام
                            </BaseButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-14 sm:mt-6">
            <h4 class="text-black font-bold text-h3 sm:text-h4">دوره ها</h4>
            <div class="course-wrapper mt-4  flex gap-[18px] xl:gap-[15px] md:!gap-3  flex-wrap md:justify-between">
                <template v-if="loading">
                    <BaseSkeletonLoaidng parent-class="w-[24%]  lg:!w-[31.6%] " height="314px" v-for="item in [1, 2, 3, 4]"
                        :key="item" />
                </template>
                <template v-else>
                    <CoursesCard class="w-[24%]  lg:!w-[31.6%] " v-for="item in courseFilterData?.data ?? []" :key="item.id"
                        :item="item" />
                </template>

            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { FilterResult } from '~/models/IApiResponse';
import { CourseFilterData } from '~/models/courses/CourseFilterData';
import { FollowTeacher, GetMasterByUserName, GetMasterCourses, UnFollowTeacher } from '~/services/master.service';
import { useAccountStore } from '~/stores/account.store';
import { useAuthStore } from '~/stores/auth.store';
import * as Yup from 'yup'
import { Form } from 'vee-validate';
import { CreateMessage } from '~/services/userMessages.service';
import { SingeMasterData } from '~/models/masters/Master';

const schema = Yup.object().shape({
    title: Yup.string().required().label('عنوان گفتوگو'),
    description: Yup.string().required().min(10).label("متن پیام")
})
const accountStore = useAccountStore();
const authStore = useAuthStore();

const isOpenModal = ref(false);
const toast = useToast();
const route = useRoute();
const router = useRouter();
const sendMessageData = reactive({
    title: "",
    message: ""
})
const courseFilterData: Ref<FilterResult<CourseFilterData> | null> = ref(null);
const loading = ref(false);
const buttonLoading = ref(false);
const { teacherData } = defineProps<{
    teacherData: SingeMasterData
}>();
const sendMessageLoading = ref(false);
const sendMessage = async () => {
    if (authStore.isLogin == false) {
        authStore.openLoginModal(sendMessage);
        return;
    }
    sendMessageLoading.value = true;
    var res = await CreateMessage(teacherData.teacher.userName, sendMessageData.title, sendMessageData.message);
    if (res.isSuccess) {
        toast.showToast("پیام با موفقیت برای " + teacherData.teacher.fullName + " ارسال شد")
        router.push('/account/messages/show?messageId=' + res.data)

    }
    isOpenModal.value = false;
    sendMessageLoading.value = false;
}
onMounted(async () => {
    loading.value = true;
    var res = await GetMasterCourses(teacherData.teacher.userId);
    if (res.isSuccess && res.data) {
        courseFilterData.value = res.data!;
    }
    loading.value = false;

});
const toggleFollow = async () => {
    if (authStore.isLogin == false) {
        authStore.openLoginModal(toggleFollow);
        return;
    }
    buttonLoading.value = true;
    if (teacherData.isFollow) {
        var res = await UnFollowTeacher(teacherData.teacher.userName);
        if (res.isSuccess) {
            toast.showToast("عملیات با موفقیت انجام شد")
            teacherData.isFollow = false;
        }
    } else {
        var res = await FollowTeacher(teacherData.teacher.userName);
        if (res.isSuccess) {
            toast.showToast("عملیات با موفقیت انجام شد")
            teacherData.isFollow = true;
        }
    }
    buttonLoading.value = false;

}
</script>
<style >
.t-about a:hover {
    @apply text-blue-400
}
</style>