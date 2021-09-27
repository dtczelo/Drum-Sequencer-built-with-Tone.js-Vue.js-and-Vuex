import Vue from "vue";
import Vuex from "vuex";
import * as Tone from "tone";
import { v4 as uuid } from "uuid";

Vue.use(Vuex);

// Constantes
const LATENCY = 0.07; // add a amount of time on schedule main clock to handle parameters locks processing
const INITIAL_TEMPO = 90;
const ALL_CHANNELS_VOLUME = 0;
const MASTER_CHANNEL_VOLUME = 0;
const MASTER_CHANNEL_PAN = 0; // Must be within -1 & 1
const SUBDIVISION = ["4n", "4n.", "4t", "8n", "8n.", "8t", "16n", "16n.", "16t", "32n"];

// Sounds import
import sound1 from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808K_A.wav";
import sound2 from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808CLAP.wav";
import sound3 from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808CHH.wav";
import sound4 from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808S_A.wav";
import sound5 from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/FINGSNAP_A.wav";
import sound6 from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/CABASA.wav";

const buffer1 = new Tone.ToneAudioBuffer(sound1);
const buffer2 = new Tone.ToneAudioBuffer(sound2);
const buffer3 = new Tone.ToneAudioBuffer(sound3);
const buffer4 = new Tone.ToneAudioBuffer(sound4);
const buffer5 = new Tone.ToneAudioBuffer(sound5);
const buffer6 = new Tone.ToneAudioBuffer(sound6);

// Dog Mod
const dogDisto = new Tone.Distortion(0.9);
const dogEq = new Tone.EQ3(6, 0, -5);
const dogLimiter = new Tone.Limiter(-40).toDestination();
const dogChain = new Tone.Chorus(6, 8, 3).chain(dogDisto, dogEq, dogLimiter);

const limiter = new Tone.Limiter(-6).toDestination();

// Distortion

const distortion1 = new Tone.Distortion(0);
const distortion2 = new Tone.Distortion(0);
const distortion3 = new Tone.Distortion(0);
const distortion4 = new Tone.Distortion(0);
const distortion5 = new Tone.Distortion(0);
const distortion6 = new Tone.Distortion(0);

// Pan/Vol

const panVol1 = new Tone.PanVol(0, 0);
const panVol2 = new Tone.PanVol(0, 0);
const panVol3 = new Tone.PanVol(0, 0);
const panVol4 = new Tone.PanVol(0, 0);
const panVol5 = new Tone.PanVol(0, 0);
const panVol6 = new Tone.PanVol(0, 0);

// Bitcrush

const bitcrush1 = new Tone.BitCrusher(16);
const bitcrush2 = new Tone.BitCrusher(16);
const bitcrush3 = new Tone.BitCrusher(16);
const bitcrush4 = new Tone.BitCrusher(16);
const bitcrush5 = new Tone.BitCrusher(16);
const bitcrush6 = new Tone.BitCrusher(16);

// Filter
const LPF1 = new Tone.Filter(20000, "lowpass");
const HPF1 = new Tone.Filter(0, "highpass");
const LPF2 = new Tone.Filter(20000, "lowpass");
const HPF2 = new Tone.Filter(0, "highpass");
const LPF3 = new Tone.Filter(20000, "lowpass");
const HPF3 = new Tone.Filter(0, "highpass");
const LPF4 = new Tone.Filter(20000, "lowpass");
const HPF4 = new Tone.Filter(0, "highpass");
const LPF5 = new Tone.Filter(20000, "lowpass");
const HPF5 = new Tone.Filter(0, "highpass");
const LPF6 = new Tone.Filter(20000, "lowpass");
const HPF6 = new Tone.Filter(0, "highpass");

// Delay
const feedbackDelay1 = new Tone.FeedbackDelay("8n", 0);
feedbackDelay1.set({ wet: 0 });
const feedbackDelay2 = new Tone.FeedbackDelay("8n", 0);
feedbackDelay2.set({ wet: 0 });
const feedbackDelay3 = new Tone.FeedbackDelay("8n", 0);
feedbackDelay3.set({ wet: 0 });
const feedbackDelay4 = new Tone.FeedbackDelay("8n", 0);
feedbackDelay4.set({ wet: 0 });
const feedbackDelay5 = new Tone.FeedbackDelay("8n", 0);
feedbackDelay5.set({ wet: 0 });
const feedbackDelay6 = new Tone.FeedbackDelay("8n", 0);
feedbackDelay6.set({ wet: 0 });


// Channels & Master section
const channel1 = new Tone.Channel(ALL_CHANNELS_VOLUME, 0);
const channel2 = new Tone.Channel(ALL_CHANNELS_VOLUME, 0);
const channel3 = new Tone.Channel(ALL_CHANNELS_VOLUME, 0);
const channel4 = new Tone.Channel(ALL_CHANNELS_VOLUME, 0);
const channel5 = new Tone.Channel(ALL_CHANNELS_VOLUME, 0);
const channel6 = new Tone.Channel(ALL_CHANNELS_VOLUME, 0);

const masterChannel = new Tone.Channel(
    MASTER_CHANNEL_VOLUME,
    MASTER_CHANNEL_PAN
);

masterChannel.connect(limiter);

// Sends effects
// const chorus = new Tone.Chorus({ wet: 1 }).connect(limiter);
// const chorusChannel = new Tone.Channel({ volume: 0 }).connect(chorus);
// chorusChannel.receive("chorus");

// const delay = new Tone.FeedbackDelay("12n", 0.5).connect(limiter);
// const delayChannel = new Tone.Channel({ volume: 0 }).connect(delay);
// delayChannel.receive("delay");

// const reverb = new Tone.Reverb(3).connect(limiter);
// const reverbChannel = new Tone.Channel({ volume: 0 }).connect(reverb);
// reverbChannel.receive("reverb");

export default new Vuex.Store({
    state: {
        toTheMoonMod: false,
        godMod: false,
        dogMod: false,
        mainClock: 0,
        scheduleTick: -1,
        currentMeasure: 0,
        numberOfTracks: 6,
        numberOfMeasures: 1,
        numberOfSteps: 16,
        // TracksDATA => Track : Array => Measure : Array => Steps : Array
        tracksDATA: [],
        tempo: INITIAL_TEMPO,
        track1: new Tone.Player(buffer1).chain(
            // ampEnv1,
            bitcrush1,
            distortion1,
            LPF1,
            HPF1,
            feedbackDelay1,
            panVol1,
            channel1,
            masterChannel
        ),
        track2: new Tone.Player(buffer2).chain(
            // ampEnv2,
            bitcrush2,
            distortion2,
            LPF2,
            HPF2,
            feedbackDelay2,
            panVol2,
            channel2,
            masterChannel
        ),
        track3: new Tone.Player(buffer3).chain(
            // ampEnv3,
            bitcrush3,
            distortion3,
            LPF3,
            HPF3,
            feedbackDelay3,
            panVol3,
            channel3,
            masterChannel
        ),
        track4: new Tone.Player(buffer4).chain(
            // ampEnv4,
            bitcrush4,
            distortion4,
            LPF4,
            HPF4,
            feedbackDelay4,
            panVol4,
            channel4,
            masterChannel
        ),
        track5: new Tone.Player(buffer5).chain(
            // ampEnv5,
            bitcrush5,
            distortion5,
            LPF5,
            HPF5,
            feedbackDelay5,
            panVol5,
            channel5,
            masterChannel
        ),
        track6: new Tone.Player(buffer6).chain(
            // ampEnv6,
            bitcrush6,
            distortion6,
            LPF6,
            HPF6,
            feedbackDelay6,
            panVol6,
            channel6,
            masterChannel
        ),
    },
    getters: {
        totalOfSteps: (state) => {
            return state.numberOfMeasures * state.numberOfSteps;
        },
        currentStepAndMeasure: (state) => {
            return {
                step: state.scheduleTick % state.numberOfSteps,
                measure: state.currentMeasure,
            };
        },
    },
    mutations: {
        // MOD
        toggleToTheMoonMod(state, value) {
            state.toTheMoonMod = value;
        },
        toggleDogMod(state, value) {
            if (value) {
                state.dogMod = value;
                masterChannel.connect(dogChain);
            } else {
                state.dogMod = value;
                masterChannel.disconnect(dogChain);
            }
        },
        toggleGodMod(state, value) {
            state.godMod = value;
        },
        // CONFIG
        onChangeConfig(state, payload) {
            if (payload.numberOfSteps)
                state.numberOfSteps = payload.numberOfSteps;
            if (payload.numberOfMeasures)
                state.numberOfMeasures = payload.numberOfMeasures;
        },
        // CLOCK
        incrementMainClock(state, time) {
            state.mainClock = time + LATENCY;
        },
        incrementScheduleTick(state) {
            state.scheduleTick++;
        },
        decrementScheduleTick(state) {
            state.scheduleTick -= 4;
        },
        resetScheduleTick(state) {
            state.scheduleTick = -1;
        },
        initTempo() {
            Tone.Transport.bpm.value = INITIAL_TEMPO;
        },
        incrementTempo(state) {
            state.tempo++;
            Tone.Transport.bpm.value = state.tempo;
        },
        decrementTempo(state) {
            state.tempo--;
            Tone.Transport.bpm.value = state.tempo;
        },
        updateMeasure(state) {
            const currentStep =
                state.scheduleTick %
                (state.numberOfSteps * state.numberOfMeasures);
            if (currentStep < state.numberOfSteps) {
                state.currentMeasure = 0;
            } else if (
                currentStep >= state.numberOfSteps &&
                currentStep < state.numberOfSteps * 2
            ) {
                state.currentMeasure = 1;
            } else if (
                currentStep >= state.numberOfSteps * 2 &&
                currentStep < state.numberOfSteps * 3
            ) {
                state.currentMeasure = 2;
            } else {
                state.currentMeasure = 3;
            }
        },
        // TRACKS DATA
        initDATA(state) {
            state.tracksDATA = [];
            // Initialized steps Data
            let createArrayOfSteps = () => {
                return Array.from({ length: state.numberOfSteps }, () => ({
                    id: uuid(),
                    active: false,
                    pitch: { param1: 64, type1: "bipolar" },
                    delay: { param1: 64, type1: "unipolar", param2: 0, type2: "unipolar" },
                    pan: { param1: 64, type1: "bipolar" },
                    volume: { param1: 127, type1: "unipolar" },
                    distortion: { param1: 0, type1: "unipolar" },
                    filter: { param1: 64, type1: "bipolar"},
                    bitcrush: { param1: 127, type1: "unipolar" },
                }));
            };
            // Initialized Tracks Data
            for (let i = 0; i < state.numberOfTracks; i++) {
                const filledTrack = Array.from(
                    { length: state.numberOfMeasures },
                    () => createArrayOfSteps()
                );
                state.tracksDATA.push(filledTrack);
            }
        },
        // SEQUENCER DATA
        onAddStep(state, payload) {
            state.tracksDATA[payload.currentTrack][payload.selectedMeasure][
                payload.selectedStep
            ].active = !state.tracksDATA[payload.currentTrack][
                payload.selectedMeasure
            ][payload.selectedStep].active;
        },
        // TRACK PARAMETERS
        onChangeTrackPan(state, payload) {
            // Works but maybe channels are in mono so routing to master stereo cancel panning ?
            switch (payload.currentTrack) {
                case 0:
                    channel1.pan.value = payload.value;
                    break;
                case 1:
                    channel2.pan.value = payload.value;
                    break;
                case 2:
                    channel3.pan.value = payload.value;
                    break;
                case 3:
                    channel4.pan.value = payload.value;
                    break;
            }
        },
        // SEND PARAMETERS
        // onChangeTrackSend(state, payload) {
        //     channel1.send(payload.sendType, payload.value);
        // },
        // onChangeMasterChorusSend(state, value) {
        //     chorusChannel.volume.value = value;
        // },
        // onChangeMasterDelaySend(state, value) {
        //     delayChannel.volume.value = value;
        // },
        // onChangeMasterReverbSend(state, value) {
        //     reverbChannel.volume.value = value;
        // },
        // EFFECTS PARAMETERS
        updateStateEffectsParameters(state, payload) {
            const currentStepParametersTrack =
                state.tracksDATA[payload.trackNumber][payload.selectedMeasure][
                    payload.selectedStep
                ];
            if (currentStepParametersTrack.filter.param1 >= 64) {
                eval(`HPF${payload.trackNumber + 1}`).set({
                    frequency: linearRange(
                        0,
                        4000,
                        64,
                        127,
                        currentStepParametersTrack.filter.param1
                    ),
                });
                eval(`LPF${payload.trackNumber + 1}`).set({
                    frequency: 20000
                });
            } else {
                eval(`HPF${payload.trackNumber + 1}`).set({
                    frequency: 0
                });
                eval(`LPF${payload.trackNumber + 1}`).set({
                    frequency: linearRange(
                        40,
                        10000,
                        0,
                        63,
                        currentStepParametersTrack.filter.param1
                    ),
                });
            }
            eval(`bitcrush${payload.trackNumber + 1}`).set({
                bits: linearRange(
                    1,
                    16,
                    0,
                    127,
                    currentStepParametersTrack.bitcrush.param1
                ),
            });
            eval(
                `distortion${payload.trackNumber + 1}`
            ).distortion = linearRange(
                0,
                1,
                0,
                127,
                currentStepParametersTrack.distortion.param1
            );
            eval(`panVol${payload.trackNumber + 1}`).set({
                volume: linearRange(
                    -60,
                    0,
                    0,
                    127,
                    currentStepParametersTrack.volume.param1
                ),
                pan: linearRange(
                    -1,
                    1,
                    0,
                    127,
                    currentStepParametersTrack.pan.param1
                ),
            });
            eval(`feedbackDelay${payload.trackNumber + 1}`).set({
                delayTime: SUBDIVISION[(linearRange(
                    0,
                    SUBDIVISION.length - 1,
                    0,
                    127,
                    currentStepParametersTrack.delay.param1
                )).toFixed(0)],
                feedback: linearRange(
                    0,
                    0.8,
                    0,
                    127,
                    currentStepParametersTrack.delay.param2
                ),
                wet: linearRange(
                    0,
                    0.5,
                    0,
                    127,
                    currentStepParametersTrack.delay.param2
                ),
            });
        },
        onChangeParameterLock1(state, payload) {
            state.tracksDATA[payload.currentTrack][payload.selectedMeasure][
                payload.selectedStep
            ][payload.currentEffect].param1 = payload.value;
        },
        onChangeParameterLock2(state, payload) {
            state.tracksDATA[payload.currentTrack][payload.selectedMeasure][
                payload.selectedStep
            ][payload.currentEffect].param2 = payload.value;
        },
        // MASTER PARAMETERS
        /**
         * Change master volume value in db
         * @param {*} state
         * @param {number} value - New volume value
         * @returns {void}
         */
        onChangeMasterVolume(state, value) {
            masterChannel.volume.value = value;
        },
    },
    actions: {},
    modules: {},
});

// Utilitaries function

// Interpolation 0-127 values to 0-1 values
function linearRange(
    targetMinRange,
    targetMaxRange,
    sourceMinRange,
    sourceMaxRange,
    value
) {
    const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
    const lerp = (x, y, a) => x * (1 - a) + y * a;
    const invlerp = (x, y, a) => clamp((a - x) / (y - x));
    return lerp(
        targetMinRange,
        targetMaxRange,
        invlerp(sourceMinRange, sourceMaxRange, value)
    );
}
