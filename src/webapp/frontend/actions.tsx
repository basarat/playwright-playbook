import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { base, Horizontal, Vertical } from 'gls';
import { cssRaw } from 'typestyle';

base('#root');
cssRaw('body {font-family: Arial}');

const actionsEndpoint = 'http://localhost:3000/api/actions';

const App: React.FC = () => {
  const [key, setKey] = React.useState('');
  const [actions, setActions] = React.useState<{ name: string, image: string }[]>([]);
  const [error, setError] = React.useState<string>('');
  const onKeyChange = React.useCallback((key: string) => {
    setActions([]);
    setError('');
    setKey(key);
  }, [key]);
  const onLoadActions = React.useCallback(async () => {
    const res = await fetch(actionsEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });
    const body = await res.json();
    if (body.error) {
      setError(body.error);
      return;
    }
  }, [key, error]);

  return (
    <Vertical padding={20}>
      <form onSubmit={e => {
        e.preventDefault();
        onLoadActions();
      }}>
        <Horizontal verticalAlign='bottom'>
          <Vertical spacing={5}>
            <label htmlFor='key'>Key</label>
            <input id='key' value={key} onChange={e => onKeyChange(e.target.value)} />
          </Vertical>
          <button id='load'>Load</button>
        </Horizontal>
      </form>
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
      {
        error != '' &&
        <div id='error' style={{ color: 'red', fontSize: '30px', fontWeight: 'bold' }}>{error}</div>
      }
    </Vertical>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
