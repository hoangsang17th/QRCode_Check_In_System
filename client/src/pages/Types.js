import $ from 'jquery'; 
import React, {useContext, useEffect, useState} from 'react'
import HeaderBar from '../components/HeaderBar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import Select from 'react-select';
import {TypesContext} from "../context/TypesContext"
import {PortsContext} from "../context/PortsContext"


function Types() {
    let portsOptions = []
    const {typesState: {types, typesLoading}, getTypes, createType} = useContext(TypesContext)
    const {portState: {ports, portsLoading}, getPorts} = useContext(PortsContext)
    useEffect(() => getTypes(), [2])
    useEffect(() => getPorts(), [1])
    var portsLoadingData = portsLoading
    if(!portsLoadingData){
        ports.map(
            port => (
               portsOptions.push({ value: port._id, label: port.portName })
            )
        )
        portsLoadingData = !portsLoadingData
    }
    const [arrPort, setPorts] = useState([])
    const [typeName, setName] = useState("")
    const [typePrice, setPrice] = useState("")
    const [typeStatus, setStatus] = useState(true)
    const onChangeName = event => setName(event.target.value)
    const onChangePrice = event => setPrice(event.target.value)
    const onChangeStatus = event => setStatus(event.target.value)
    const typeForm = async event => {
        event.preventDefault()
        var typePorts = []
        try {
            var arrSelect = arrPort.map(port => ({_id:port.value}))
            for(var i = 0;i<arrSelect.length;i++) {
                typePorts.push(arrSelect[i]._id)
            }
            const typeData = await createType({typeName, typePrice, typePorts, typeStatus})   
            if(typeData.success){
                alert("Ticket add success")
                document.getElementById("cancel").click();
                
                typeName = ""
                typePrice = ""
                typePorts = ""
                typeStatus = true
                
                alert("OK")
            }
            else {
                alert("Ticket Name is required")
            }
            
            // history.go(0)
        } catch (error) {
            console.log("FinTEST" + error.message)
        }
               
    }

    
    let loadData = false
    let body
    let number = 1
    if(!typesLoading){
        
        body = 
        <>
        {types.map(
            type => (
            <tr>
                <td>{number++}</td>
                <td>{type.typeName}</td>
                <td>{type.typePrice}</td>
                <td>({type.typePorts.length}) {type.typePorts.map(port => (port.portName+", "))}</td>
                <td className="justify-content-end text-right">
                    <div className="d-flex justify-content-end col-actions">
                        {type.typeStatus ? 
                            <div className='mx-1 badge badge-success'>
                                Activities
                            </div> :
                            <div className='mx-1 badge badge-danger'>
                                Block
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
                                <h4 className="modal-title">Type</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                            </div>
                            <form onSubmit={typeForm}>
                            <div className="modal-body" id="Type-content Type">
                               
                                    <div className="row mt-2">
                                        <div className="col-12 mt-2">
                                            <input onChange={onChangeName} name="typeName" type="name" className="form-control" placeholder="Name" required />
                                        </div>
                                        <div className="col-12 mt-2">
                                            <input onChange={onChangePrice} name="typePrice" type="number" className="form-control" placeholder="Price" required />
                                        </div>
                                        <div className="col-12 mt-2">
                                            <select onChange={onChangeStatus} name="typeStatus" className="form-control" >
                                                <option value="true">Activities</option>
                                                <option value="false">Block </option>
                                            </select>
                                        </div>
                                        <div className="col-12 mt-2">
                                            <Select
                                                onChange={setPorts}
                                                // value={typePorts}
                                                options={portsOptions}
                                                isMulti
                                            />
                                        </div>
                                    </div>
                                
                            </div>
                            <div className="modal-footer justify-content-center ">
                                
                                <button type="button" id="cancel" data-dismiss="modal" aria-hidden="true" className="btn btn-outline-secondary ">Cancel</button>
                                <button type="submit" className="btn btn-outline-primary">Add Type</button>
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
                                    <button className="btn btn-outline-primary form-control" data-toggle="modal" data-target="#TypeModal">New Type</button>
                                </div>
                            </div>
                            <div className="table-responsive mb-4 mt-4">
                                <table id="dataTable" className="table table-hover non-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Ports</th>
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

export default Types
