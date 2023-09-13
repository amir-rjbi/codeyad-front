<template>
    <section class="comments">
        <form @submit.prevent="sendComment">
            <div class="flex gap-2">
                <base-img width="38px" height="38px" class="user-avatar rounded-full" src="static/images/users/avatar.png"
                    alt="userName" />
                <div class="flex flex-col gap-2 w-full">
                    <input v-model="commentText" placeholder="نظر خود را بنویسید..." />
                    <div class="flex justify-end">
                        <BaseButton :disabled="commentText.length < 3" size="sm" rounded>ثبت نظر</BaseButton>
                    </div>
                </div>
            </div>
        </form>
        <div class="comment-list mt-5">
            <div class="item flex gap-2" v-for="item in [1, 2]" :key="item">
                <BaseImg width="38px" height="38px" class="user-avatar" src="static/images/users/avatar.png"
                    alt="userName" />
                <div class="comment-info">
                    <p class="font-bold text-h8 text-black">محمد اشرافی</p>
                    <p class="text-h8 mt-2">
                        میخواستم بدونم ایا سایتی وجود داره که در اون سفارش های پایتونی و برنامه نویسی دریافت کنی اون هارو
                        انجام بدی و پولش رو دریافت کنی؟
                        انجام بدی و پولش رو دریافت کنی؟
                    </p>
                    <div class="flex gap-3 items-center mt-2 footer">
                        <span class="text-[12px] text-gray-300">20h</span>
                        <button class=" text-[12px] text-blue">reply</button>
                    </div>
                    <div class="replies mt-4">
                        <div class="item flex gap-2" v-for="item in [1, 2]" :key="item">
                            <base-img width="38px" height="38px" class="user-avatar" src="static/images/users/avatar.png"
                                alt="userName" />
                            <div class="comment-info">
                                <p class="font-bold text-h8 text-black">محمد اشرافی</p>
                                <p class="text-h8 mt-2">
                                    میخواستم بدونم ایا سایتی وجود داره که در اون سفارش های پایتونی و برنامه نویسی دریافت کنی
                                    اون
                                    هارو
                                    انجام بدی و پولش رو دریافت کنی؟
                                    انجام بدی و پولش رو دریافت کنی؟
                                </p>
                                <div class="flex gap-3 items-center mt-2 footer">
                                    <span class="text-[12px] text-gray-300">20h</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { Form } from 'vee-validate';

const commentText = ref('');
const sendComment = () => {

}
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
    height:38px;
}
</style>