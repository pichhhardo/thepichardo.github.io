'use client';

import React, { useState } from 'react';
import AudioComponent from '../../components/AudioComponent';
import DataFetcher from '../../components/DataFetcher';
import Synthesizer from '../../components/Synthesizer';
import MIDIHandler from '../../components/MIDIHandler';
import Visualizer from '../../components/Visualizer';

const Midi: React.FC = () => {
  const [midiData, setMidiData] = useState<Uint8Array | null>(null);

  const handleMIDIMessage = (message: WebMidi.MIDIMessageEvent) => {
    setMidiData(message.data);
  };

  return (
    <div>
      <h1>My Next.js Midi Visualizer App</h1>
      <AudioComponent />
      <DataFetcher />
      <Synthesizer />
      <MIDIHandler onMIDIMessage={handleMIDIMessage} />
      <Visualizer midiData={midiData} />
    </div>
  );
};

export default Midi;