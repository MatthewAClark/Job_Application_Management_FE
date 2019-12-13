import React from 'react'
import api_url from "./apiConfig";

class AddAddress extends React.Component {
        state = {
                company_id: null,
                line_1: '',
                line_2: '',
                town_city: '',
                county_state: '',
                country: '',
                postcode_zipcode: '',
                companies: []
        }

        componentDidMount() {

                // Fetch all the companies and their locations and put them on the state

                fetch(`${api_url}/api/companies/list`)
                        .then(res => {
                                return res.json();
                        })
                        .then(body => {
                               

                 
                              this.setState({
                                     companies: body
                              
                        })
                })
        }

     
        handleLine_1Change= (event) => {
                console.log(event.target.value)
                this.setState({
                        line_1: event.target.value
                })
        }

        handleLine_2Change= (event) => {
                this.setState({
                        line_2: event.target.value
                })
        }

        handleTown_cityChange= (event) => {
                this.setState({
                        town_city: event.target.value
                })
        }

        handleCounty_stateChange= (event) => {
                this.setState({
                        county_state: event.target.value
                })
        }

        handleCountryChange= (event) => {
                this.setState({
                        country: event.target.value
                })
        }

        handlePostcode_zipcodeChange= (event) => {
                this.setState({
                        postcode_zipcode: event.target.value
                })
        }

        
        handleCompanyName_idChange = (event) => {

                // update locations list with only companies in that location
              
                

                this.setState({
                        company_id: event.target.value,
                })

        

        }
        
       


        render() {

                // Get the list of company names for the company name fields
                const companyNames = [];
                companyNames.push(<option value={null}>Please select</option>);
                if (this.state.companies.length > 0) {
                       
                        this.state.companies.forEach(company => {
                                companyNames.push(<option value={company.company_id}>{company.company_name}</option>);

                        })

                        


                }
              


                return (<form>

<label>Company Name</label>
                        <select name="companyName" onChange={this.handleCompanyName_idChange}>

                                {companyNames}


                        </select>
                      




                        <label>Address</label>
                        <input type="text" onChange={this.handleLine_1Change} name="line 1" />

                        <input type="text" onChange={this.handleLine_2Change} name="line 2" />

                        <label>Town or City</label>
                        <input type="text" onChange={this.handleTown_cityChange} name="town city" />

                        <label>County or State</label>
                        <input type="text" onChange={this.handleCounty_stateChange} name="county state" />

                        <label>Country</label>
                        <input type="text" onChange={this.handleCountryChange} name="country" />

                        <label>Postcode </label>
                        <input type="text" onChange={this.handlePostcode_zipcodeChange} name="postcode" />




                        <button className="bnt btn-default" type="submit" onClick={this.newApplication}>Add</button>
                </form>
                );
        }

        newApplication = (event) => {

                // Comment out for development purposes only
                event.preventDefault();
                console.log(this.state.postcode_zipcode)
               
                fetch(`${api_url}/api/companies/address`, {
                        headers: new Headers({ "Content-Type": "application/json" }),
                        method: 'POST',
                        body: JSON.stringify({
                                company_id: this.state.company_id,
                                line_1: this.state.line_1,
                                line_2: this.state.line_2,
                                town_city: this.state.town_city,
                                county_state: this.state.county_state,
                                country: this.state.country,
                                postcode_zipcode: this.state.postcode_zipcode
                                
                        })
                })
                        .then(res => res.json())
                        .catch(console.log)
        }
}

export default AddAddress;