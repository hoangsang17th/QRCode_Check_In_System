import HeaderBar from '../components/HeaderBar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import logo from '../logo.svg';
function Profile(){
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
                            <form id="general-info" className="section general-info">
                                <div className="info">
                                    <h6 className="H5 text-uppercase">General Information</h6>
                                    <div className="row">
                                        <div className="col-lg-11 mx-auto">
                                            <div className="row">
                                                <div className="col-xl-2 col-lg-12 col-md-4">
                                                    <div className="mt-4 pr-md-4">
                                                        <img src={logo} className="w-100"/>
                                                        <p className="text-center">You are Manager</p>
                                                    </div>
                                                </div>
                                                <div className="col-xl-10 col-lg-12 col-md-8 mt-md-0 mt-4">
                                                    <div className="form">
                                                        <form>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label for="fullName">Email</label>
                                                                    <input type="email" name="email" className="form-control mb-4" placeholder="Your Email" value="phsang49@gmail.com" disabled/>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label for="fullName">Full Name</label>
                                                                <input type="text" name="name" className="form-control mb-4" placeholder="Full Name" required/>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label for="fullName">Current Password</label>
                                                                    <input type="password" name="password" className="form-control mb-4" placeholder="Your Password" required/>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label for="fullName">New Password</label>
                                                                <input type="text" name="password" className="form-control mb-4" placeholder="New Password"/>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <input type="submit" value="Save" className="form-control mb-4 btn btn-outline-primary"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
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

export default Profile
