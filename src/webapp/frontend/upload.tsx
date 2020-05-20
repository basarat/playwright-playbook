import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { base, Horizontal, Vertical, Content } from 'gls';
import { cssRaw, style } from 'typestyle';

base('#root');
cssRaw('body {font-family: Arial}');

const uploadEndpoint = 'http://localhost:3000/api/upload';

const FileInput = ({ value, onChange }: { value: File | null, onChange: (file: File | null) => void }) => (
  <Horizontal verticalAlign='center'>
    <label>
      <div style={{ padding: '20px', border: '1px dashed black', cursor: 'pointer', userSelect: 'none' }}>
        Click to select some file
      </div>
      <input
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        multiple={false}
        onChange={e => {
          onChange(e.target.files == null ? null : e.target.files[0]);
        }}
      />
    </label>
    {value &&
      <div>Selected file: {value.name}</div>
    }
  </Horizontal>
);

const App: React.FC = () => {
  const [value, onChange] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string>('');
  const [uploadedImage, setUploadedImage] = React.useState<string>('');

  const submitFile = async () => {
    if (!value) {
      setError('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('imageFile', value);
    const response = await fetch(uploadEndpoint, {
      method: 'POST',
      body: formData
    });
    const body = await response.json();
    if ('error' in body) {
      setError(error);
      return;
    }
    setUploadedImage(body.path);
  };

  return (
    <Vertical padding={20} spacing={12}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitFile();
        }}
        id='uploadForm'
        method='post'
        encType="multipart/form-data">
        <Vertical horizontalAlign='left'>
          <FileInput value={value} onChange={(e) => {
            setError('');
            onChange(e);
          }} />
          <input type='submit' value='Upload!' />
        </Vertical>
      </form>
      {
        error != '' &&
        <div id='message' style={{ color: '#0072ff', fontSize: '30px', fontWeight: 'bold' }}>{error}</div>
      }
      {
        uploadedImage != '' &&
        <Content>
          <img src={uploadedImage} style={{ maxWidth: '500px' }} />
        </Content>
      }
    </Vertical>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
