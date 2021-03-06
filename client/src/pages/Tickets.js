import $ from 'jquery'; 
import HeaderBar from '../components/HeaderBar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import logo from '../logo.svg';
import QRCode from 'qrcode.react'
import React, {useContext, useEffect, useState} from 'react'
import {TicketsContext} from "../context/TicketsContext"
import { AuthContext } from '../context/AuthContext'
import {TypesContext} from "../context/TypesContext"

function Tickets(){
    function printTicket(){
        window.print();
    }
    // Xác minh quyền hạn
    const {authState: { user: {userPosition}}} = useContext(AuthContext)
    // Gọi các hàm liên quan đến dữ liệu hiển thị và sử dụng
    const {ticketState: {tickets, ticketsLoading}, 
            getTicketsStaff, 
            getTicketsManager, 
            createTicket
        } = useContext(TicketsContext)
    // Gọi hàm để hiển thị dữ liệu loại vé
    const {typesState: {types}, getTypes} = useContext(TypesContext)
    // Dựa vào phân quyền phía trên để phân loại dữ liệu hiển thị
    // Nếu mà nhân viên thì chỉ cho xem dữ liệu của chính bản thân
    // Nếu là Manager thì cho hiển thị tất cả dữ liệu của cả nhân viên và manager
    useEffect(() => userPosition === "Manager"? getTicketsManager() : getTicketsStaff(), [3])
    // Gọi hàm hiển thị thể loại vé
    useEffect(() => getTypes(), [3])
    // Có lẽ ngay đây gọi ra 1 hàm lấy 1 ID thể loại đầu tiên :))
    const [newTicket, setNewTicket] = useState({
        ticketCustomer: "",
        ticketType: ""
    })
    const {ticketCustomer, ticketType} = newTicket
    const onChangeForm = event => 
    // Lấy dữ liêu dựa vào name của input
    setNewTicket({ ...newTicket, [event.target.name]: event.target.value})
    // Nhập dữ liệu mới xong cho nó load lại trang
    // alert("Ticket add success")
    const ticketForm = async event => {
        event.preventDefault()
        try {
            const ticketData = await createTicket(newTicket)
            
            if(ticketData.success){
                alert("Ticket add success")
                setNewTicket({
                    ticketCustomer: "",
                    ticketType: ""
                })
            }
            else {
                alert("Ticket Name is required")
            }
            // Nếu mà thêm vào thành công thì xóa hết dữ liệu trong form
            
            // document.getElementById("cancel").click();
            // history.go(0)
        } catch (error) {
            console.log("FinTEST" + error.message)
        }
               
    }
    let loadData = false
    let body
    
    if(!ticketsLoading){
        body = 
        <>
        {tickets.map(
            ticket => (
            <tr>
                <td>{ticket._id}</td>
                <td>{ticket.ticketCustomer}</td>
                <td>{ticket.ticketType.typeName }</td>
                <td>{ticket.ticketPrice}</td>
                <td>{ticket.createdAt }</td>
                <td>{ticket.ticketUser.userName } {userPosition === "Manager"? "("+ticket.ticketUser.userPosition+")" : "" }</td>
                <td className="justify-content-end text-right">
                    <div className="d-flex justify-content-end col-actions">
                        {ticket.ticketStatus ? 
                            <div className='mx-1 badge badge-success'>
                                Active
                            </div> :
                            <div className='mx-1 badge badge-danger'>
                                Deactivated
                            </div> 
                        }
                        <div className="mx-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-printer"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                        </div>
                        <div className="mx-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </div>
                        <div className="mx-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                        </div>
                    </div>
                </td>
            </tr>
        ))}
        </>
        loadData = true
    }
    if(loadData){
        $(document).ready(function () {
            $('#dataTable').DataTable();
        });
    }
    return (
        <div>
        <HeaderBar />
            <div className="main-container" id="container">
            <div className="overlay"></div>
            <TopBar />
            <div id="content" className="main-content">
            <div className="layout-px-spacing">
                <div className="row layout-top-spacing" id="no-print">
                    <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div className="widget-content widget-content-area br-6">
                            <form onSubmit={ticketForm}>
                                <div className="row">
                                    <div className="col-4">
                                        <input onChange={onChangeForm} name="ticketCustomer" value={ticketCustomer} type="name" className="form-control" placeholder="Name/ Phone" required />
                                    </div>
                                    <div className="col-4">
                                        <select onChange={onChangeForm} name="ticketType" value={ticketType} className="form-control" required>
                                            <option value="">Select...</option>

                                        {
                                            types.map(
                                                type => 
                                                <option value={type._id}>{type.typeName}</option>
                                            )   
                                        }
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-outline-primary btn-block form-control">
                                            Xuất Vé
                                        </button>
                                        <button hidden data-toggle="modal" data-target="#printModal">
                                            Xuất Vé
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade ticket-modal" id="printModal" tabindex="-1" role="dialog" aria-labelledby="printModalLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-xls" role="document">
                        <div className="modal-content">
                            <div className="modal-header" id="printModalLabel">
                                <h4 className="modal-title">Ticket</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                            </div>
                            <div className="modal-body" id="ticket-content print">
                                <div class="row">
                                    <div className="col-12 text-center">
                                        <img src={logo} className="img-thumbnail" alt="Logo QRCode" style={{width: 50, height: 50}}/>
                                    </div>
                                    <div className="col-12 text-center mt-3">
                                        <p className="h4  text-uppercase">Asia Park</p>
                                    </div>
                                </div>
                                <div className="row mt-2 text-center">
                                    <div className="col-12">
                                        <QRCode
                                            className="img-thumbnail"
                                            value='All our dreams can come true, if we have the courage to pursue them.'
                                            // value='https://phamhoangsang.tech/Tickets?id=612ced9d7855713b68850b36'
                                            
                                            size={240}
                                            level={'H'}
                                            // includeMargin={true}
                                        />
                                    </div>
                                </div>
                                <div class="row mt-4 px-5">
                                    <div className="col-5">Ticket ID:</div>
                                    <div className="col-7">VKU_17</div>
                                    <div className="col-5">Customer:</div>
                                    <div className="col-7">Phạm Hoàng Sang</div>
                                    <div className="col-5">Ticket Type:</div>
                                    <div className="col-7">VIP 1</div>
                                    <div className="col-5">Staff:</div>
                                    <div className="col-7">Hoàng Thủy</div>
                                    <div className="col-5">Date:</div>
                                    <div className="col-7">15:46:37 31/07/2021</div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center print">
                                <div className="">
                                    <span>Designed by Hoàng Sang</span>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center" id="no-print">
                                <button type="button" onClick={printTicket} className="btn btn-primary mt-2 mb-2 btn-block">Print</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-1" id="no-print">
                    <div className="col-xl-12 col-lg-12 col-sm-12">
                        <div className="widget-content widget-content-area br-6">
                            <div className="table-responsive mb-4 mt-4">
                                <table id="dataTable" className="table table-hover non-hover ">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Type</th>
                                            <th>Price</th>
                                           
                                            <th>Date</th>
                                            <th>Staff</th>
                                            <th className="text-right">More</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {body}
                                    </tbody>
                                </table>
                            </div>
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

export default Tickets
