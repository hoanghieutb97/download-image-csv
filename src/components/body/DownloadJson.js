
import React from 'react';
import _ from 'lodash';

function DownloadJson(props) {
  let rd6 = () => {
    return Math.floor(Math.random() * (99999 - 10000) + 10000);
  }
  let saveTextAsFile = (param) => {
    let paramToText = JSON.stringify(param)
    var textToWrite = paramToText // file contents
    var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    // var fileNameToSaveAs = `day${props.date.dayExcel}_${props.date.mouthExcel}.json`// tên file
    let fileNameToSaveAs = `${rd6()}.json`;
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    downloadLink.click();
  }


  let items = JSON.parse(JSON.stringify(props.items));
 
  let strWrite = {
    items: items
  };

  return (
    <div className="d-flex justify-content-center">
      <button type="button" className="btn btn-secondary  dlp"
        onClick={() => saveTextAsFile(strWrite)}
        style={{ color: "white" }}
      >
        Download JSON
    </button>
    </div>

  );
}

export default DownloadJson;