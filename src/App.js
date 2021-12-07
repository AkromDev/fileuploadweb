import { useEffect } from 'react';
import { useRef } from 'react';
import './App.css';

function App() {
  const imageInputRef = useRef(null)
  const triggerUpload = () => {
    imageInputRef.current.click()
  }
  const onMessage = (data) => {
    let params = data?.data;

    if (typeof data?.data === 'string') {
      params = JSON.parse(params);
    }
    if (typeof params !== 'object') return;
    const { type } = params;

    if(type === 'upload'){
      window.focus()
      triggerUpload()
    }

  };

  useEffect(() => {
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return (
    <div className="App">
    <input 
       ref={imageInputRef}
       type="file"
       id="fileupload"
       name="avatar"
       accept="image/png, image/jpeg" 
    />
    <div style={{marginTop: 20}}>
      <textarea id='textarea' name='textarea' rows={4}/>
    </div>
    <div id='element-1'></div>
    <div id='element-2'></div>
    <div style={{marginTop: 30}}>
      <button onMouseDown={triggerUpload}>Tiggger Upload inside web</button>
    </div>
    </div>
  );
}

export default App;
