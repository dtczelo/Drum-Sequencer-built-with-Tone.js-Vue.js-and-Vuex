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
                min="0"
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
                max="127"
                step="1"
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
    </div>
</template>

<script>
import RoundSlider from "vue-round-slider";
import Switches from 'vue-switches';

import kick from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808K_A.wav";
import clap from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808CLAP.wav";
import hh from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808OHH.wav";
import s from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808S_A.wav";

export default {
    components: {
        RoundSlider,
        Switches
    },
    props: {
        tracksSamplesPaths: Array,
        currentTrack: Number,
        trackNumber: Number,
        currentStep: Number,
        track: Array,
    },
    data() {
        return {
            volumeSlider: -6,
            fadeSlider: 127,
            isReversed: false,
            panSlider: 64,
            trackSample: null,
        };
    },
    watch: {
        currentStep: {
            handler(newValue) {
                this.track[newValue].active === true && this.playSound();
            },
            deep: true,
        },
        volumeSlider() {
            this.trackSample.volume.value = this.volumeSlider;
        },
        fadeSlider() {
            this.trackSample.playbackRate = this.fadeSlider;
        }
    },
    methods: {
        changeTrack() {
            this.$emit("change-track", this.trackNumber);
        },
        playSound() {
            this.trackSample.stop();
            this.$tone.loaded().then(() => {
                this.trackSample.start(this.$store.state.mainClock);
            });
        },
    },
    created() {},
    mounted() {
        switch (this.trackNumber) {
            case 0:
                this.trackSample = new this.$tone.Player(kick).toDestination();
                break;

            case 1:
                this.trackSample = new this.$tone.Player(clap).toDestination();
                break;

            case 2:
                this.trackSample = new this.$tone.Player(hh).toDestination();
                break;

            case 3:
                this.trackSample = new this.$tone.Player(s).toDestination();
                break;
            default:
                break;
        }
    },
};
</script>

<style lang="scss">
.track {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__btn {
        padding: 0.5rem 1rem;
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
