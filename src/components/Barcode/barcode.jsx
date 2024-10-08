import React, { useState } from 'react'

function barcode() {
    const [isScanning, setIsScanning] = useState(false);

    const handleStartScan = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          const videoElement = document.querySelector("video");
          videoElement.srcObject = stream;
          videoElement.play();
          setIsScanning(true);
        })
        .catch((err) => {
          console.error("Error accessing camera: ", err);
        });
    };
  
  return (
    <div>
    <h1>Camera Test</h1>
    <button onClick={handleStartScan}>Start Scanning</button>
    {isScanning && (
      <video width="500" height="500" />
    )}
  </div>
  )
}

export default barcode
