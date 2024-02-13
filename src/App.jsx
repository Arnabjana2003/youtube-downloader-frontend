import React, { useRef, useState } from "react";
import axios from "axios";
import "./App.css";



const VideoDownloader = () => {
  const inputRef = useRef();
  const [videoUrl, setVideoUrl] = useState("");
  const [videoLink, setVideoLink] = useState('');
  const [audioLink, setAudioLink] = useState('');

  const getDtls = async (e) => {
    if (!videoUrl) {
      alert("Video Url must be required");
      return;
    }
    e.target.disabled = true;
    inputRef.current.readOnly = true;
    try {
      const res = await axios.post("https://youtube-downloader-pink.vercel.app/api/getdetails", { videoUrl });
      e.target.disabled = false;
      inputRef.current.readOnly = false
      setAudioLink(res.data.audioUrl);
      setVideoLink(res.data.videoUrl);
    } catch (error) {
      e.target.disabled = false;
      inputRef.current.readOnly = false;
      console.log(error);
      alert(error.message);
    }
  };

  const reset = ()=>{
    setVideoUrl("")
    setVideoLink("")
    setAudioLink("")
  }

  return (
    <>
      <div className="outer-div">
        <h2>YouTube Video Downloader</h2>
        <div className="inner-div">
          <div>
            <input
              type="text"
              readOnly={videoLink}
              placeholder="Youtube Link"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              ref={inputRef}
            />
            <button disabled={videoLink} onClick={getDtls}>
              Get details
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-evenly",marginBlock:"9vh" }}>
            {audioLink && (
              <button style={{marginRight:"4vw",border:"1px solid white"}}>
                <a href={audioLink} download>
                  Download Audio
                </a>
              </button>
            )}
            {videoLink && (
              <button style={{marginLeft:"4vw",border:"1px solid white"}}>
                <a href={videoLink} download>
                  Download Video
                </a>
              </button>
            )}
          </div>
          <div style={{textAlign:"center",marginTop:"6vh"}}>
            <button onClick={reset} style={{background:"lightgrey"}}>Reset</button>
          </div>
        </div>
      </div>
      <footer>@Arnab.2024</footer>
    </>
  );
};

export default VideoDownloader;
