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
            
            await axios.get(`${apiUrl}/Tickets/view/${ticketId}`).then(viewTicket => setTicket(viewTicket))
            // await axios.get(`${apiUrl}/Types/view/${ticket.ticketType}`).then(data => setType(data.data))
            // alert(port.value)
            // Ở đây gọi làm getTicket ra và truyền id của vé đã lấy được
            
            // await getTicketById(ticketId)
            // Khi mà lấy xong rồi thì nó vẫn chưa có dữ liệu mới vào
            // Nó vẫn hiển thị dữ liệu cũ trước đó
            // Nghĩa là nó chậm hơn 1 bước
            alert("ID "+ticket._id+" \nStatus: "+ticket.ticketStatus+"\nType: "+ticket.ticketType)
            if(ticket._id  === ticketId){
                // Nếu có dữ liệu và dữ liệu hiện tại khớp với id vé thì tiếp tục kiểm tra
                // Kiểm tra tình trạng vé là true hay false
                if(ticket.ticketStatus){
                    // Nếu vé còn hợp lệ
                    // Gọi hàm kiểm tra thể loại vé và đưa ra các loại cổng hợp lệ
                    // await getTypeById(ticket.ticketType)

                    
                    // var portData = typess.typePorts.map(port => ({_id: port._id, portName: port.portName, portStatus: port.portStatus}))
                        // var portData = typess.typePorts.map(
                        //     typePortData => ({
                        //         _id: typePortData._id, 
                        //         status: typePortData.portStatus
                        //     }))
                            // for(var i =0; typess.typePorts.length; i++){
                            //     console.log(typess.typePorts[i])
                                // if(typess.typePorts[i]._id === port.value){
                                //     if(typess.typePorts[i].portStatus){
                                //         setEndResult(true)
                                //         alert("Wish you happy gaming!")
                                //     }
                                //     else {
                                //         alert("This game is under maintenance. Sorry for this problem!")
                                //     }
                                // }
                            // }
                    // console.log("Hello "+ type.typePorts)
                    // alert("Wish you happy gaming!")
                    
                    // if(!endResult){
                    //     alert("Your ticket does not include this game!")
                    // }
                }
                else{
                    // Nếu false trả về kết quả "Vé đã hết hạn (false)"
                    alert("Tickets have expired please contact management for support!")
                }
            }
            else {
                alert("Invalid ticket!")
            }
            // alert(ticket.ticketType)
        
        // _id, ticketStatus, ticketType
        
        
        // Còn lại là true thì sẽ kiểm tra cổng vào và phân tích số cổng hợp lệ dựa trên thể loại vé
        // Nếu hợp lệ đưa ra kết quả "Chào mừng bạn đến với trò chơi ... (true)"
        // Không hợp lệ thì đưa ra kết quả "Vé không thể dùng cho loại trò chơi này (false)"
        }
    }
    
    useEffect(() => setTimeout(function(){ setEndResult(false) }, 5000))
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
