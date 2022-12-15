import './App.css';
import {useState} from "react";

function Paging() {

    const [output, setOutput] = useState(false);
    const [addressable, setAddressable] = useState(NaN);
    const [numPages, setNumPages] = useState(NaN);
    const [VPN, setVPN] = useState(NaN);
    const [offset, setOffset] = useState(NaN);
    const [PTE, setPTE] = useState(NaN);
    const [bytesPT, setBytesPT] = useState(NaN);
    const [pagesPT, setPagesPT] = useState(NaN);
    const [PTEperPage, setPTEperPage] = useState(NaN);
    const [PDE, setPDE] = useState(NaN);
    const [PDI, setPDI] = useState(NaN);
    const [PTI, setPTI] = useState(NaN);
    const [bytesPD, setBytesPD] = useState(NaN);
    const [pagesPD, setPagesPD] = useState(NaN);

    function handleSubmit(event) {
        event.preventDefault()

        let pageBits = 0;
        let virtual = parseInt(event.target.virtual.value);
        let pageSize = event.target.pageSize.value.toLowerCase();
        let pte = Math.log2(parseInt(event.target.pte.value));
        let pde = Math.log2(parseInt(event.target.pde.value));

        if (pageSize.includes("kb")) {
            pageSize = pageSize.split("kb")[0];
            pageBits = 10;
        } else if (pageSize.includes("mb")) {
            pageSize = pageSize.split("mb")[0];
            pageBits = 20;
        }

        pageSize = Math.log2(parseInt(pageSize)) + pageBits;
        let _addressable = virtual;
        let _numPages = _addressable - pageSize;
        let _VPN = _numPages;
        let _offset = virtual - _VPN;
        let _PTE = _numPages;
        let _bytesPT = _PTE + pte;
        let _pagesPT = _bytesPT - pageSize;
        let _PTEperPage = pageSize - pte;
        let _PDE = _PTE - _PTEperPage;
        let _PDI = _PDE;
        let _PTI = _VPN - _PDI;
        let _bytesPD = _PDE + pde;
        let _pagesPD = _bytesPD - pageSize;

        setAddressable(_addressable);
        setNumPages(_numPages);
        setVPN(_VPN);
        setOffset(_offset);
        setPTE(_PTE);
        setBytesPT(_bytesPT);
        setPagesPT(_pagesPT);
        setPTEperPage(_PTEperPage);
        setPDE(_PDE);
        setPDI(_PDI);
        setPTI(_PTI);
        setBytesPD(_bytesPD);
        setPagesPD(_pagesPD);

        setTimeout(() => setOutput(true), 100);
    }

    return (
        <form onSubmit={handleSubmit} className={"form d-flex-col-l gap-10 p-5"}>
            <h1 className={"fw-100"}>OS Final <b>Paging</b></h1>
            <div className={"thin full-length line"}/>
            <h2 className={"fw-500"}>Input</h2>
            <ul className={"full-length d-flex-col-l gap-10"}>
                <li className={"d-flex jc-sb w-40"}>
                    <label htmlFor={"virtual"}>Virtual Bits</label>
                    <input type={"number"} name={"virtual"} placeholder={"Bits"} required/>
                </li>
                <li className={"d-flex jc-sb w-40"}>
                    <label htmlFor={"pageSize"}>Page Size</label>
                    <input type={"text"} name={"pageSize"} placeholder={"Bytes"} required/>
                </li>
                <p>Can specify KB/MB if needed (ie "4KB" or "4MB")</p>
                <li className={"d-flex jc-sb w-40"}>
                    <label htmlFor={"pte"}>PTE Bytes</label>
                    <input type={"number"} name={"pte"} placeholder={"Bytes"} required/>
                </li>
                <li className={"d-flex jc-sb w-40"}>
                    <label htmlFor={"pde"}>PDE Bytes</label>
                    <input type={"number"} name={"pde"} placeholder={"Bytes"} required/>
                </li>
            </ul>


            {output &&
                <div className={"d-flex-col-l gap-10"}>
                    <h2 className={"fw-500"}>Output</h2>
                    <ol className={"d-flex-col-l gap-10"}>
                        <li>Addressable Bytes: <b>2^{addressable}</b></li>
                        <li>Number of Pages: <b>2^{numPages}</b></li>
                        <li>Number of VPN Bits: <b>{VPN}</b></li>
                        <li>Number of Offset Bits: <b>{offset}</b></li><br/>
                        <li>Number of PTEs: <b>2^{PTE}</b></li>
                        <li>Number of Bytes for PT: <b>2^{bytesPT}</b></li>
                        <li>Number of Pages for PT: <b>2^{pagesPT}</b></li>
                        <li>Number of PTEs per Page: <b>2^{PTEperPage}</b></li><br/>
                        <li>Number of PDEs: <b>2^{PDE}</b></li>
                        <li>Number of Bits in Index PD: <b>{PDI}</b></li>
                        <li>Number of Bits in Index PT: <b>{PTI}</b></li>
                        <li>Number of Bytes for PD: <b>2^{bytesPD}</b></li>
                        <li>Number of Pages for PD: <b>{Math.ceil(Math.pow(2, pagesPD))}</b></li>
                    </ol>
                    <p>PDE = "Page Directory Entry" PD = "Page Directory" PTE = "Page Table Entry" PT = "Page Table"</p><br/>
                </div>
            }
            <input type="submit" value={"Submit"}/>
        </form>
    );
}

export default function App() {
    return (
        <div className={"App d-flex-col-c gap-40"}>
            <Paging/>
        </div>
    );
}

