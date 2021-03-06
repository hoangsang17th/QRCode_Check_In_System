import React, { useState, useContext, useEffect } from 'react'
import HeaderBar from '../components/HeaderBar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import QrReader from 'react-qr-reader'
import Select from 'react-select'
import {PortsContext} from "../context/PortsContext"
import {TicketsContext} from "../context/TicketsContext"
import {TypesContext} from "../context/TypesContext"
import axios from "axios";
import { apiUrl } from "../context/constants";

function Scan() {
    let portsOptions = []
    const {portState: {ports, portsLoading}, getPorts} = useContext(PortsContext)
    // const {typesState: {typess}, getTypeById} = useContext(TypesContext)
    useEffect(() => getPorts(), [3])
    if(!portsLoading){
        ports.map(
            port => (
               portsOptions.push({ value: port._id, label: port.portName })
            )
        )
        
    }
    // const {ticketState: {ticket}, getTicketById} = useContext(TicketsContext)
    const [port, setPorts] = useState([])
    const [qrData, setQRData ]= useState("")
    const [ticket, setTicket ]= useState("")
    const [type, setType ]= useState("")

    const [endResult, setEndResult] = useState(false)
    // useEffect(() => {
    //     getTicketById(ticketId)
    //     getTypeById(ticket.ticketType)
    // }, [ticketId])
    // useEffect(() => {
    //     getTypeById(ticket.ticketType)
    //     if(typess != ""){
    //         alert(typess.typePorts.length)
    //         for(var i =0; typess.typePorts.length; i++){
                // if(typess.typePorts[i]._id === port.value){
                //     if(typess.typePorts[i].portStatus){
                //         setEndResult(true)
                //         alert("Wish you happy gaming!")
                //     }
                //     else {
                //         alert("This game is under maintenance. Sorry for this problem!")
                //     }
                // }
    //         }
    //     }
    // }, [ticket.ticketType])
    const HandleScan = async data => {
        if(data) {
            setEndResult(false)
            setQRData(data)
            var ticketId = data.replace("https://phamhoangsang.tech/Tickets?id=", "")
            
            const getTicketById = () => { axios.get(`${apiUrl}/Tickets/view/${ticketId}`).then(res => setTicket(res.data))}
            await getTicketById()
            // await axios.get(`${apiUrl}/Types/view/${ticket.ticketType}`).then(data => setType(data.data))
            // alert(port.value)
            // ??? ????y g???i l??m getTicket ra v?? truy???n id c???a v?? ???? l???y ???????c
            
            // await getTicketById(ticketId)
            // Khi m?? l???y xong r???i th?? n?? v???n ch??a c?? d??? li???u m???i v??o
            // N?? v???n hi???n th??? d??? li???u c?? tr?????c ????
            // Ngh??a l?? n?? ch???m h??n 1 b?????c
            // alert("ID "+ticket._id+" \nStatus: "+ticket.ticketStatus+"\nType: "+ticket.ticketType)
            if(ticket._id  === ticketId){
                // N???u c?? d??? li???u v?? d??? li???u hi???n t???i kh???p v???i id v?? th?? ti???p t???c ki???m tra
                // Ki???m tra t??nh tr???ng v?? l?? true hay false
                if(ticket.ticketStatus){
                    // N???u v?? c??n h???p l???
                    // G???i h??m ki???m tra th??? lo???i v?? v?? ????a ra c??c lo???i c???ng h???p l???
                    // await getTypeById(ticket.ticketType)
                    const getTypeById = () => { axios.get(`${apiUrl}/Types/view/${ticket.ticketType}`).then(res => setType(res.data))}
                    await getTypeById()
                    
                    if(type.typeStatus){
                        // var portData = typess.typePorts.map(port => ({_id: port._id, portName: port.portName, portStatus: port.portStatus}))
                        // var portData = type.typePorts.map(
                        //     typePortData => ({
                        //         id: typePortData._id, 
                        //         status: typePortData.portStatus
                        //     })
                        // )
                        // for(var i =0; type.typePorts.length; i++){
                        //     if(type.typePorts[i] === port.value){
                                // if(type.typePorts_Status[i]){
                                    setEndResult(true)
                                    alert("Wish you happy gaming!")
                                // }
                                // else {
                                //     alert("This game is under maintenance. Sorry for this problem!")
                                // }
                        //     }
                        // }
                    // console.log("Hello "+ type.typePorts)
                    // alert("Wish you happy gaming!")
                    
                    // if(!endResult){
                    //     alert("Your ticket does not include this game!")
                    // }
                    }
                    else {
                        alert("The type of ticket you purchased has been temporarily locked. Please contact the staff closest to you for assistance")
                    }
                }
                else{
                    // N???u false tr??? v??? k???t qu??? "V?? ???? h???t h???n (false)"
                    alert("Tickets have expired please contact management for support!")
                }
            }
            else {
                alert("Invalid ticket!")
            }
            // alert(ticket.ticketType)
        
        // _id, ticketStatus, ticketType
        
        
        // C??n l???i l?? true th?? s??? ki???m tra c???ng v??o v?? ph??n t??ch s??? c???ng h???p l??? d???a tr??n th??? lo???i v??
        // N???u h???p l??? ????a ra k???t qu??? "Ch??o m???ng b???n ?????n v???i tr?? ch??i ... (true)"
        // Kh??ng h???p l??? th?? ????a ra k???t qu??? "V?? kh??ng th??? d??ng cho lo???i tr?? ch??i n??y (false)"
        }
    }
    
    // useEffect(() => setTimeout(function(){ setEndResult(false) }, 5000))
    useEffect(() => endResult)
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
                                onScan={HandleScan}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-8">
                        <div className="widget-content widget-content-area br-6">
                            <p className="h6 mt-2">PORT:</p>
                            <hr class="dropdown-divider"/>
                            <Select 
                            onChange={setPorts}
                            options={portsOptions} 
                            className=" mt-2"
                            />

                            <p className="h6 mt-5">DATA FROM QRCODE:</p>
                            <hr class="dropdown-divider"/>
                            <p className=" mt-2">{qrData}</p>

                            <p className="h6 mt-5 ">RESULTS:</p>
                            <hr class="dropdown-divider"/>
                            <p className="mt-2">{endResult.toString()}</p>
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
