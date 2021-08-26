import React, { useState, useContext, useEffect } from 'react'
import HeaderBar from '../components/HeaderBar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import QrReader from 'react-qr-reader'
import Select from 'react-select'
import {PortsContext} from "../context/PortsContext"



function Scan() {
    let portsOptions = []
    const {portState: {ports, portsLoading}, getPorts} = useContext(PortsContext)
    useEffect(() => getPorts(), [10000])
    if(!portsLoading){
        ports.map(
            port => (
               portsOptions.push({ value: port._id, label: port.portName })
            )
        )
        
    }
    const [qrData, setQRData ]= useState("")
    const handleScan = data => {
        if(data){
            setQRData(data)
        }
    }
    
    return (
        <div>
        <HeaderBar />
            <div className="main-container" id="container">
            <div className="overlay"></div>
            <TopBar />
            <div id="content" class="main-content">
                <div class="layout-px-spacing">
                
                <div className="row layout-top-spacing">
                    <div className="col-md-6 col-xl-4 layout-spacing">
                        <div className="widget-content widget-content-area br-6">
                            <QrReader
                                delay={300}
                                className={'w-100'}
                                onScan={handleScan}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-8">
                        <div className="widget-content widget-content-area br-6">
                            <p className="h6 mt-2">PORT:</p>
                            <hr class="dropdown-divider"/>
                            <Select 
                            options={portsOptions} 
                            className=" mt-2"
                            />

                            <p className="h6 mt-3">DATA FROM QRCODE:</p>
                            <hr class="dropdown-divider"/>
                            <p className=" mt-2">{qrData}</p>

                            <p className="h6 mt-5 pt-5">RESULTS:</p>
                            <hr class="dropdown-divider"/>
                            <p className="mt-2">false</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            </div>
        </div>
        </div>
    )

}
export default Scan
