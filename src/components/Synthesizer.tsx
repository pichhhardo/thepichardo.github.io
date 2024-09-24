'use client';

import React from 'react';
import * as Tone from 'tone';

const Synthesizer: React.FC = () => {
  const synth = new Tone.PolySynth().toDestination();

  const handleMIDIInput = (midiMessage: WebMidi.MIDIMessageEvent) => {
    const [command, note, velocity] = midiMessage.data;

    if (command === 144) { // Note on
      synth.triggerAttack(Tone.Frequency(note, "midi").toNote(), undefined, velocity / 127);
    } else if (command === 128) { // Note off
      synth.triggerRelease(Tone.Frequency(note, "midi").toNote());
    }
  };

  const connectMIDI = async () => {
    if (navigator.requestMIDIAccess) {
      try {
        const midiAccess = await navigator.requestMIDIAccess();
        midiAccess.inputs.forEach(input => input.onmidimessage = handleMIDIInput);
      } catch (error) {
        console.error('Error accessing MIDI devices:', error);
      }
    } else {
      console.warn('Web MIDI API not supported in this browser.');
    }
  };

  return (
    <div>
      <p>Synthesizer is running...</p>
      <button onClick={connectMIDI}>Connect MIDI Device</button>
    </div>
  );
};

export default Synthesizer;