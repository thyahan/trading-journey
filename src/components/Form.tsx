import {FC, useState} from 'react';

export type State = {
  sys: string;
  dia: string;
  pulse: string;
  date: Date;
};

const Form: FC<{onSubmit: (s: State) => void}> = ({onSubmit}) => {
  const [state, setState] = useState<State>({
    sys: '',
    dia: '',
    pulse: '',
    date: new Date(),
  });

  const updateState = (key: string) => (value: any) => setState(prev => ({...prev, [key]: value}));

  return (
    <div className="w-full max-w-[320px] h-full px-4 py-6 m-4 rounded-md shadow-lg flex flex-col gap-4 border border-sky-200">
      <input
        inputMode="numeric"
        pattern="[0-9]*"
        className="h-10 w-full px-4 border border-sky-200 rounded-md"
        placeholder="sys"
        value={state.sys}
        onChange={e => updateState('sys')(e.target.value)}
      />
      <input
        inputMode="numeric"
        pattern="[0-9]*"
        className="h-10 w-full px-4 border border-sky-200 rounded-md"
        placeholder="dia"
        value={state.dia}
        onChange={e => updateState('dia')(e.target.value)}
      />
      <input
        inputMode="numeric"
        pattern="[0-9]*"
        className="h-10 w-full px-4 border border-sky-200 rounded-md"
        placeholder="pulse"
        value={state.pulse}
        onChange={e => updateState('pulse')(e.target.value)}
      />
      <button
        className="px-4 h-10 rounded-md shadow-md bg-sky-400 text-white"
        onClick={() => {
          onSubmit({...state, date: new Date()});
        }}>
        Add
      </button>
    </div>
  );
};

export default Form;
