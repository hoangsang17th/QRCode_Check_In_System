import React, { Component } from 'react'
import HeaderBar from '../components/HeaderBar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import QrReader from 'react-qr-reader'
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
                            <p className="h4">QR-Code Check-in System</p>
                            <b className="h5">Results returned from QR code:</b>
                            <select>
                                <option>Port A</option>
                                <option></option>
                                <option>Port c</option>
                            </select>
                            <p className="mt-2">{this.state.result}</p>
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
