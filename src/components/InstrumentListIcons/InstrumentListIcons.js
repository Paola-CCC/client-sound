import React from 'react';
import { useInstrumentContext } from '../../contexts/InstrumentProvider';

const InstrumentListIcons = ({ instrument, nameInstrument }) => {
  const { handleInstrument } = useInstrumentContext();

  const handleGetInstrument = () => {
    if( nameInstrument && nameInstrument !== 'Tous') {
      handleInstrument(nameInstrument);
    } else {
      handleInstrument('');
    }
  }

  return (
    <button className="instrument" tabIndex={0} onClick={ handleGetInstrument}  >
      {instrument}
      <span className="text-area">{nameInstrument}</span>
    </button>
  );
};

  export default InstrumentListIcons;