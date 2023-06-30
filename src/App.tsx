import { HttpsCallableResult } from 'firebase/functions';
import React, { useState, useEffect } from 'react';
import './App.css';
import { downloadVideo, saveVideo } from './firebase-functions';
import { GoMute, GoUnmute } from "react-icons/go"
import { popup, signin } from './firebase-auth';


function App() {
  const [url, setUrl] = useState("")
  const [formats, setFormats] = useState([])
  const [displayFormats, setDisplayFormats] = useState([])

  const submitVideo = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(url)
    downloadVideo({ url })
      .then((res: HttpsCallableResult<any>) => {
        setFormats(res.data.video)
        setDisplayFormats(res.data.video.filter((video: {height: number, mimeType: string}) => ( video.mimeType.includes("video") && video.height >= 720 )))
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mytube</h1>
        <h5>Turn YouTube Videos into your videos</h5>
        
        <div>
        
        
        </div>
        <form onSubmit={submitVideo}>
          <input type="url" placeholder='Youtube Url' value={url} onChange={(e) => { setUrl(e.target.value) }} style={{width: "25vw", padding: ".5rem .75rem", lineHeight: "2rem", fontSize: "1.15rem", fontWeight: "bold"}} />
          <button type="submit"><b>Preview</b></button>
        </form>
        {formats.length > 0 && 
          <div style={{width: "100%"}}>
            To download video right click and select <u>Save Video As</u>
            <div className='card-container'>
            {displayFormats.map((format: {
            quality: string,
            fps: number,
            hasAudio: boolean,
            url: string,
            itag: number,
            height: number,
            width: number,
            mimeType: string,
            container: string
          }) => (
            <div
                key={`${format.itag}`}
                id={`${format.itag}`}
              className="download-card"
            >
              <div className='video-container'><video src={format.url} /></div>
              <div className='video-info'>
              <span>Video Size: {format.width}x{format.height}</span>
              <span>FPS: {format.fps}</span>
                <span>Audio: {format.hasAudio ? <GoUnmute /> : <GoMute />}</span>
                <span>Format: {format.container}</span>
              </div>
              
                  
            </div>
          ))}
          </div>
          
          </div>
        }
      </header>
    </div>
  );
}

export default App;
