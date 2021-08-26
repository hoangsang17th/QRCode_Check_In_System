import $ from 'jquery'; 
import React, {useContext, useEffect} from 'react'
import HeaderBar from '../components/HeaderBar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import {UsersContext} from "../context/UsersContext"
function Users() {
    const {userState: {users, usersLoading}, getUsers} = useContext(UsersContext)
    useEffect(() => getUsers(), [10000])
    let loadData = false
    let body
    let number = 1
    if(!usersLoading){
        body = 
        <>
        {users.map(
            user => (
            <tr>
                <td>{number++}</td>
                <td>{user.userEmail}</td>
                <td>{user.userName}</td>
                <td>{user.userPosition}</td>
                <td>{user.userAddress}</td>
                <td className="justify-content-end text-right">
                    <div className="d-flex justify-content-end col-actions">
                        {user.userStatus ? 
                            <div className='mx-1 badge badge-success'>
                                Active 
                            </div> :
                            <div className='mx-1 badge badge-danger'>
                                Deactivated 
                            </div> 
                        }
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
            <div id="content" class="main-content">
                <div class="layout-px-spacing">
                
                <div className="modal fade Type-modal" id="TypeModal" tabindex="-1" role="dialog" aria-labelledby="TypeModalLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-xls" role="document">
                        <div className="modal-content">
                            <div className="modal-header" id="TypeModalLabel">
                                <h4 className="modal-title">User</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                            </div>
                            <form action="" method="post">
                            <div className="modal-body" id="Type-content Type">
                               
                                    <div className="row mt-2">
                                        <div className="col-12 mt-2">
                                            <input type="email" className="form-control" placeholder="Email" required />
                                        </div>
                                        <div className="col-12 mt-2">
                                            <input type="name" className="form-control" placeholder="Name" required />
                                        </div>
                                       
                                        <div className="col-12 mt-2">
                                            <select className="form-control" >
                                                <option value="">Staff</option>
                                                <option value="">System </option>
                                                <option value="">Manager </option>
                                            </select>
                                        </div>
                                        <div className="col-12 mt-2">
                                            <select className="form-control" >
                                                <option value="">Active</option>
                                                <option value="">DeActivated </option>
                                            </select>
                                        </div>
                                    </div>
                                
                            </div>
                            <div className="modal-footer justify-content-center ">
                                
                                <button type="button" data-dismiss="modal" aria-hidden="true" className="btn btn-outline-danger ">Cancel</button>
                                <button type="submit" className="btn btn-outline-primary">Add User</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div className="row layout-top-spacing" id="cancel-row">
                    
                    <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div className="widget-content widget-content-area br-6">
                            <div className="row justify-content-end">
                                <div className="col-md-3 col-12">
                                    <button className="btn btn-outline-primary form-control" data-toggle="modal" data-target="#TypeModal">New User</button>
                                </div>
                            </div>
                            <div className="table-responsive mb-4 mt-4">
                                <table id="dataTable" className="table table-hover non-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Email</th>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Address</th>
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

export default Users