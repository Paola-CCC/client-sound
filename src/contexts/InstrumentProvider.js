import React, { useContext, useMemo, useState } from 'react';
import { createContext, } from 'react';


const Instrument = createContext();

const useInstrumentContext = () => useContext(Instrument);

const SearchInstrumentProvider = ({children}) => {

    const [instrumentSelected, setInstrumentSelected] = useState("");

    const handleInstrument = (value) => {

        setInstrumentSelected('');
        if( value && value !== '' ) {
            setInstrumentSelected(value);
        };
    };

    const contextValue = useMemo(
      () => ({
        instrumentSelected,
        handleInstrument
      }),
      [instrumentSelected]
    );

    return (
        <Instrument.Provider value={contextValue}>
          {children}
        </Instrument.Provider>
    );
}

export  { useInstrumentContext, SearchInstrumentProvider} ;