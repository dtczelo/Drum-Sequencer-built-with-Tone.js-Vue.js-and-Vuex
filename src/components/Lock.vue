<template>
    <div class="lock">
        <RoundSlider
            v-if="step[currentEffect].type1 === 'unipolar'"
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
            v-if="step[currentEffect].type1 === 'bipolar'"
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
        <RoundSlider
            v-if="
                step[currentEffect].type2 &&
                    step[currentEffect].type2 === 'unipolar'
            "
            class="lock__slider"
            v-model="param2"
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
            v-if="
                step[currentEffect].type2 &&
                    step[currentEffect].type2 === 'bipolar'
            "
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
        currentTrack: Number,
    },
    components: {
        RoundSlider,
    },
    data() {
        return {
            param1: this.step[this.currentEffect].param1,
            param2: this.step[this.currentEffect].param2,
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
        param2() {
            this.$store.commit("onChangeParameterLock2", {
                value: this.param2,
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
    & * {
        margin-bottom: 1rem;
    }
}
</style>
