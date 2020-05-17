import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { base, Horizontal, Vertical, Content } from 'gls';
import { cssRaw, style } from 'typestyle';

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
    } else {
      setActions(body);
    }
  }, [key, error]);

  return (
    <Vertical padding={20} spacing={12}>
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
        <Vertical spacing={10}>
          <h1 id="heading" style={{ margin: 0 }}>Actions 🎭</h1>
          {actions.map(action => {
            return (
              <Horizontal key={action.name} id={action.name} verticalAlign='center'>
                <Content width={50} horizontalAlign='right'>
                  <img src={action.image} className={style({ height: '40px' })} />
                </Content>
                <Content>
                  <div className='action-name'>{action.name}</div>
                </Content>
              </Horizontal>
            )
          })}
        </Vertical>
      }
      {
        error != '' &&
        <div id='error' style={{ color: '#0072ff', fontSize: '30px', fontWeight: 'bold' }}>{error}</div>
      }
    </Vertical>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
