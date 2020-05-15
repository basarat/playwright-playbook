import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Hello: React.FC = () => {
  return (
    <div>
      Hello
    </div>
  );
}

ReactDOM.render(
  <Hello />,
  document.getElementById("root")
);
