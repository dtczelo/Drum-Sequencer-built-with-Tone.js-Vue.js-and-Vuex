<template>
    <div
        class="front-panel"
        @keyup.space.prevent="
            isPlaying ? onStopTransport() : onStartTransport()
        "
        tabindex="0"
    >
        <div class="tracks">
            <Track
                v-for="(track, index) in allTracks"
                :track="track"
                :key="index"
                :currentTrack="currentTrack"
                :selectedMeasure="selectedMeasure"
                :trackNumber="index"
                @change-track="onChangeTrack"
            >
                Tr. {{ (index += 1) }}
            </Track>
        </div>
        <div class="master-section">
            <Master />
        </div>
        <!-- <hr /> -->
        <div class="effects">
            <Effects />
        </div>
        <div class="steps">
            <Step
                ref="sequencer"
                v-for="(step, index) in stepsToRender"
                :key="step.id"
                :step="step"
                :index="index"
                :isPlaying="isPlaying"
                :active="step.active"
                :currentTrack="currentTrack"
                :selectedMeasure="selectedMeasure"
                class="steps__step"
                >{{ (index += 1) }}
            </Step>
        </div>
        <div class="transport">
            <div class="transport__tempo">
                <button
                    @click.prevent="decrementTempo"
                    class="transport__tempo--increment"
                >
                    <i class="fas fa-minus"></i>
                </button>
                <div class="transport__tempo--display">
                    <p>{{ tempo }}</p>
                </div>
                <button
                    @click.prevent="incrementTempo"
                    class="transport__tempo--increment"
                >
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="transport__controls">
                <button
                    @click.prevent="onBackwardTransport"
                    :class="{ active: isBackwarding }"
                    class="transport__controls--back"
                >
                    <i class="fas fa-fast-backward"></i>
                </button>
                <button
                    @click.prevent="onForwardTransport"
                    :class="{ active: isForwarding }"
                    class="transport__controls--for"
                >
                    <i class="fas fa-fast-forward"></i>
                </button>
                <button
                    @click="onStopTransport"
                    :class="{ active: !isPlaying }"
                    class="transport__controls--stop"
                >
                    <i class="fas fa-stop"></i>
                </button>
                <button class="transport__controls--pause">
                    <i class="fas fa-pause"></i>
                </button>
                <button
                    @click="onStartTransport"
                    :class="{ active: isPlaying }"
                    class="transport__controls--play"
                >
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <div class="transport__dots">
                <Dot
                    v-for="(measures, index) in numberOfMeasuresInTrack"
                    :key="index"
                    :index="index"
                    :selectedMeasure="selectedMeasure"
                    @on-change-measure="onChangeMeasure"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import Step from "../components/Step.vue";
import Track from "../components/Track.vue";
import Master from "../components/Master.vue";
import Effects from "../components/Effects.vue";
import Dot from "../components/Dot.vue";

export default {
    components: {
        Step,
        Track,
        Master,
        Effects,
        Dot,
    },
    data() {
        return {
            isPlaying: false,
            isForwarding: false,
            isBackwarding: false,
            currentTrack: 0,
            selectedMeasure: 0,
        };
    },
    computed: {
        tempo() {
            return this.$store.state.tempo;
        },
        allTracks() {
            return this.$store.state.tracksDATA;
        },
        stepsToRender() {
            return this.$store.state.tracksDATA[this.currentTrack][
                this.selectedMeasure
            ];
        },
        numberOfMeasuresInTrack() {
            return this.$store.state.tracksDATA[this.currentTrack];
        },
        ...mapGetters(["currentStepAndMeasure"]),
    },
    methods: {
        // Transport
        onStartTransport() {
            this.$tone.Transport.start();
            this.isPlaying = true;
        },
        onStopTransport() {
            this.$tone.Transport.stop();
            this.isPlaying = false;
            this.$store.commit("resetScheduleTick");
        },
        onBackwardTransport() {
            this.$store.commit("decrementScheduleTick");
            this.isBackwarding = true;
            setTimeout(() => {
                this.isBackwarding = false;
            }, 100);
        },
        onForwardTransport() {
            this.$store.commit("incrementScheduleTick");
            this.isForwarding = true;
            setTimeout(() => {
                this.isForwarding = false;
            }, 100);
        },
        // Event from track
        onChangeTrack(trackNumber) {
            this.currentTrack = trackNumber;
        },
        // Event from dot
        onChangeMeasure(value) {
            this.selectedMeasure = value;
        },
        // Clock
        incrementTempo() {
            this.tempo < 300 && this.$store.commit("incrementTempo");
        },
        decrementTempo() {
            this.tempo > 10 && this.$store.commit("decrementTempo");
        },
        sendClockTime() {
            this.$tone.Transport.scheduleRepeat((time) => {
                this.$store.commit("incrementMainClock", time);
                this.$store.commit("incrementScheduleTick");
                this.$store.commit("updateMeasure");
            }, "16n");
        },
    },
    created() {
        this.$store.commit("initDATA");
    },
    mounted() {
        this.$store.commit("initTempo");
        this.sendClockTime();
    },
};
</script>

<style lang="scss">
.front-panel {
    display: grid;
    grid-template-areas:
        "tracks tracks tracks master"
        "effects effects effects effects"
        "steps steps steps steps"
        "transport transport transport transport";
}

.tracks {
    grid-area: tracks;
    height: 35vh;
    width: min(90%, 1800px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}

.master-section {
    grid-area: master;
    height: 35vh;
    width: min(90%, 1800px);
    margin: 0 auto;
}

.effects {
    grid-area: effects;
    width: min(90%, 1800px);
    height: 40vh;
    margin: 0 auto;
}

.steps {
    grid-area: steps;
    height: 10vh;
    width: min(90%, 1800px);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__step {
        width: 50px;
        height: 50px;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        background-color: var(--secondary-color);
        border-radius: 4px;
    }
}

.transport {
    grid-area: transport;
    height: 5vh;
    width: min(90%, 1800px);
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__tempo {
        display: flex;
        & > * {
            font-size: 1.2rem;
            color: var(--secondary-color);
            margin-right: 10px;
        }
    }
    &__controls {
        display: flex;
        & > * {
            font-size: 1.2rem;
            color: var(--secondary-color);
            margin-right: 10px;
        }
        &--play {
            font-size: 1.05rem;
        }
    }
    &__dots {
        display: flex;
    }
}

.active {
    color: var(--primary-color);
}
</style>
