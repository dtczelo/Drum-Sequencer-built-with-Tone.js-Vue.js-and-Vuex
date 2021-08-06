<template>
    <div class="master">
        <div class="master__title">
            <p>MASTER</p>
        </div>
        <div class="master__knob">
            <p class="master__knob-label">Chorus Send</p>
            <round-slider
                class="master__slider"
                v-model="chorusSlider"
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
            />
        </div>
        <div class="master__knob">
            <p class="master__knob-label">Delay Send</p>
            <round-slider
                class="master__slider"
                v-model="delaySlider"
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
            />
        </div>
        <div class="master__knob">
            <p class="master__knob-label">Reverb Send</p>
            <round-slider
                class="master__slider"
                v-model="reverbSlider"
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
            />
        </div>
        <div class="master__knob">
            <p class="master__knob-label">Master Vol.</p>
            <round-slider
                class="master__slider"
                v-model="volSlider"
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
            />
        </div>
    </div>
</template>

<script>
import RoundSlider from "vue-round-slider";

export default {
    components: {
        RoundSlider,
    },
    data() {
        return {
            chorusSlider: -60,
            delaySlider: -60,
            reverbSlider: -60,
            volSlider: -6,
        };
    },
    watch: {
        chorusSlider(newValue) {
            this.$store.commit("onChangeMasterChorusSend", newValue);
        },
        delaySlider(newValue) {
            this.$store.commit("onChangeMasterDelaySend", newValue);
        },
        reverbSlider(newValue) {
            this.$store.commit("onChangeMasterReverbSend", newValue);
        },
        volSlider(newValue) {
            this.$store.commit("onChangeMasterVolume", newValue);
        },
    },
};
</script>

<style lang="scss">
.master {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    &__title {
        font-weight: 600;
    }
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
</style>
