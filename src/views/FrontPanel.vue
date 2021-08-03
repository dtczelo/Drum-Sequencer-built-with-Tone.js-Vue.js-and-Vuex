<template>
    <div class="front-panel" @keyup.space="isPlaying === true ? onStopTransport() : onStartTransport()" tabindex="0">
        <div class="tracks" >
            <Track
                v-for="(track, index) in tracks"
                :track="track"
                :key="index"
                :currentTrack="currentTrack"
                :trackNumber="index"
                @change-track="onChangeTrack"
            >
                Tr. {{ (index += 1) }}
            </Track>
        </div>
        <hr />
        <div class="effects"></div>
        <div class="steps">
            <Step
                ref="sequencer"
                v-for="(step, index) in trackToRender"
                :key="step.id"
                :index="index"
                :active="step.active"
                :currentTrack="step.trackNumber"
                @on-add-step="onAddStep"
                class="steps__step"
                >{{ (index += 1) }}
            </Step>
        </div>
        <div class="transport">
            <div class="transport__tempo">
                <button @click="tempo--" class="transport__tempo--increment">
                    <i class="fas fa-minus"></i>
                </button>
                <div class="transport__tempo--display">
                    <p>{{ tempo }}</p>
                </div>
                <button
                    @click.prevent="tempo++"
                    class="transport__tempo--increment"
                >
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="transport__controls">
                <button class="transport__controls--back">
                    <i class="fas fa-fast-backward"></i>
                </button>
                <button class="transport__controls--for">
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
                <div class="transport__dots__dot">
                    <i
                        :class="{ active: currentMeasure === 0 }"
                        class="fas fa-circle"
                    ></i>
                </div>
                <div class="transport__dots__dot">
                    <i
                        :class="{ active: currentMeasure === 1 }"
                        class="fas fa-circle"
                    ></i>
                </div>
                <div class="transport__dots__dot">
                    <i
                        :class="{ active: currentMeasure === 2 }"
                        class="fas fa-circle"
                    ></i>
                </div>
                <div class="transport__dots__dot">
                    <i
                        :class="{ active: currentMeasure === 3 }"
                        class="fas fa-circle"
                    ></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Step from "../components/Step.vue";
import Track from "../components/Track.vue";

export default {
    components: {
        Step,
        Track,
    },
    data() {
        return {
            tempo: 90,
            isPlaying: false,
            currentMeasure: 0,
            numberOfTracks: 4,
            tracks: [],
            currentTrack: 0,
        };
    },
    watch: {
        tempo(newValue) {
            this.$tone.Transport.bpm.value = newValue;
        },
    },
    computed: {
        trackToRender() {
            return this.tracks[this.currentTrack];
        },
    },
    methods: {
        // Transport
        onStartTransport() {
            this.$tone.Transport.start();
            this.isPlaying = true;
        },
        onStopTransport() {
            this.$tone.Transport.stop();
            this.scheduleTick = 0;
            this.isPlaying = false;
        },
        // Events from Step
        onAddStep(selectedStep) {
            this.tracks[this.currentTrack][selectedStep].active = !this.tracks[
                this.currentTrack
            ][selectedStep].active;
        },
        // Event from track
        onChangeTrack(trackNumber) {
            this.currentTrack = trackNumber;
        },
        // Clock
        handleClockTime() {
            this.$tone.Transport.scheduleRepeat((time) => {
                this.$store.commit("incrementMainClock", time);
                this.$store.commit("incrementScheduleTick");
            }, "16n");
        },
    },
    created() {
        for (let i = 0; i < this.numberOfTracks; i++) {
            const filledArray = Array.from(
                { length: this.$store.state.numberOfSteps },
                () => ({
                    id: this.$uuid(),
                    trackNumber: i,
                    active: false,
                })
            );
            this.tracks.push(filledArray);
        }
    },
    mounted() {
        this.$tone.Transport.bpm.value = this.tempo;
        this.handleClockTime();
    },
};
</script>

<style lang="scss">
.front-panel {
}

.tracks {
    height: 40vh;
    width: min(90%, 1800px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}

.effects {
    height: 30vh;
    width: 100%;
}

.steps {
    height: 10vh;
    width: min(90%, 1800px);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__step {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--secondary-color);
        border-radius: 4px;
    }
}

.transport {
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
        & > * {
            font-size: 1.2rem;
            color: var(--secondary-color);
            margin-right: 10px;
        }
    }
    &__dots {
        display: flex;
        color: var(--secondary-color);
        & > * {
            font-size: 1.2rem;
            margin-left: 10px;
        }
    }
}

.active {
    color: var(--primary-color);
}
</style>
