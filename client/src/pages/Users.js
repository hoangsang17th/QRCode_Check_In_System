import $ from 'jquery'; 
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import HeaderBar from '../components/HeaderBar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
function Users() {
    $(document).ready(function() {
        $('#dataTable').DataTable();
    });


    const [res,setRes] = useState([])


    const getRes = () => {
        axios
        .get("http://localhost:7000/api/all_user",{
            // đổi session hoặc cookie lưu token vô đây
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluenhjIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI3MzcwOTYyfQ.Myf3GgjosnkDZQBFV2Q_DbPEsyX2x0z_2KSsOuRf8js"
            }
        })
        .then(res => setRes(res.data))
        .catch(err => console.error(err));
    }

    useEffect(() => {
        setTimeout(() => {
          $('#dataTable').DataTable().destroy();
          getRes();
        },0);
      },[]);

      
    return (
        <div>
        <HeaderBar />
            <div className="main-container" id="container">
            <div className="overlay"></div>
            <TopBar />
            <div id="content" class="main-content">
                <div class="layout-px-spacing">
                <div className="row layout-top-spacing">
                    <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div className="widget-content widget-content-area br-6">
                            <form action="" method="post">
                                <div className="row">
                                    <div className="col-3">
                                        <input type="email" className="form-control" placeholder="Email" required />
                                    </div>
                                    <div className="col-3">
                                        <input type="name" className="form-control" placeholder="Name" required />
                                    </div>
                                    <div className="col-3">
                                        <select className="form-control" required>
                                            <option selected="selected" value="1">Manager</option>
                                            <option value="2">Staff</option>
                                        </select>
                                    </div>
                                    <div className="col-3">
                                        <button className="btn btn-outline-primary btn-block form-control" type="submit">Add</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row" id="cancel-row">
                    <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div className="widget-content widget-content-area br-6">
                            <div className="table-responsive mb-4 mt-4">
                                <table id="dataTable" className="table table-hover non-hover">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {res.map((user) => {
                                                return (
                                                <tr>
                                                    <td>{user.username}</td>
                                                    <td>{user.email}</td>
                                                    <td  style={{textTransform: "uppercase"}}>{user.role}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center col-actions">
                                                            <div className="mx-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                                                            </div>
                                                            <div className="mx-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                                            </div>
                                                            <div className="mx-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                );
                                            })}
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