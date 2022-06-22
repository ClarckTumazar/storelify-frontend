import React from 'react'
import { useEffect, useState } from "react";
import './StoragePane.css'

const StoragePane = ({storage}) => {
  const [val, setVal] = useState();
  const [sufix, setSufix] = useState();
  const [widthSize, setWidthSize] = useState();

  useEffect(() => {
    const bytes = storage;
    const sufixes = ["B", "kB", "MB", "GB", "TB"];

    console.log("inside storagePane first useEffect")
    if (storage > 0) { 
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      setVal((bytes / Math.pow(1024, i)).toFixed(1));
      setSufix(sufixes[i]);
    }
    else{
      setVal(0);
      setSufix(sufixes[0]);
    }
  }, [storage]);

  useEffect(() => {
    console.log("inside storagePane second useEffect")
    if(!(sufix === "kB" || sufix === "B"))
      setWidthSize(Math.floor((val / 35) * 100));
    else setWidthSize(1)
  }, [val])
  console.log(`widthSize: ${widthSize}`)

  // useEffect(() => {
  //   const storageFill = document.getElementById("storage-fill")
  //   const temp = '"' + widthSize +'%"';
  //   console.log(temp)
  //   storageFill.style.width = `${widthSize}px`
  // }, [widthSize])
  


  // const styleCss = {
  //   width: `${widthSize}px`
  // }

  return (
    <div className='storage-container'>
      <div className="storage-counter-container">
      <label className='storage-label'>Storage usage</label>
      <div className="counter-text">
        <span>
          {val} {sufix}/35 MB used
        </span>
      </div>
      <div className="storage-bar">
        <div
          id="storage-fill"
          style={{width: `${widthSize}%`}}
        >
          |
        </div>
      </div>
        </div>
    </div>
  )
}

export default StoragePane