import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as gls from 'gls';

import { base } from 'gls';
base('#root');

const App: React.FC = () => {
  return (
    <gls.Vertical padding={20}>
      <gls.Horizontal>
        <gls.Vertical>
          <label>Key</label>
          <input />
        </gls.Vertical>
        <button>Load actions</button>
      </gls.Horizontal>
    </gls.Vertical>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
