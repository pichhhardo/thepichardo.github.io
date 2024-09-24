'use client';

import React, { useEffect } from 'react';

interface MIDIHandlerProps {
  onMIDIMessage: (message: WebMidi.MIDIMessageEvent) => void;
}

const MIDIHandler: React.FC<MIDIHandlerProps> = ({ onMIDIMessage }) => {
  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(midiAccess => {
        midiAccess.inputs.forEach(input => input.onmidimessage = onMIDIMessage);
      });
    }
  }, [onMIDIMessage]);

  return null;
};

export default MIDIHandler;