import React, { Component } from 'react'
import HeaderBar from '../components/HeaderBar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import QrReader from 'react-qr-reader'
import Select from 'react-select'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
class Scan extends Component {
    
    state = {
        result: 'No Data'
    }
    
    handleScan = data => {
        if (data) {
            this.setState({
                result: data
            })
        }
    }
    handleError = err => {
        console.error(err)
    }
    render(){
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
                                delay={this.state.delay}
                                onError={this.handleError}
                                // style={previewStyle}
                                className={'w-100'}
                                onScan={this.handleScan}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-8">
                        <div className="widget-content widget-content-area br-6">
                            <p className="h6 mt-2">PORT:</p>
                            <hr class="dropdown-divider"/>
                            <Select 
                            options={options} 
                            className=" mt-2"
                            />

                            <p className="h6 mt-3">DATA FROM QRCODE:</p>
                            <hr class="dropdown-divider"/>
                            <p className=" mt-2">{this.state.result}</p>

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
}
export default Scan
