import { HttpsCallableResult } from 'firebase/functions';
import React, { useState } from 'react';
import './App.css';
import { downloadVideo } from './firebase-functions';

function App() {
  const [url, setUrl] = useState("")
  const [formats, setFormats] = useState<[] | null>(null)
  const [embed, setEmbed] = useState("")
  const [link, setLink] = useState("")

  const submitVideo = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(url)
    downloadVideo({ url })
      .then((res: HttpsCallableResult<any>) => {
        console.log(res.data.video)
        setFormats(res.data.video)
        setEmbed(res.data.url)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mytube</h1>
        <h5>Turn YouTube Videos into your videos</h5>
        <form onSubmit={submitVideo}>
          <input type="url" placeholder='Youtube Url' value={url} onChange={(e)=>{setUrl(e.target.value)}} />
          <button type="submit">Download</button>
        </form>
        {formats && 
        <div>
          <select onSelect={(e) => {console.log(e.target)}}>
          {formats.map((format: {
            mimeType: string,
            qualityLabel: string,
            bitrate: number,
            audioBitrate: number | null,
            quality: string,
            url: string
          }) => (
            <option value={format.url}>{format.quality}-{format.qualityLabel}</option>
          ))}
        </select>
          <iframe title="Download Video" style={{width: "640px", height: "480px"}} src={embed}></iframe>
        </div>
        }
      </header>
    </div>
  );
}

export default App;
