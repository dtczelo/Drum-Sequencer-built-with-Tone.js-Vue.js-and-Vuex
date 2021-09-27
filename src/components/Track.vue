<template>
    <div class="track">
        <button
            @click="changeTrack"
            :class="{ active: currentTrack === trackNumber }"
            class="track__btn"
        >
            <slot></slot>
        </button>
        <div class="track__knob">
            <p class="track__knob-label">Vol.</p>
            <round-slider
                class="track__slider"
                v-model="volumeSlider"
                max="2"
                min="-30"
                step="1"
                handleSize="10"
                start-angle="340"
                end-angle="+300"
                line-cap="butt"
                radius="25"
                width="4"
                showTooltip="false"
                tooltipColor="#402e32"
                rangeColor="#ff6f00"
                pathColor="#b5876d"
            />
        </div>
        <div class="track__knob">
            <p class="track__knob-label">Plck. Rate</p>
            <round-slider
                class="track__slider"
                v-model="fadeSlider"
                max="1"
                min="0.1"
                step="0.05"
                handleSize="10"
                start-angle="340"
                end-angle="+300"
                line-cap="butt"
                radius="25"
                width="4"
                showTooltip="false"
                tooltipColor="#402e32"
                rangeColor="#ff6f00"
                pathColor="#b5876d"
            />
        </div>
        <div class="track__knob">
            <p class="track__switch-label">Rev.</p>
            <switches v-model="isReversed"></switches>
        </div>
        <div class="track__knob">
            <p class="track__knob-label">Pan.</p>
            <round-slider
                class="track__slider"
                v-model="panSlider"
                max="1"
                min="-1"
                step="0.1"
                handleSize="10"
                start-angle="340"
                end-angle="+220"
                line-cap="butt"
                radius="25"
                width="4"
                showTooltip="false"
                tooltipColor="#402e32"
                rangeColor="#ff6f00"
                pathColor="#b5876d"
                disabled="true"
            />
        </div>
        <div class="track__knob">
            <p class="track__knob-label">Chorus send</p>
            <round-slider
                class="track__slider"
                v-model="chorusSend"
                max="0"
                min="-60"
                step="1"
                handleSize="10"
                start-angle="340"
                end-angle="+300"
                line-cap="butt"
                radius="25"
                width="4"
                showTooltip="false"
                tooltipColor="#402e32"
                rangeColor="#ff6f00"
                pathColor="#b5876d"
                disabled="true"
            />
        </div>
        <div class="track__knob">
            <p class="track__knob-label">Delay send</p>
            <round-slider
                class="track__slider"
                v-model="delaySend"
                max="0"
                min="-60"
                step="1"
                handleSize="10"
                start-angle="340"
                end-angle="+300"
                line-cap="butt"
                radius="25"
                width="4"
                showTooltip="false"
                tooltipColor="#402e32"
                rangeColor="#ff6f00"
                pathColor="#b5876d"
                disabled="true"
            />
        </div>
        <div class="track__knob">
            <p class="track__knob-label">Reverb Send</p>
            <round-slider
                class="track__slider"
                v-model="reverbSend"
                max="0"
                min="-60"
                step="1"
                handleSize="10"
                start-angle="340"
                end-angle="+300"
                line-cap="butt"
                radius="25"
                width="4"
                showTooltip="false"
                tooltipColor="#402e32"
                rangeColor="#ff6f00"
                pathColor="#b5876d"
                disabled="true"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import RoundSlider from "vue-round-slider";
import Switches from "vue-switches";

export default {
    components: {
        RoundSlider,
        Switches,
    },
    props: {
        tracksSamplesPaths: Array,
        currentTrack: Number,
        selectedMeasure: Number,
        trackNumber: Number,
        track: Array,
    },
    data() {
        return {
            volumeSlider: -6,
            fadeSlider: 127,
            isReversed: false,
            panSlider: 0,
            chorusSend: -60,
            delaySend: -60,
            reverbSend: -60,
            trackSample: null,
        };
    },
    watch: {
        currentStepAndMeasure: {
            handler(payload) {
                if (
                    payload.step >= 0 &&
                    this.track[this.$store.state.currentMeasure][payload.step]
                        .active === true
                ) {
                    this.$store.commit("updateStateEffectsParameters", {
                        trackNumber: this.trackNumber,
                        selectedMeasure: this.selectedMeasure,
                        selectedStep: payload.step,
                    });
                    this.playSound();
                }
            },
            deep: true,
        },
        volumeSlider() {
            this.trackSample.volume.value = this.volumeSlider;
        },
        fadeSlider() {
            this.trackSample.playbackRate = this.fadeSlider;
        },
        isReversed() {
            this.trackSample.reverse = this.isReversed;
        },
        // panSlider(newValue) {
        //     this.$store.commit("onChangeTrackPan", {
        //         currentTrack: this.currentTrack,
        //         value: newValue,
        //     });
        // },
        // chorusSend(newValue) {
        //     this.$store.commit("onChangeTrackSend", {
        //         trackNumber: this.trackNumber,
        //         sendType: "chorus",
        //         value: newValue,
        //     });
        // },
        // delaySend(newValue) {
        //     this.$store.commit("onChangeTrackSend", {
        //         trackNumber: this.trackNumber,
        //         sendType: "delay",
        //         value: newValue,
        //     });
        // },
        // reverbSend(newValue) {
        //     this.$store.commit("onChangeTrackSend", {
        //         trackNumber: this.trackNumber,
        //         sendType: "reverb",
        //         value: newValue,
        //     });
        // },
    },
    computed: { ...mapGetters(["currentStepAndMeasure"]) },
    methods: {
        changeTrack() {
            this.$emit("change-track", this.trackNumber);
        },
        playSound() {
            this.$tone.loaded().then(() => {
                this.trackSample.start(this.$store.state.mainClock);
            });
        },
    },
    created() {},
    mounted() {
        switch (this.trackNumber) {
            case 0:
                this.trackSample = this.$store.state.track1;
                break;
            case 1:
                this.trackSample = this.$store.state.track2;
                break;
            case 2:
                this.trackSample = this.$store.state.track3;
                break;
            case 3:
                this.trackSample = this.$store.state.track4;
                break;
            case 4:
                this.trackSample = this.$store.state.track5;
                break;
            case 5:
                this.trackSample = this.$store.state.track6;
                break;
            default:
                break;
        }
    },
};
</script>

<style lang="scss">
.track {
    width: 75%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__btn {
        padding: 0.2rem 1rem;
        font-size: 1.2rem;
        background-color: var(--secondary-color);
        color: var(--text-color);
        border-radius: 4px;
    }
    &__knob {
        position: relative;
    }
    &__slider {
    }
    &__knob-label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 0.55rem;
    }
    &__switch-label {
        font-size: 0.65rem;
    }
}

.active {
    color: var(--primary-color);
}
</style>
