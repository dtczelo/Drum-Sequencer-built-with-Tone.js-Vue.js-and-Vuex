<template>
    <div class="master">
        <div class="master__title">
            <p>MASTER</p>
        </div>
        <!-- <p class="master__sub-title">Effects</p>
        <div class="master__section">
            <div class="master__knob">
                <p class="master__knob-label">Chorus Fb.</p>
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
                    disabled="true"
                />
            </div>
            <div class="master__knob">
                <p class="master__knob-label">Delay Fb.</p>
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
                    disabled="true"
                />
            </div>
            <div class="master__knob">
                <p class="master__knob-label">Reverb Size</p>
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
                    disabled="true"
                />
            </div>
        </div> -->
        <p class="master__sub-title">Amp.</p>
        <div class="master__section">
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
        <p class="master__sub-title">Swing</p>
        <div class="master__section">
            <div class="master__knob">
                <p class="master__knob-label">Swing int.</p>
                <round-slider
                    class="master__slider"
                    v-model="swingIntSlider"
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
            <div class="master__knob">
                <p class="master__switch-label">Swing sub.</p>
                <span>8th</span><switches v-model="isSubSwing8th"></switches
                ><span>4th</span>
            </div>
        </div>
        <p class="master__sub-title">Ramdomize</p>
        <div class="master__section">
            <button @click="ramdomAll" class="master__btn">Ramdom</button>
        </div>
    </div>
</template>

<script>
import RoundSlider from "vue-round-slider";
import Switches from "vue-switches";

export default {
    components: {
        RoundSlider,
        Switches,
    },
    data() {
        return {
            chorusSlider: -60,
            delaySlider: -60,
            reverbSlider: -60,
            volSlider: -6,
            swingIntSlider: 0,
            isSubSwing8th: false,
        };
    },
    watch: {
        swingIntSlider(newValue) {
            this.$tone.Transport.swing = newValue;
        },
        isSubSwing8th(newValue) {
            let newSubdivision = newValue ? "8t" : "4t";
            this.$tone.Transport.swingSubdivision = newSubdivision;
        },
        // chorusSlider(newValue) {
        //     this.$store.commit("onChangeMasterChorusSend", newValue);
        // },
        // delaySlider(newValue) {
        //     this.$store.commit("onChangeMasterDelaySend", newValue);
        // },
        // reverbSlider(newValue) {
        //     this.$store.commit("onChangeMasterReverbSend", newValue);
        // },
        volSlider(newValue) {
            this.$store.commit("onChangeMasterVolume", newValue);
        },
    },
    methods: {
        ramdomAll() {
            this.$store.commit("ramdomAllDATA");
        }
    }
};
</script>

<style lang="scss">
.master {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__section {
        display: flex;
        justify-content: space-between;
    }
    &__title {
        font-weight: 600;
    }
    &__sub-title {
        font-size: 0.85rem;
        text-align: left;
    }
    &__btn {
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
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
    & span {
        font-size: 0.65rem;
        font-weight: 400;
    }
}
</style>
