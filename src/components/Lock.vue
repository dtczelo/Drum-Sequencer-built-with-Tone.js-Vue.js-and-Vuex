<template>
    <div class="lock">
        <RoundSlider
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
            disabled="true"
        />
        <RoundSlider
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
            disabled="true"
        />
        <RoundSlider
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
        />
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
            param1: 0,
            param2: 0,
            param3: 0
        };
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
