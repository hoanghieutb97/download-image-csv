
import React from 'react';
import XLSX from 'xlsx';
import _ from 'lodash';
// import * as type from "../constants";

function InputExcel(props) {

  let ProcessExcel = (data) => {
    var workbook = XLSX.read(data, {
      type: 'binary'
    });
    let dataExcel = workbook.Sheets.Sheet1;
    let rickDataExcel = {
      "Sheet1": []
    };
    for (let j = 0; j <= 20000; j++) {
      let rawPick = _.pick(dataExcel, [`A${j}`, `B${j}`]);
      if (_.size(rawPick) >= 2) {


        let rickPick = {}
          rickPick = {
            a: rawPick[`A${j}`].w,
            b: rawPick[`B${j}`].w
          }
        
        rickDataExcel.Sheet1.push(rickPick);
      }
    }
// console.log(rickDataExcel.Sheet1);
    props.changeInputItems(rickDataExcel.Sheet1);

  };



  let readSingleFile = (e) => {
    let fileName = e.target.files[0].name;

    props.changeFileName(fileName.slice(0, fileName.length - 5));
    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\(\)\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(e.target.value.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
        var reader = new FileReader();
        //For Browsers other than IE.
        if (reader.readAsBinaryString) {
          reader.onload = function (e) {
            // console.log(e.target.result);
            ProcessExcel(e.target.result);
          };
          reader.readAsBinaryString(e.target.files[0]);
        } else {
          //For IE Browser.
          reader.onload = function (e) {
            var data = "";
            var bytes = new Uint8Array(e.target.result);
            for (var i = 0; i < bytes.byteLength; i++) {
              data += String.fromCharCode(bytes[i]);
            }
            ProcessExcel(data);
          };
          reader.readAsArrayBuffer(e.target.files[0]);
        }
      } else {
        alert("This browser does not support HTML5.");
      }
    } else {
      alert("Please upload a valid Excel file.");
    }
  }
  return (
    <div className="d-flex justify-content-center">
      <input type="file" id="fileinput" className="btn btn-warning" onChange={readSingleFile} style={{ display: "none" }} />
      <label htmlFor="fileinput" className="input_exel_file btn btn-warning">File Excel</label>

    </div>
  );
}

export default InputExcel;

