import React,{Component} from 'react';
import './TravelerDashboard.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {MenuItem, Dropdown, DropdownButton, Button} from 'react-bootstrap';
import DetailsComponent from '../DetailsView/DetailsComponent';
import Pagination from "react-js-pagination";

class TravelerDashboard extends Component {
    constructor(){
        super();
        this.state = {  
            travPropertyDetails : [],
            place : '',
            activePage: 1,
            travelerDashFlag: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this); 
        this.submitLogin = this.submitLogin.bind(this);
    }  
    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/TravelerDashboard')
                .then((response) => {
                    console.log("response",response.data);
                //update the state with the response data
                this.setState({
                    travPropertyDetails : this.state.travPropertyDetails.concat(response.data) 
                });
                console.log("PropertyDetails within TravelerDashboard FE",this.state.travPropertyDetails);
            });
    }
    
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({
            activePage: pageNumber
        });
    }
    handleChange(e) {
        this.setState({
            place : e.target.value
        })
    }

    submitLogin(e) {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            place: this.state.place
        }

        console.log("Data: ", data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/TravelerDashboard',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        travelerDashFlag : true
                    })
                }else{
                    this.setState({
                        travelerDashFlag : false,
                    })
                }
            });
    }

    render() {
        let travPropDetails = this.state.travPropertyDetails.map(travPropertyDetails => {
            return (
                <DetailsComponent>{travPropertyDetails.headline}{travPropertyDetails.proptype}{travPropertyDetails.noofrooms}{travPropertyDetails.noofbathrooms}{travPropertyDetails.accomodates}{travPropertyDetails.baserate}{travPropertyDetails.propertyID}</DetailsComponent>
            )
        })
       //redirect based on successful login
       let redirectVar = null;
       if(this.state.travelerDashFlag){
           redirectVar = <Redirect to= "/DetailsView"/>
       }
        return (
            <div class="travdash-first-div">
                {redirectVar}
                <div class="row travdash-row1">
                    <div class="col-sm-4 travdash-logo-col1">
                        <Link to="/"><img height="50" width="170" src={require('../Images/logo3.png')}/></Link>
                    </div>
                    <div class="col-sm-1 travdash-link">
                        <Link to="/TravelerDashboard">Trip Boards</Link>
                    </div>
                    <div class="col-sm-2 travdash-dropdown1">
                       <DropdownButton bsStyle="primary" title="My Account">
                            <MenuItem eventKey="1">Inbox</MenuItem>
                            <MenuItem eventKey="2">My trips</MenuItem>
                            <MenuItem eventKey="3"><Link to="/UserProfile">My profile</Link></MenuItem>
                            <MenuItem eventKey="4">Accounts</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="5">Owner Dashboard</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="6"><Link to="/">Logout</Link></MenuItem>
                        </DropdownButton>
                    </div>
            
                    <div class="col-sm-2 trav-search-bar">
                        <input type="text" name="place" onChange={this.handleChange} placeholder="Search by place" class="form-control" />
                    </div>
                    <div class="col-sm-2 trav-search-btn">
                        <button class="trav-search-btn" onClick = {this.submitLogin}>Search</button>
                    </div>
                    <div class="col-sm-1 travdash-logo-col2">
                        <img height="60" width="60" src={require("../Images/logo1.png")}/>
                    </div>
                </div>
                <div class="travdash-sec-div">
                    <h1>Trip Boards</h1>
                    <h2>Trip Boards help you keep track of the places you love.</h2>
                </div>
                <div class="travdash-third-div">
                    <h3>You've booked the below listed properties</h3>
                </div>
                <div>
                {travPropDetails}
                </div>
                <div class="travpagination-details">
                    <Pagination 
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={450}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>
        
        )
    }
}

export default TravelerDashboard;