import React, { useState } from 'react';

import _ from 'lodash';
import copy from 'copy-to-clipboard';
import InputExcel from './InputExcel';
import DownloadJson from './DownloadJson';
import { saveAs } from 'file-saver';

function Body(props) {
    // props.pcPro là thuoc tinh pc
    const [Items, setItems] = useState([]);
    const [FileName, setFileName] = useState("");


    // var FileSaver = require('file-saver');


    // if (Items.length !== 0) {
    //     for (let i = 0; i < Items.length; i++) {

    //         FileSaver.saveAs(Items[i].b, Items[i].a);


    //     }
    // }
    console.log(Items);
    return (
        <React.Fragment>

            <div>
                {/* in [ut nhập excel] */}
                <InputExcel changeInputItems={(items) => { setItems(items) }} changeFileName={(param) => { setFileName(param) }} />
                <DownloadJson items={Items} />
                {Items.map(item => <img src={item.b} className="img-src"></img>)}



         

            </div>


        </React.Fragment >
    );
}

export default Body;