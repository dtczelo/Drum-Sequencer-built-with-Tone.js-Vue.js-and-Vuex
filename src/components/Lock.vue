<template>
    <div class="lock">
        <RoundSlider
            v-if="step[currentEffect].type === 'unipolar'"
            class="lock__slider"
            v-model="param1"
            max="127"
            min="0"
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
        <RoundSlider
            v-if="step[currentEffect].type === 'bipolar'"
            class="lock__slider"
            v-model="param1"
            max="127"
            min="0"
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
        />
        <!-- <RoundSlider
            class="lock__slider"
            v-model="param3"
            max="127"
            min="0"
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
        /> -->
    </div>
</template>

<script>
import RoundSlider from "vue-round-slider";

export default {
    props: {
        step: Object,
        currentEffect: String,
        index: Number,
        selectedMeasure: Number,
        currentTrack: Number
    },
    components: {
        RoundSlider,
    },
    data() {
        return {
            param1: this.step[this.currentEffect].param1,
            param2: 0,
            param3: 0,
        };
    },
    watch: {
        param1() {
            this.$store.commit("onChangeParameterLock1", {
                value: this.param1,
                currentEffect: this.currentEffect,
                currentTrack: this.currentTrack,
                selectedMeasure: this.selectedMeasure,
                selectedStep: this.index,
            });
        },
    },
    updated() {
        this.param1 = this.step[this.currentEffect].param1;
    },
};
</script>

<style lang="scss">
.lock {
    width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
