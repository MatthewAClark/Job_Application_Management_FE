import React from 'react'
import api_url from "./apiConfig";

class AddApplication extends React.Component {
        state = {
                company_id: null,
                address_id: null,
                contact_id: null,
                job_title: '',
                job_location: '',
                occupation_sector: '',
                advert_ref: '',
                contract_type: '',
                full_time: true,
                date_posted: null,
                date_applied: null,
                closing_date: null,
                advert_url: '',
                min_salary: '',
                max_salary: '',
                advert_description: '',
                agency: false,
                job_board: '',
                paid: true,
                companies: [],
                addresses: [],
                contacts: []
        }

        componentDidMount() {

                // Fetch all the companies and put them on the state
                fetch(`${api_url}/api/companies/names`)
                        .then(res => {
                                return res.json();
                        })
                        .then(body => {


                                this.setState({
                                        companies: body

                                })
                        })
        }


        handleJob_titleChange = (event) => {
                this.setState({
                        job_title: event.target.value
                })
        }

        handleAdvert_refChange = (event) => {

                this.setState({

                        advert_ref: event.target.value
                })
        }

        handleContract_typeChange = (event) => {

                this.setState({

                        contract_type: event.target.value
                })
        }

        handleFull_timeChange = (event) => {

                if (event.target.value === "Part Time") {

                        this.setState({
                                full_time: false
                        })
                }
                else {

                        this.setState({
                                full_time: true
                        })

                }



        }

        handleDate_postedChange = (event) => {

                this.setState({

                        date_posted: event.target.value
                })
        }

        handleDate_appliedChange = (event) => {

                this.setState({

                        date_applied: event.target.value
                })
        }

        handleClosing_dateChange = (event) => {

                this.setState({

                        closing_date: event.target.value
                })
        }


        handleAdvert_urlChange = (event) => {

                this.setState({

                        advert_url: event.target.value
                })
        }

        handleMin_salaryChange = (event) => {

                this.setState({

                        min_salary: event.target.value
                })
        }
        handleMax_salaryChange = (event) => {

                this.setState({

                        max_salary: event.target.value
                })
        }
        handleAdvert_descriptionChange = (event) => {

                this.setState({

                        advert_description: event.target.value
                })
        }
        handleJob_locationChange = (event) => {

                console.log('here')

                this.setState({

                        job_location: event.target.value

                })
        }
        handleOccupational_sectorChange = (event) => {

                this.setState({

                        job_field: event.target.value
                })
        }

        handleAgencyChange = () => {

                this.setState({
                        agency: !this.state.agency
                })

        }

        handleAdvert_urlChange = (event) => {

                this.setState({
                        advert_url: event.target.value
                })

        }

        handleCompanyName_idChange = (event) => {

                // update company_id with selection
                this.setState({                        
                        company_id: event.target.value
                })
              
                // Fetch all the addresses associated with that company
                fetch(`${api_url}/api/addresses/${event.target.value}`)
                        .then(res => {
                                return res.json();
                        })
            
                        .then(body => {

                                this.setState({
                                        addresses: body,
                                        address_id: null,
                                        contact_id: null
                                })
                              
                        })



        }

       
        handleAddress_idChange = (event) => {
                console.log(event.target.value)
                fetch(`${api_url}/api/contacts/${event.target.value}`)
                        .then(res => {
                                return res.json();
                        })
                        .then(body => {
                                console.log(body)
                                this.setState({
                                        contacts: body

                                })
                        })

                this.setState({
                        address_id: event.target.value

                })


        }

        handleContact_nameChange = (event) => {
                

                this.setState({
                        contact_id: event.target.value

                })


        }



        render() {

                // Get the list of company names for the company name fields
                const companies = [];
                const addresses = [];
                const contacts = [];

                // if (this.state.companies.length > 0) {
                        
               companies.push(<option value="" selected disabled hidden>Please select</option>);
                this.state.companies.forEach(company => {
                        companies.push(<option value={company.company_id}>{company.company_name}</option>);

                })
                addresses.push(<option value="" selected disabled hidden>Please select</option>);
                this.state.addresses.forEach(address => {
                        addresses.push(<option value={address.address_id}>{address.town_city}</option>);

                })
                contacts.push(<option value="" selected disabled hidden>Please select</option>);
                
                this.state.contacts.forEach(contact => {
                        contacts.push(<option value={contact.contact_id}>{contact.contact_name}</option>);

                })


                // }


                return (<form>
                        <label>Job Title</label>
                        <input className="text" onChange={this.handleJob_titleChange} type="text" value={this.state.job_title} name="Job Title" size="40" />

                        <label>Company Name</label>
                        <select name="companyName" onChange={this.handleCompanyName_idChange}>

                                {companies}


                        </select>



                        <label>Company Location</label>
                        <select name="addresses" onChange={this.handleAddress_idChange}>

                                {addresses}


                        </select>

                        <label>Contact name</label>
                        <select name="contact" onChange={this.handleContact_nameChange}>
                                {contacts}
                        </select>



                        <label>Advert Reference</label>
                        <input type="text" onChange={this.handleAdvert_refChange} name="Application Reference" />

                        <label>Occupation Sector</label>
                        <input type="text" onChange={this.handleOccupational_sectorChange} name="Occupation Sector" />

                        <label>Advert URL</label>
                        <input type="text" onChange={this.handleAdvert_urlChange} name="Advert URL" />

                        <label>Agency?</label>

                        <input type="checkbox" name="agency" value={this.state.agency} onClick={this.handleAgencyChange} />

                        <label>Contract Type</label>
                        <input type="text" onChange={this.handleContract_typeChange} name="Contract Type" />

                        <br />

                        <input onChange={this.handleFull_timeChange} type="radio" name="hours" value="Full Time" /> Full Time<br></br>
                        <input onChange={this.handleFull_timeChange} type="radio" name="hours" value="Part Time" /> Part Time<br></br>

                        <label>Job Location</label>
                        <input type="text" onChange={this.handleJob_locationChange} name="Job Location" />



                        <label>Minimum Salary</label>
                        <input type="text" onChange={this.handleMin_salaryChange} name="Min Sal" />

                        <label>Maximum Salary</label>
                        <input type="text" onChange={this.handleMax_salaryChange} name="Max Sal" />

                        <label>Date Posted</label>
                        <input type="date" onChange={this.handleDate_postedChange} name="Date Posted" />

                        {/* <label>Date Seen</label>
           <input type="date" onChange={this.handleDate_seenChange} name="Date Seen" /> */}

                        <label>Closing Date</label>
                        <input type="date" onChange={this.handleClosing_dateChange} name="Closing Date" />

                        <br />

                        <label>Advert Description</label>
                        <textarea className="textarea" name="advert_description" onChange={this.handleAdvert_descriptionChange} value={this.state.advert_description} cols="50" rows="20"></textarea>



                        <button className="bnt btn-default" type="submit" onClick={this.newApplication}>Add</button>
                </form>
                );
        }

        newApplication = (event) => {

                // Comment out for development purposes only
                event.preventDefault();

                console.log(this.state)
                fetch(`${api_url}/api/adverts`, {
                        headers: new Headers({ "Content-Type": "application/json" }),
                        method: 'POST',
                        body: JSON.stringify({

                                address_id: this.state.address_id,
                                contact_id: this.state.contact_id,
                                job_title: this.state.job_title,
                                occupation_sector: this.state.occupation_sector,
                                advert_ref: this.state.advert_ref,
                                contract_type: this.state.contract_type,
                                full_time: this.state.full_time,
                                date_posted: this.state.date_posted,
                                date_applied: this.state.date_applied,
                                closing_date: this.state.closing_date,
                                advert_url: this.state.advert_url,
                                min_salary: this.state.min_salary,
                                max_salary: this.state.max_salary,
                                advert_description: this.state.advert_description,
                                agency: this.state.agency,
                                job_board: this.state.job_board,
                                job_location: this.state.job_location,
                                paid: this.state.paid


                        })
                })
                        .then(res => res.json())
                        .catch(console.log)
        }
}

export default AddApplication;