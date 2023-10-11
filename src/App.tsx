import { useState } from 'react';
import { youtubeDownload, videoDownload } from './_firebase/firebase-functions';

function App() {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    console.log(data);
    youtubeDownload({url:data.url})
    .then((response) => {
      console.log(response.data);
      setVideos(response.data.video.filter((video) => video.mimeType.includes("video/mp4")));
    })
  };

  return (
    <div className='flex flex-col gap-8 mt-16'>
    <div className='grid justify-center text-center gap-8 bg-[url(/assets/youtube.png)] bg-contain bg-no-repeat bg-center h-96 p-4'>
    </div>
    <div className='flex justify-center'>
      <form 
      className='border-2 border-red-700 rounded-full p-4 font-semibold text-xl w-2/5 flex'
      onSubmit={(e) => handleSubmit(e)}>
        <input 
        type="text" 
        placeholder="Search" 
        className='flex-1'
        name='url'/> 
      <span className='border-2 border-red-700 w-1 mx-2'></span>
        <button type="submit"><div className='bg-[url(/youtube.png)] w-6 h-7 bg-center bg-no-repeat bg-[length:130px_130px]'></div></button>
      </form>
    </div>
    {videos && videos.length > 0 && 
    <>
    <div className='w-2/ mx-auto'>To download a video right click on the video and click save as.</div>
    <div className='flex justify-center w-3/4 mx-auto gap-4'>
        
        {videos.map((video) => (
          <ul>
            <li>Quality: {video.qualityLabel}</li>
            <li>Size: {video.quality}</li>
            <li><video 
            src={video.url} 
            className='w-64 h-36 aspect-video'></video></li>
          </ul>
        ))}
      </div>
    </>
    }
    </div>
  )
}

export default App
