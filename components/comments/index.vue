<template>
    <section class="comments">
        <form @submit.prevent="sendComment" :class="{ 'card-loading': createLoading }">
            <div class="flex gap-2">
                <base-img v-if="accountStore.currentUser" width="38px" height="38px" class="user-avatar rounded-full"
                    :src="GetUserAvatar(accountStore.currentUser.imageName)" :alt="accountStore.currentUser.fullName" />
                <div class="flex flex-col gap-2 w-full">
                    <input v-model="commentText" :placeholder="inputPlaceHolder" />
                    <div class="flex justify-end">
                        <BaseButton v-if="authStore.isLogin" :disabled="commentText.length < 3" size="sm" rounded>
                            <span v-if="selectedReplyCommentId == 0">ثبت نظر</span>
                            <span v-else>ثبت پاسخ</span>
                        </BaseButton>
                        <BaseButton type="button" @click="authStore.openLoginModal(sendComment)" v-else
                            :disabled="commentText.length < 3" size="sm" rounded>
                            ورود و <span v-if="selectedReplyCommentId == 0">ثبت نظر</span><span v-else>ثبت پاسخ</span>

                        </BaseButton>
                    </div>
                </div>
            </div>
        </form>
        <div class="comment-list mt-5">
            <template v-if="loading">
                <div class="item flex gap-2 items-center" v-for="item in  [1, 2, 3, 4]" :key="item">
                    <BaseSkeletonLoaidng width="38px" height="38px" style="border-radius: 50%;" />
                    <div class="comment-info">
                        <BaseSkeletonLoaidng class="text-h8 text-black" width="38px" height="8px" />
                        <BaseSkeletonLoaidng class="text-h8 mt-2" width="100px" height="8px" />
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="item flex gap-2" v-for="item in comments?.data ?? []" :key="item.id">
                    <BaseImg width="38px" height="38px" class="user-avatar" :src="GetUserAvatar(item.userImageName)"
                        :alt="item.fullName" />
                    <div class="comment-info">
                        <p class="font-bold text-h8 text-black">{{ item.fullName }}</p>
                        <p class="text-h8 mt-2">
                            {{ item.text }}
                        </p>
                        <div class="flex gap-3 items-center mt-2 footer">
                            <span class="text-[12px] text-gray-300">{{ TimeAgo(new Date(item.creationDate)) }}</span>
                            <button @click="() => selectedReplyCommentId = item.id"
                                class=" text-[12px] text-blue">reply</button>
                            <button v-if="item.userId == accountStore.currentUser?.id" @click="openDeletePopup(item.id)"
                                class="text-[12px] text-red">حذف</button>
                        </div>
                        <div class="replies mt-4" v-if="item.replies.length > 0">
                            <div class="item flex gap-2" v-for="reply in item.replies" :key="reply.id">
                                <BaseImg width="38px" height="38px" class="user-avatar"
                                    :src="GetUserAvatar(reply.userImageName)" :alt="reply.fullName" />
                                <div class="comment-info">
                                    <p class="font-bold text-h8 text-black">{{ reply.fullName }}</p>
                                    <p class="text-h8 mt-2">
                                        {{ reply.text }}
                                    </p>
                                    <div class="flex gap-3 items-center mt-2 footer">
                                        <span class="text-[12px] text-gray-300">{{ TimeAgo(new Date(reply.creationDate))
                                        }}</span>
                                        <button v-if="reply.userId == accountStore.currentUser?.id"
                                            @click="openDeletePopup(reply.id)" class="text-[12px] text-red">حذف</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <div class="w-full flex justify-center">
                <BasePagination :class="{ 'card-loading': loading }" v-if="comments" :filter-result="comments"
                    v-model="pageId" />
            </div>
        </div>
        <BaseConfirmPopup :confirm-function="deleteComment" v-model="isOpenDeletePopup"
            description="آیا از حذف نظر خود اطمینان دارید ؟" />
    </section>
</template>
<script setup lang="ts">
import { Form } from 'vee-validate';
import { CommentType, Comment } from "@/models/comments/Comment"
import { CreateComment, DeleteComment, GetComments } from '~/services/comment.service';
import { useAccountStore } from '~/stores/account.store';
import { FilterResult } from '~/models/IApiResponse';
import { comment } from 'postcss';
import { useAuthStore } from '~/stores/auth.store';
const accountStore = useAccountStore();
const authStore = useAuthStore();

const isOpenDeletePopup = ref(false);
const selectedDeleteCommentId = ref(0);
const selectedReplyCommentId = ref(0);
const props = defineProps<{
    linkId: number,
    commentType: CommentType
}>();
const comments: Ref<FilterResult<Comment> | null> = ref(null);
const commentText = ref('');
const pageId = ref(1);
const loading = ref(false);
const createLoading = ref(false);
const toast = useToast();
const inputPlaceHolder = ref('نظر خود را بنویسید...');

const openDeletePopup = (id: number) => {
    isOpenDeletePopup.value = true;
    selectedDeleteCommentId.value = id
}
const deleteComment = async () => {
    loading.value = true;
    var res = await DeleteComment(selectedDeleteCommentId.value);
    if (res.isSuccess) {
        selectedDeleteCommentId.value = 0;
        toast.showToast('حذف نظر با موفقیت انجام شد');
        getData();
        isOpenDeletePopup.value = false;
    }
    loading.value = true;
}
const sendComment = async () => {
    createLoading.value = true;
    var res = await CreateComment(commentText.value, props.linkId, props.commentType, selectedReplyCommentId.value);
    if (res.isSuccess) {
        pageId.value = 1;
        toast.showToast('نظر شما با موفقیت ثبت شد')
        commentText.value = ""
        selectedReplyCommentId.value = 0;
        getData();
    }
    createLoading.value = false;

}
watch(pageId, async () => {
    await getData();
})

onMounted(async () => {
    await getData();
});

const getData = async () => {
    loading.value = true;
    var res = await GetComments(props.linkId, props.commentType, pageId.value, 12);
    if (res.data) {
        comments.value = res.data;
    }
    loading.value = false;
}

watch(selectedReplyCommentId, (val) => {
    if (val > 0) {
        inputPlaceHolder.value = "پاسخ خود را بنویسید..."
    } else {
        inputPlaceHolder.value = "نظر خود را بنویسید..."
    }
})
</script>
<style scoped lang="scss">
input {
    background: transparent;
    border-bottom: 1px solid var(--color-gray-300);
    font-size: 13px;
    width: 100%;
    padding-right: 0;

    &::placeholder {
        font-size: 13px;
    }
}

.item {
    margin-bottom: 1rem;
}

.comment-info {
    button {
        position: relative;

        &::after {
            content: " ";
            width: 2px;
            height: 2px;
            border-radius: 50%;
            background-color: black;
            right: -7px;
            position: absolute;
            bottom: .5rem;

        }
    }

    .replies {
        .item {
            border-right: 1px dashed var(--color-gray-300);
            padding-right: 0.75rem;
        }
    }
}

.user-avatar {
    border-radius: 50%;
    width: 38px;
    height: 38px;
}
</style>