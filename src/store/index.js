import Vue from "vue";
import Vuex from "vuex";
import * as Tone from "tone";
import { uuid } from 'uuidv4';

Vue.use(Vuex);

import sound1 from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808K_A.wav";
import sound2 from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808CLAP.wav";
import sound3 from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808CHH.wav";
import sound4 from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/808S_A.wav";
import sound5 from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/FINGSNAP_A.wav";
import sound6 from "../assets/samples/Boxed_Ear_R-8_MkII_Single_Hits/CABASA.wav"

const initialTempo = 120;
const allChannelsVolume = 0;
const masterChannelVolume = 0;
const masterChannelPan = 0; // Must be within -1 & 1

// const ampEnv1 = new Tone.AmplitudeEnvelope({
//     attack: 0,
//     decay: 1,
//     sustain: 1,
//     release: 1
//  });
// const ampEnv2 = new Tone.AmplitudeEnvelope({
//     attack: 0,
//     decay: 0,
//     sustain: 1,
//     release: 0.1
//  });
// const ampEnv3 = new Tone.AmplitudeEnvelope({
//     attack: 0,
//     decay: 0,
//     sustain: 1,
//     release: 0.1
//  });
// const ampEnv4 = new Tone.AmplitudeEnvelope({
//     attack: 0,
//     decay: 0,
//     sustain: 1,
//     release: 0.1
//  });

// const distortion1 = new Tone.Distortion(0);
// const distortion2 = new Tone.Distortion(0);
// const distortion3 = new Tone.Distortion(0);
// const distortion4 = new Tone.Distortion(0);

// const HPF1 = new Tone.Filter(0, "highpass");
// const HPF2 = new Tone.Filter(0, "highpass");
// const HPF3 = new Tone.Filter(0, "highpass");
// const HPF4 = new Tone.Filter(0, "highpass");

// const LPF1 = new Tone.Filter(20000, "lowpass");
// const LPF2 = new Tone.Filter(20000, "lowpass");
// const LPF3 = new Tone.Filter(20000, "lowpass");
// const LPF4 = new Tone.Filter(20000, "lowpass");

// const feedbackDelay1 = new Tone.FeedbackDelay("8n", 0);
// const feedbackDelay2 = new Tone.FeedbackDelay("8n", 0);
// const feedbackDelay3 = new Tone.FeedbackDelay("8n", 0);
// const feedbackDelay4 = new Tone.FeedbackDelay("8n", 0);

// Dog Mod
const dogDisto = new Tone.Distortion(0.9);
const dogEq = new Tone.EQ3(6, 0, -5);
const dogLimiter = new Tone.Limiter(-40).toDestination();
const dogChain = new Tone.Chorus(6, 8, 3).chain(dogDisto, dogEq, dogLimiter);

const limiter = new Tone.Limiter(-6).toDestination();

// Channels & Master section
const channel1 = new Tone.Channel(allChannelsVolume, 0);
const channel2 = new Tone.Channel(allChannelsVolume, 0);
const channel3 = new Tone.Channel(allChannelsVolume, 0);
const channel4 = new Tone.Channel(allChannelsVolume, 0);
const channel5 = new Tone.Channel(allChannelsVolume, 0);
const channel6 = new Tone.Channel(allChannelsVolume, 0);


const masterChannel = new Tone.Channel(masterChannelVolume, masterChannelPan);

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
        numberOfMeasures: 4,
        numberOfSteps: 16,
        // TracksDATA => Track : Array => Measure : Array => Steps : Array
        tracksDATA: [],
        tempo: initialTempo,
        track1: new Tone.Player(sound1).chain(
            // ampEnv1,
            // distortion1,
            // LPF1,
            // HPF1,
            // feedbackDelay1,
            channel1,
            masterChannel
        ),
        track2: new Tone.Player(sound2).chain(
            // ampEnv2,
            // distortion2,
            // LPF2,
            // HPF2,
            // feedbackDelay2,
            channel2,
            masterChannel
        ),
        track3: new Tone.Player(sound3).chain(
            // ampEnv3,
            // distortion3,
            // LPF3,
            // HPF3,
            // feedbackDelay3,
            channel3,
            masterChannel
        ),
        track4: new Tone.Player(sound4).chain(
            // ampEnv4,
            // distortion4,
            // LPF4,
            // HPF4,
            // feedbackDelay4,
            channel4,
            masterChannel
        ),
        track5: new Tone.Player(sound5).chain(
            // ampEnv5,
            // distortion5,
            // LPF5,
            // HPF5,
            // feedbackDelay5,
            channel5,
            masterChannel
        ),
        track6: new Tone.Player(sound6).chain(
            // ampEnv6,
            // distortion6,
            // LPF6,
            // HPF6,
            // feedbackDelay6,
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
            state.mainClock = time;
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
            Tone.Transport.bpm.value = initialTempo;
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
                }));
            }
            // Initialized Tracks Data
            for (let i = 0; i < state.numberOfTracks; i++) {
                const filledTrack = Array.from(
                    { length: state.numberOfMeasures },
                    () => createArrayOfSteps()
                );
                state.tracksDATA.push(filledTrack);
            }
        },
        onAddStep(state, payload) {
            state.tracksDATA[payload.currentTrack][payload.selectedMeasure][
                payload.selectedStep
            ].active = !state.tracksDATA[payload.currentTrack][
                payload.selectedMeasure
            ][payload.selectedStep].active;
        },
        // onChangeParameterLock(state, payload) {

        // },
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