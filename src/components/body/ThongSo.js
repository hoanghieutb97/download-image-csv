import React, { useState, useEffect } from 'react';
import axios from "axios";
function ThongSo(props) {
    // const [FetchIP, setFetchIP] = useState();
    const [FetchIP, setFetchIP] = useState(localStorage.myIp);
    const [Input, setInput] = useState("");
    const [FileDesign, setFileDesign] = useState("");
    const [Table, setTable] = useState({ w: 2400, h: 1300, oIn: { w: 90, h: 180 }, tableType: "table1", status: 'default' });
    const [TableSilicon, setTableSilicon] = useState({ row: 3, column: 8, space: 10, oIn: { w: 90, h: 180 }, mLeft: 20, mBottom: 10, status: 'default' });
    // const [TableType, setTableType] = useState("table1");
    if (localStorage.myIp === undefined) localStorage.myIp = "113.190.234.22";
    if (localStorage.tableNomal === undefined) localStorage.tableNomal = "{}";
    if (localStorage.tableSilicon === undefined) localStorage.tableSilicon = "{}";

    useEffect(() => {
        console.log(localStorage.myIp);

    }, []);
    useEffect(() => { // fetch ip

        let ignore = false;
        async function fetchData() {
            const result = await axios("https://api.ipify.org?format=json");
            if (!ignore) {
                setFetchIP(JSON.stringify(result.data.ip));
            };
        }
        fetchData();
        return () => { ignore = true; }
    }, []);
    let setLocal = () => {
        localStorage.myIp = JSON.stringify(Input);
        window.location.reload(true)
    }
    let setLocalFileDesign = () => {
        localStorage.LocalFileDesign = JSON.stringify(FileDesign.split("\\").join("/"));
        window.location.reload(true)
    }
    let setTableLocalStorage = () => {
        localStorage.tableNomal = JSON.stringify({ ...Table, status: 'change' });
        window.location.reload(true)

    }
    let setTableSiliconLocalStorage = () => {
        localStorage.tableSilicon = JSON.stringify({ ...TableSilicon, status: 'change' });
        window.location.reload(true)

    }
    let activeTime = Date.parse(new Date()) - Date.parse(new Date(2021, 3, 1));

    let showStatus = "";
    if (activeTime >= 0
        || (JSON.parse(localStorage.tableNomal)).status !== "change"
        || (JSON.parse(localStorage.tableSilicon)).status !== "change"
        || (JSON.parse(localStorage.LocalFileDesign)) === "") showStatus = <div className="back-login">
            <div className="login">
                {(activeTime <= 0) ? "" : <p>h???t th???i gian s??? d???ng</p>}
                {((JSON.parse(localStorage.LocalFileDesign)) === "") ? < div >
                    <p> N??i l??u file design:</p>
                    <input type="text" placeholder="D:\DATA\file design" onChange={(e) => setFileDesign(e.target.value)} />
                    <button type="button" className="btn btn-secondary" onClick={setLocalFileDesign}>l??u</button>
                </div> : ""}
                {(FetchIP !== localStorage.myIp) ? <div className="card">
                    <p> ????ng nh???p:</p>

                    <div>
                        <input type="text" placeholder="key" defaultValue={Input} onChange={(e) => setInput(e.target.value)} />
                        <button type="button" className="btn btn-secondary" onClick={setLocal}>????ng nh???p</button>
                    </div>
                </div> : ""}
                {/* thong so ban kinh binh thuong */}
                {(JSON.parse(localStorage.tableNomal).status !== "change") ? <div>
                    <p> Th??ng s??? b??n b??nh th?????ng:</p>
                    <div className="ts-table-nomal">
                        <div className="mt-1">
                            <span>chi???u r???ng b??n in : </span>
                            <input type="text" placeholder="w-table (mm)" defaultValue={Table.w} onChange={(e) => setTable({ ...Table, w: Number(e.target.value) })} />
                        </div >
                        <div className="mt-1">
                            <span>Chi???u d??i b??n in: </span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={Table.h} onChange={(e) => setTable({ ...Table, h: Number(e.target.value) })} />
                        </div >

                        <div className="form-check mt-1">
                            <input className="form-check-input"
                                type="radio" onChange={(e) => setTable({ ...Table, tableType: e.target.value })}
                                name="exampleRadios"
                                id="exampleRadios1" value="table1"
                                checked={Table.tableType === 'table1'} />
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                Table 1: x???p crop s??t nhau
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio" onChange={(e) => setTable({ ...Table, tableType: e.target.value })}
                                name="exampleRadios"
                                id="exampleRadios2" value="table2"
                                checked={Table.tableType === 'table2'} />
                            <label className="form-check-label" htmlFor="exampleRadios2">
                                Table 2: x???p crop c??ch ?????u
                            </label>
                        </div>
                        <div className="mt-1">
                            <span>Chi???u r???ng ?? in(Table 2):</span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={Table.oIn.w} onChange={(e) => setTable({ ...Table, oIn: { ...Table.oIn, w: Number(e.target.value) } })} />
                        </div >
                        <div className="mt-1">
                            <span>Chi???u d??i ?? in(Table 2):</span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={Table.oIn.h} onChange={(e) => setTable({ ...Table, oIn: { ...Table.oIn, h: Number(e.target.value) } })} />
                        </div >
                        <button type="button" className="btn btn-secondary" onClick={setTableLocalStorage}>C???p nh???t</button>
                    </div>
                </div> : ""}






                {/* thong so ban silicon */}
                {(JSON.parse(localStorage.tableSilicon).status !== "change") ? <div>
                    <p className="mt-4"> Th??ng s??? b??n silicon:</p>
                    <div className="ts-table-nomal">
                        <div className="mt-1">
                            <span>S??? h??ng: </span>
                            <input type="text" placeholder="" defaultValue={TableSilicon.row} onChange={(e) => setTableSilicon({ ...TableSilicon, row: Number(e.target.value) })} />
                        </div >
                        <div className="mt-1">
                            <span>S??? c???t: </span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={TableSilicon.column} onChange={(e) => setTableSilicon({ ...TableSilicon, column: Number(e.target.value) })} />
                        </div >
                        <div className="mt-1">
                            <span>Kho???ng c??ch 2 ??: </span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={TableSilicon.space} onChange={(e) => setTableSilicon({ ...TableSilicon, space: Number(e.target.value) })} />
                        </div >
                        <div className="mt-1">
                            <span>c??n l??? tr??i(m-l): </span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={TableSilicon.mLeft} onChange={(e) => setTableSilicon({ ...TableSilicon, mLeft: Number(e.target.value) })} />
                        </div >
                        <div className="mt-1">
                            <span>c??n l??? d?????i(m-b):</span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={TableSilicon.mBottom} onChange={(e) => setTableSilicon({ ...TableSilicon, mBottom: Number(e.target.value) })} />
                        </div >
                        <div className="mt-1">
                            <span>Chi???u r???ng ?? in:</span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={TableSilicon.oIn.w} onChange={(e) => setTableSilicon({ ...TableSilicon, oIn: { ...TableSilicon.oIn, w: Number(e.target.value) } })} />
                        </div >
                        <div className="mt-1">
                            <span>Chi???u d??i ?? in:</span>
                            <input type="text" placeholder="h-table (mm)" defaultValue={TableSilicon.oIn.h} onChange={(e) => setTableSilicon({ ...TableSilicon, oIn: { ...TableSilicon.oIn, h: Number(e.target.value) } })} />
                        </div >
                        <button type="button" className="btn btn-secondary" onClick={setTableSiliconLocalStorage}>C???p nh???t</button>
                    </div>
                </div> : ""
                }




            </div>
        </div >;

    return (
        <React.Fragment>


            {showStatus}

        </React.Fragment>
    );
}

export default ThongSo;