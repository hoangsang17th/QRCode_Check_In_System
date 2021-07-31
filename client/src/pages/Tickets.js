import $ from 'jquery'; 
import HeaderBar from '../components/HeaderBar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import {Redirect} from 'react-router-dom';
import logo from '../logo.svg';
import QRCode from 'qrcode.react'

function Tickets(){
    function printTicket(){
        window.print();
    }
    $(document).ready(function () {
        $('#dataTable').DataTable();
    });
    
    var auth = true
    if(auth){
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
                            <form action="" method="post">
                                <div className="row">
                                    <div className="col-4">
                                        <input type="name" className="form-control" placeholder="Phone or Name" required />
                                    </div>
                                    <div className="col-4">
                                        <select className="form-control" required>
                                            <option selected="selected" value="1">Ticket 1</option>
                                            <option value="2">Ticket 2</option>
                                            <option value="3">Ticket 3</option>
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <button type="button" className="btn btn-outline-primary btn-block form-control" data-toggle="modal" data-target="#printModal">
                                            Add
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
                                        <p className="h4  text-uppercase">QR Code VKU</p>
                                    </div>
                                </div>
                                <div className="row mt-2 text-center">
                                    <div className="col-12">
                                        <QRCode
                                            className="img-thumbnail"
                                            value='All our dreams can come true, if we have the courage to pursue them.'
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
                                            <th>Date</th>
                                            <th>Staff</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>13</td>
                                            <td>Tiger Nixon</td>
                                            <td>Ticket 1</td>
                                            <td>2011/04/25</td>
                                            <td>Hoàng Sang</td>
                                            <td>
                                                <div className="d-flex align-items-center col-actions">
                                                    <div className="mx-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-printer"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                                                    </div>
                                                    <div className="mx-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                                    </div>
                                                    <div className="mx-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>17</td>
                                            <td>Garrett Winters</td>
                                            <td>Ticket 2</td>
                                            <td>2011/07/25</td>
                                            <td>Hoàng Sang</td>
                                            <td>
                                                <div className="d-flex align-items-center col-actions">
                                                <div className="mx-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-printer"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                                                </div>
                                                <div className="mx-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                                </div>
                                                <div className="mx-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                                                </div>
                                                </div>
                                            </td>
                                        </tr>
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
    else {
        return <Redirect to="/Login" />
    }
}

export default Tickets
