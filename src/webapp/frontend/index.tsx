import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Hello: React.FC = () => {
  return (
    <div>
      This is an example website used as a part of the <a href="https://www.youtube.com/basaratali" target="_blank">Playwright Course</a>.
    </div>
  );
}

ReactDOM.render(
  <Hello />,
  document.getElementById("root")
);
