import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { base, Horizontal, Vertical } from 'gls';
base('#root');

const App: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [actions, setActions] = React.useState<{ name: string, image: string }[]>([]);
  const onValueChange = React.useCallback((value: string) => {
    setActions([]);
    setValue(value);
  }, []);

  return (
    <Vertical padding={20}>
      <Horizontal verticalAlign='bottom'>
        <Vertical spacing={5}>
          <label htmlFor='secret'>Secret</label>
          <input id='secret' value={value} onChange={e => onValueChange(e.target.value)} />
        </Vertical>
        <button id='load'>Load</button>
      </Horizontal>
      {
        actions.length != 0 &&
        <Vertical>
          {actions.map(action => {
            return (
              <Horizontal id={action.name}>
                <img src={action.image} />
                <div>{action.name}</div>
              </Horizontal>
            )
          })}
        </Vertical>
      }
    </Vertical>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
