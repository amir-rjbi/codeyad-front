<template>
    <div class="codeyad-video-player  w-100 pb-10">
        <div class="loading" v-if="loading">
            <IconsLoading />
        </div>
        <div :class="['h-full w-full', { 'in-load': loading }]">
            <div class="video">
                <button v-tooltip="played ? 'توقف' : 'اجرا'">
                    <svg v-if="played" height="24" version="1.1" viewBox="0 0 512 512" width="24" xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g>
                            <path fill="var(--primary-color)"
                                d="M224,435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6   C218.6,448,224,442.6,224,435.8z" />
                            <path fill="var(--primary-color)"
                                d="M371.8,64h-71.6c-6.7,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6c6.7,0,12.2-5.4,12.2-12.2V76.1   C384,69.4,378.6,64,371.8,64z" />
                        </g>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M21.409 9.35331C21.8893 9.60872 22.291 9.99 22.5712 10.4563C22.8514 10.9226 22.9994 11.4563 22.9994 12.0003C22.9994 12.5443 22.8514 13.078 22.5712 13.5443C22.291 14.0106 21.8893 14.3919 21.409 14.6473L8.597 21.6143C6.534 22.7363 4 21.2763 4 18.9683V5.03331C4 2.72331 6.534 1.26431 8.597 2.38531L21.409 9.35331Z"
                            fill="var(--primary-color)" />
                    </svg>

                </button>
                <video @click="togglePlayStatus" :src="src" preload="metadata" ref="player" :poster="poster" />
            </div>
            <div class="controls flex items-center gap-5 justify-end mt-4" ref="controls">
                <div class="flex gap-4">
                    <button @click="fullScreen" v-tooltip="'تمام صفحه'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M5 5H10V7H7V10H5V5ZM14 5H19V10H17V7H14V5ZM17 14H19V19H14V17H17V14ZM10 17V19H5V14H7V17H10Z"
                                fill="var(--color-muted)" />
                        </svg>
                    </button>
                    <button v-if="isShowPIP" @click="togglePictureInPicture" v-tooltip="'نمایش در پایین صفحه'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28 16">
                            <g data-name="6 13">
                                <g data-name="5 1" fill="var(--color-muted)">
                                    <path data-name="9" d="M18 14h10v2H18z"></path>
                                    <path data-name="10" d="M26 9h2v6h-2z"></path>
                                </g>
                            </g>
                            <g data-name="6 14" fill="var(--color-muted)">
                                <g data-name="4 1">
                                    <path data-name="7" d="M12 16H2v-2h10z"></path>
                                    <path data-name="8" d="M2 16H0V6h2z"></path>
                                </g>
                                <path data-name="41" d="M28 2H0V0h28z"></path>
                            </g>
                        </svg>
                    </button>
                    <div class="volume-controls">
                        <button data-title="Mute (m)" class="volume-button" @click="toggleMute">
                            <IconsSound v-if="volume > 0" />
                            <IconsSoundOff v-else />
                        </button>

                        <input class="volume" v-model="volume" type="range" max="1" min="0" step="0.01">
                    </div>
                </div>
                <div class="flex flex-row w-full items-center gap-2">
                    <div class="flex text-sm h-fit">
                        {{ visitedDuration }}/{{ duration }}
                    </div>
                    <div class="progress flex-grow" ref="progress" @click="skipAhead">
                        <div class="inner" ref="progressInner" style="width: 0%;z-index: 0;"></div>
                    </div>

                </div>
                <div class="flex items-center justify-between gap-4">
                    <button @click="changeTime(10)" v-tooltip="'10 ثانیه به جلو'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M11 8.76813L4.903 4.30813C3.601 3.41113 2 4.58013 2 6.42613V17.5741C2 19.4211 3.6 20.5891 4.903 19.6921L11 15.2321M21.079 10.1471C22.307 10.9541 22.307 13.0461 21.079 13.8531L13.661 18.7301C12.467 19.5151 11 18.4931 11 16.8771V7.12313C11 5.50713 12.467 4.48513 13.661 5.27013L21.079 10.1471Z"
                                stroke="#656565" stroke-width="1.5" />
                        </svg>
                    </button>
                    <p v-tooltip="'سرعت پخش'" @click="setPlayBackSpeed" class="text-sm cursor-pointer">{{ speed }}x</p>
                    <button @click="changeTime(-10)" v-tooltip="'10 ثانیه به عقب'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M13 8.76813L19.097 4.30813C20.399 3.41113 22 4.58013 22 6.42613V17.5741C22 19.4211 20.4 20.5891 19.097 19.6921L13 15.2321M2.921 10.1471C1.693 10.9541 1.693 13.0461 2.921 13.8531L10.339 18.7301C11.533 19.5151 13 18.4931 13 16.8771V7.12313C13 5.50713 11.533 4.48513 10.339 5.27013L2.921 10.1471Z"
                                stroke="#656565" stroke-width="1.5" />
                        </svg>
                    </button>
                </div>
                <button @click="togglePlayStatus" v-tooltip="played ? 'توقف' : (ended ? 'پخش مجدد' : 'اجرا')">
                    <svg v-if="played" height="24" version="1.1" viewBox="0 0 512 512" width="24" xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g>
                            <path fill="#656565"
                                d="M224,435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6   C218.6,448,224,442.6,224,435.8z" />
                            <path fill="#656565"
                                d="M371.8,64h-71.6c-6.7,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6c6.7,0,12.2-5.4,12.2-12.2V76.1   C384,69.4,378.6,64,371.8,64z" />
                        </g>
                    </svg>

                    <svg v-else-if="ended" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                        width="24">
                        <path fill="#656565"
                            d="M480-80q-75 0-140.5-28T225-185q-49-49-77-114.5T120-440h60q0 125 87.5 212.5T480-140q125 0 212.5-87.5T780-440q0-125-85-212.5T485-740h-23l73 73-41 42-147-147 147-147 41 41-78 78h23q75 0 140.5 28T735-695q49 49 77 114.5T840-440q0 75-28 140.5T735-185q-49 49-114.5 77T480-80Z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M21.409 9.35331C21.8893 9.60872 22.291 9.99 22.5712 10.4563C22.8514 10.9226 22.9994 11.4563 22.9994 12.0003C22.9994 12.5443 22.8514 13.078 22.5712 13.5443C22.291 14.0106 21.8893 14.3919 21.409 14.6473L8.597 21.6143C6.534 22.7363 4 21.2763 4 18.9683V5.03331C4 2.72331 6.534 1.26431 8.597 2.38531L21.409 9.35331Z"
                            fill="#656565" />
                    </svg>

                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
    src?: string,
    poster?: string
}>(), {
    poster: "",
    src: "https://dl.codeyad.com/videos/Courses/Demo/fe7ca531-34a1-4fab-8417-d997276934f4.mp4"
});
const player: Ref<HTMLVideoElement | null> = ref(null);
const progressInner: Ref<HTMLDivElement | null> = ref(null);
const toolTip: Ref<HTMLDivElement | null> = ref(null);
const controls: Ref<HTMLDivElement | null> = ref(null);

const isShowPIP = ref(true);
const duration = ref("00:00");
const visitedDuration = ref("00:00");
const loading = ref(false);
const speed = ref(1);
const seekTo = ref();
const played = ref(false);
const volume = ref(1);
const ended = ref(false);
watch(volume, (val) => {
    if (player.value!.muted) {
        player.value!.muted = false;
    }
    //@ts-ignore
    player.value!.volume = volume.value;
})
const setPlayBackSpeed = () => {
    if (speed.value == 3) {
        speed.value = 1;
    } else {
        speed.value += .5;
    }
}
watch(speed, (val) => {
    player.value!.playbackRate = speed.value;
})
const togglePlayStatus = () => {
    if (player.value?.paused || player.value?.ended) {
        player.value?.play();
        played.value = true;
    } else {
        player.value?.pause();
        played.value = false;
    }
}
const initializeVideo = () => {
    try {
        const videoDuration = Math.round(player.value?.duration ?? 0);
        const time = formatTime(videoDuration);
        duration.value = `${time.minutes}:${time.seconds}`;
    } catch {

    }
}
function updateTimeElapsed() {
    try {
        const time = formatTime(Math.round(player.value?.currentTime ?? 0));
        visitedDuration.value = `${time.minutes}:${time.seconds}`;
        updateProgress();
    } catch {

    }
}
function updateProgress() {
    try {
        var percentage = (player.value!.currentTime / player.value!.duration * 100).toFixed(2);
        progressInner!.value!.style.width = percentage + "%";
    } catch {

    }
}
function setLoading() {
    loading.value = true;
}
function cancelLoading() {
    loading.value = false;
}
const setEnded = () => {
    ended.value = true;
    played.value = false;
}
const Played = () => {
    ended.value = false;
    played.value = true;

}
onMounted(() => {
    initializeVideo();
    player.value!.addEventListener('loadedmetadata', initializeVideo);
    player.value?.addEventListener('timeupdate', updateTimeElapsed);
    player.value?.addEventListener('waiting', setLoading);
    player.value?.addEventListener('canplay', cancelLoading);
    player.value?.addEventListener('canplay', cancelLoading);
    player.value?.addEventListener('ended', setEnded);
    player.value?.addEventListener('play', Played);
    document.addEventListener('DOMContentLoaded', () => {
        if (!('pictureInPictureEnabled' in document)) {
            isShowPIP.value = false;
        }
    });
});
onUnmounted(() => {
    player.value?.removeEventListener('loadedmetadata', initializeVideo);
    player.value?.removeEventListener('timeupdate', updateTimeElapsed);
    player.value?.removeEventListener('waiting', setLoading);
    player.value?.removeEventListener('canplay', cancelLoading);
    player.value?.removeEventListener('ended', setEnded);
    player.value?.addEventListener('play', Played);



});
function toggleMute() {
    player.value!.muted = !player.value!.muted;

    if (player.value!.muted) {
        volume.value = 0;
    } else {
        volume.value = 1;
    }
}
const togglePictureInPicture = async () => {
    if (player.value !== document.pictureInPictureElement) {
        await player.value?.requestPictureInPicture();
    } else {
        await document.exitPictureInPicture();
    }
}
const fullScreen = () => {
    player.value?.requestFullscreen();
}
const changeTime = (time: number) => {
    player.value?.pause();
    player.value!.currentTime = player.value!.currentTime + time;
    played.value = true;
    player.value?.play()
}
function updateSeekTooltip(event: any) {
    try {
        const skipTo = event.offsetX / event.target.clientWidth * player.value!.duration;
        seekTo.value = skipTo;
    } catch {

    }
}
function skipAhead(event: any) {
    player.value?.pause();
    var percentage = event.offsetX / event.srcElement.clientWidth;
    if (event.srcElement.classList[0] == 'inner') {
        percentage = event.offsetX / event.srcElement.offsetParent.clientWidth;
    }

    console.log(event);
    const skipTo = percentage * player.value!.duration;
    player.value!.currentTime = skipTo;
    played.value = true;
    player.value?.play()
}
function formatTime(timeInSeconds: number) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
    };
}
</script>
<style scoped lang="scss">
@media screen and (max-width:768px) {
    .progress {
        position: absolute !important;
        bottom: -1rem;
        right: 0;
    }

    .codeyad-video-player {
        height: fit-content !important;
    }

    .controls {
        position: relative;
    }
}

.codeyad-video-player {
    width: 100%;
    min-height: 31rem;
    position: relative;

    .in-load {
        filter: blur(5px);
    }

    z-index: 1;

    .loading {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 100000;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .controls {
        margin: auto;
        margin-top: 1rem;
    }

    .progress {

        cursor: pointer;
        width: 100%;
        background: #656565;
        height: 4px;
        position: relative;
        @apply rounded;
        z-index: 2;

        .inner {
            @apply bg-blue-400 rounded;
            width: 80%;
            height: 4px;
            position: absolute;
            left: 0;
            z-index: -1;

            &::after {
                width: 10px;
                height: 10px;
                @apply bg-blue-400;
                content: "";
                bottom: -3px;
                border-radius: 50%;
                position: absolute;
            }
        }

        .seek-tooltip {
            position: absolute;
            opacity: 0;
            top: -1.8rem;
            padding: .2rem;
            @apply bg-black text-white;
            z-index: 10;
            border-radius: 5px;
        }
    }

    .video {
        position: relative;
        cursor: pointer;

        &:hover {
            button {
                display: block !important;
            }
        }

        button {
            cursor: pointer;
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, 0);
            display: none;

            svg {
                width: 50px;
                height: 50px;
                text-shadow: 0 0 5px 0 gray;
            }
        }
    }

    .volume-controls {
        position: relative;
        display: flex;
        align-items: center;
        gap: .5rem;

        &:hover {
            input {
                display: block;
            }
        }

        input {
            padding: 0;
            height: 4px;
            width: 100px;
            cursor: pointer;
            display: none;
            transition: all ease .3s;
        }
    }



    video {
        height: 100%;
        border-radius: 1rem;
        width: fit-content;
        margin: auto;
    }
}

.playback-animation {
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -40px;
    margin-top: -40px;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
}
</style>