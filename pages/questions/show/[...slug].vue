<template>
    <div class="container py-4">

        <BaseSeoData :meta="{
            indexPage: true,
            metaTitle: question.subject,
            metaDescription: removeHtmlTagsFromString(question.text).substring(0, 255),
            metaKeyWords: question.subject
        }">
        </BaseSeoData>
        <BaseBreadCrumb :items="[
            {
                title: 'خانه',
                link: '/',
                isActive: false
            },
            {
                title: 'پرسش و پاسخ',
                link: '/questions',
                isActive: false
            },
            {
                title: question.subject,
                isActive: true
            }
        ]
            " />
        <div class="flex justify-between my-8 md:flex-wrap relative md:gap-6">
            <div class="w-[30%] md:!w-full sticky top-2 h-fit md:!relative">
                <BlogPopularArticles />
            </div>
            <div class="w-[65%]   md:!w-full">
                <BaseButton v-if="accountStore.currentUser?.id == question.user.id" @click="openDeleteQustionPopup = true"
                    color="red" class="w-full mb-2">حذف پرسش</BaseButton>
                <template v-if="pending">
                    <BaseSkeletonLoaidng height="200px" />
                    <div class="card-body">
                        <BaseSkeletonLoaidng height="100px" />
                        <BaseSkeletonLoaidng height="100px" class="mt-2" />
                    </div>
                </template>
                <div class="card py-4" v-else>
                    <div class="flex justify-between sm:flex-wrap items-center gap-3">
                        <h1 class="text-h4 sm:text-h5 ">{{ question.subject }}</h1>
                        <div class="flex items-center flex-col gap-2">
                            <BaseButton class="items-center justify-center" @click="isOpenModal = true">
                                سوالتو بپرس
                            </BaseButton>
                        </div>
                    </div>
                    <div class="flex gap-4 flex-wrap text-h8 mt-2">
                        <p>سوال شده توسط: <b>{{ question.user.fullName }}</b></p>
                        <p>تاریخ ثبت: <b>{{ toPersianDate(new Date(question.createDate)) }}</b></p>
                        <p>بازدید: <b>{{ question.visit.toLocaleString() }}</b></p>
                        <p>پاسخ: <b>{{ question.questionMessages.length }}</b></p>
                        <p class="flex gap-2 items-center">تگ: <nuxt-link class="text-blue font-bold text-h7"
                                :to="`/questions?category=${question.category.slug}`">{{ question.category.categoryTitle
                                }}</nuxt-link></p>



                    </div>
                    <hr class="mt-2" />
                    <div class="flex pt-6 flex-col  mt-4">
                        <div v-html="question.text"></div>
                        <div class="flex justify-end mt-2" v-if="question.attachedFile">
                            <a target="_blank" :href="`${DL_DOMAIN_URL}/questions/attachments/${question.attachedFile}`"
                                class="text-blue font-semibold flex gap-2 items-center">
                                <IconsAttachment color="var(--primary-color)" />
                                دریافت فایل ضمیمه
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card-body sm:p-0 sm:mt-8" v-if="pending == false">
                    <div v-if="question.questionMessages.length > 0">
                        <h5 class="mb-2">پاسخ ها</h5>
                        <div class="flex flex-col pr-8 sm:pr-5">
                            <div :class="[`question-item mb-4 rounded border-2  bg-white
                      p-2 `, { 'selected': item.isBestAnswer }]
                                " v-for=" item  in  orderBy(question.questionMessages, 'creationDate', 'asc') ">
                                <div class="flex gap-4 items-start">
                                    <base-img :src="GetUserAvatar(item.user.imageName)" class="rounded" alt="user"
                                        width="62px" height="62px" />
                                    <div class="flex flex-col gap-2 flex-grow">
                                        <p class="text-black text-h6">{{ item.user.fullName }}</p>
                                        <div v-html="item.message"></div>
                                        <div :class="['flex mt-2 w-full', { 'justify-between': item.attachedFile },
                                            { 'justify-end': !item.attachedFile }
                                        ]
                                            ">
                                            <a v-if="item.attachedFile" target="_blank"
                                                :href="`${DL_DOMAIN_URL}/questions/attachments/${question.attachedFile}`"
                                                class="text-blue font-semibold flex gap-2 items-center">
                                                <IconsAttachment color="var(--primary-color)" />
                                                دریافت فایل ضمیمه
                                            </a>
                                            <label class="text-h9 font-semibold text-blue">{{ getPersianDate(new
                                                Date(item.creationDate), "M/dd/D")
                                            }} - {{ GetTime(new Date(item.creationDate)) }}</label>

                                        </div>
                                    </div>
                                </div>
                                <div class="footer mt-2"
                                    v-if="item.user.id == accountStore.currentUser?.id || (question.user.id == accountStore.currentUser?.id && isCompleted == false)">
                                    <hr />
                                    <div class="flex justify-end gap-2 p-2">
                                        <BaseButton @click="deleteMessagePopup(item.id)" color="red" size="sm"
                                            v-if="item.user.id == accountStore.currentUser?.id">
                                            حذف</BaseButton>
                                        <BaseButton size="sm" color="green" @click="acceptMessagePopup(item.id)"
                                            v-if="isCompleted == false && question.user.id == accountStore.currentUser?.id">
                                            پاسخ
                                            صحیح
                                        </BaseButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p v-if="authStore.isLogin == false" class="w-full mt-4">برای ثبت پاسخ باید <button
                            @click="authStore.openLoginModal" class="text-blue font-bold">وارد حساب کاربری</button> خود شوید
                    </p>
                    <Form @submit="sendAnswer" :validation-schema="schema"
                        :class="['mt-4 flex gap-4 card justify-end flex-col items-end w-full', { 'card-loading': accountStore.currentUser == null || sendAnswerLoading }]">
                        <BaseHtmlEditor v-model="answerText" name="answer"
                            placeholder="اگر برای پرسش بالا پاسخی دارید لطفا اینجا وارد کنید" id="desc" class="w-full" />
                        <div class="flex justify-between w-full items-end flex-wrap">
                            <BaseInputFile name="attach" out-line label="فایل ضمیمه" />
                            <BaseButton :loading="sendAnswerLoading" class="sm:mt-4 sm:w-full sm:!py-3" size="lg">ثبت پاسخ
                            </BaseButton>
                        </div>
                    </Form>

                </div>
            </div>

        </div>

        <BaseModal title="پرسش سوال جدید" v-model="isOpenModal">
            <questions-add @close-modal="() => isOpenModal = false" />
        </BaseModal>
        <BaseConfirmPopup :confirm-function="deleteMessage" v-model="openDeletePopup" />
        <BaseConfirmPopup description="آیا از حذف پرسش اطمینان دارید ؟" :confirm-function="deleteQuestion"
            v-model="openDeleteQustionPopup" />
        <BaseConfirmPopup is-question-icon title="تایید پاسخ صحیح" description="آیا از تایید پاسخ اطمینان دارید ؟"
            :confirm-function="acceptMessage" v-model="openAcceptPopup" />
    </div>
</template>
<script setup lang="ts">
//@ts-ignore
import orderBy from "lodash/orderBy"
import { GetQuestionById, SendQuestionAnswer, DeleteQuestion, DeleteQuestionMessage, AcceptQuestionMessage } from '~/services/questions.service';
import { useAccountStore } from '~/stores/account.store';
import { DL_DOMAIN_URL } from '~/utils/api.config';
import { useAuthStore } from '~/stores/auth.store';
import { Form } from 'vee-validate';
import * as Yup from 'yup'
import { QuestionDto } from '~/models/Question';

const openDeletePopup = ref(false);
const openDeleteQustionPopup = ref(false);
const openAcceptPopup = ref(false);
const toast = useToast();
const accountStore = useAccountStore();
const authStore = useAuthStore();
const route = useRoute();
const questionId = route.params.slug[0];
const { data, pending, refresh } = await useAsyncData("getSingleQuestion", () => GetQuestionById(questionId));
if (!data.value?.data) {
    throw createError({ statusCode: 404, message: 'not found' })
}
const schema = Yup.object().shape({
    answer: Yup.string().required().label('متن پاسخ')
})
const question = ref(data.value!.data)
const isOpenModal = ref(false);
const isCompleted = question.value.questionMessages.filter(f => f.isBestAnswer == true).length == 1;
const sendAnswerLoading = ref(false);
const answerText = ref("");
const selectedMessage = ref(0);
const router = useRouter();
watch(data, () => {
    if (data.value?.data)
        question.value = data.value!.data;
})
useHead({
    title: question.value.subject ?? 'پرسش و پاسخ',
    script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js' }
    ],
    link: [
        {
            href: '/ckeditor4/ckeditor/plugins/codesnippet/lib/highlight/styles/default.css',
            rel: "stylesheet"
        }
    ]

})

const deleteQuestion = async () => {
    var res = await DeleteQuestion(Number(questionId));
    if (res.isSuccess) {
        openDeletePopup.value = false;
        toast.showToast("پرسش با موفقیت حذف شد")
        router.push('/questions')
        selectedMessage.value = 0;
    }
}
const deleteMessage = async () => {
    var res = await DeleteQuestionMessage(Number(questionId), selectedMessage.value);
    if (res.isSuccess) {
        openDeletePopup.value = false;
        toast.showToast("پیام با موفقیت حذف شد")
        question.value.questionMessages = question.value.questionMessages.filter(f => f.id != selectedMessage.value);
        selectedMessage.value = 0;
    }
}
const acceptMessage = async () => {
    var res = await AcceptQuestionMessage(Number(questionId), selectedMessage.value);
    if (res.isSuccess) {
        openAcceptPopup.value = false;
        toast.showToast("پیام با موفقیت تایید شد")
        question.value.questionMessages.find(f => f.id == selectedMessage.value)!.isBestAnswer = true;
        selectedMessage.value = 0;
    }
}
const acceptMessagePopup = (id: number) => {
    selectedMessage.value = id;
    openAcceptPopup.value = true;
}
const deleteMessagePopup = (id: number) => {
    selectedMessage.value = id;
    openDeletePopup.value = true;
}
onMounted(() => {
    setTimeout(() => {
        //@ts-ignore
        hljs.highlightAll();
    }, 500);
})
watch(pending, () => {
    setTimeout(() => {
        //@ts-ignore
        hljs.highlightAll();
    }, 500);
})
const sendAnswer = async (fData: any, event: any) => {
    sendAnswerLoading.value = true;
    var formData = new FormData();
    formData.append("QuestionId", questionId)
    formData.append("Message", answerText.value)
    if (fData.attach) {
        formData.append("Attachment", fData.attach)
    }
    var res = await SendQuestionAnswer(formData);
    if (res.isSuccess) {
        toast.showToast("پاسخ شما با موفقیت ثبت شد");
        answerText.value = ""
        await refresh();
    }
    sendAnswerLoading.value = false;

}
</script>

<style scoped lang="scss">
.selected {
    background: #c7eee1;
}
</style>