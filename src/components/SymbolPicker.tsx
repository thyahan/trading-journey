import {get} from 'lodash';
import {useMemo, useState} from 'react';
import Select from 'react-select';

type Options = {
  [key: string]: string[];
};

const options: Options = {
  stock: ['stockA', 'stockB', 'stockC'],
  crypto: ['cryptoA', 'cryptoB', 'cryptoC'],
};

type State = {
  open: boolean;
  symbol: string;
  category: string;
};

const toOption = (value: string) => {
  return {
    value: value.toLowerCase(),
    label: value.toUpperCase(),
  };
};

const SymbolPicker = () => {
  const [state, setState] = useState<State>({
    open: true,
    category: '',
    symbol: '',
  });

  const categoryOptions = useMemo(() => {
    return Object.keys(options).map(category => toOption(category));
  }, []);

  const symbolOptions = useMemo(() => {
    if (!state.category) return [];
    return options[state.category].map(symbol => toOption(symbol));
  }, [state.category]);

  const updateState = (key: string) => (value: any) => {
    setState(prev => ({...prev, [key]: value}));
  };
console.log(state)
  const renderPicker = () => {
    if (!state.open) return null;

    return (
      <div className="flex flex-col items-center gap-4">
        {/* category picker */}
        <Select
          value={state.category ? toOption(state.category) : state.category}
          options={categoryOptions}
          placeholder="Select Category"
          className="w-60"
          onChange={e => {
            console.log(e)
            updateState('category')(get(e, 'value', ''));
            updateState('symbol')('');
          }}
        />

        {/* symbol picker */}
        <Select
          value={state.symbol ? toOption(state.symbol) : state.symbol}
          options={symbolOptions}
          placeholder="Select Symbol"
          className="w-60"
          onChange={e => updateState('symbol')(get(e, 'value', ''))}
        />
      </div>
    );
  };

  return <div>{renderPicker()}</div>;
};

export default SymbolPicker;
