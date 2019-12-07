import React from 'react'
import api_url from "./apiConfig";

class AddContract extends React.Component {
        state = {
                address_id: null,
                contact_id: null,
                begin_date: null,
                end_date: null,
                salary: '',
                live: false,
                job_description: '',
                responsibilities: '',
                notice_period: '',
                benifits: '',
                contract_type: '',
                full_time: 'false',
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



        handlePaidChange = (event) => {
                this.setState({
                        paid: !this.state.paid
                })
        }

        handleFull_timeChange = (event) => {
                this.setState({
                        full_time: !this.state.full_time
                })
        }

        handleContract_typeChange = (event) => {
                this.setState({
                        contract_type: event.target.value
                })
        }

        handleBenifitsChange = (event) => {
                this.setState({
                        benifits: event.target.value
                })
        }

        handleNotice_periodChange = (event) => {
                this.setState({
                        notice_period: event.target.value
                })
        }

        handleResponsibilitiesChange = (event) => {
                this.setState({
                        responsibilities: event.target.value
                })
        }

        handleJob_descriptionChange = (event) => {
                this.setState({
                        job_description: event.target.value
                })
        }

        handleLiveChange = (event) => {
                this.setState({
                        live: !this.state.live
                })
        }

        handleSalaryChange = (event) => {
                this.setState({
                        salary: event.target.value
                })
        }

        handleEnd_dateChange = (event) => {
                this.setState({
                        end_date: event.target.value
                })
        }

        handleBegin_dateChange = (event) => {
                this.setState({
                        begin_date: event.target.value
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


                        <label>Begin Date</label>
                        <input type="date" onChange={this.handleBegin_dateChange} name="Begin Date" />

                        <label>End Date</label>
                        <input type="date" onChange={this.handleEnd_dateChange} name="End Date" />

                        <label>Salary</label>
                        <input type="text" onChange={this.handleSalaryChange} name="Salary" />

                        <label>Live</label>

                        <input type="checkbox" name="live" value={this.state.live} onClick={this.handleLiveChange} />

                        <label>Job Description</label>
                        <textarea className="textarea" name="job_description" onChange={this.handleJob_descriptionChange} value={this.state.Job_description} cols="50" rows="20"></textarea>

                        <label>Responsibilities</label>
                        <textarea className="textarea" name="responsibilities" onChange={this.handleResponsibilitiesChange} value={this.state.responsibilities} cols="50" rows="20"></textarea>

                        <label>Notice Period</label>
                        <input type="text" onChange={this.handleNotice_periodChange} name="Notice Period" />

                        <label>Benifits</label>
                        <textarea className="textarea" name="benifits" onChange={this.handleBenifitsChange} value={this.state.benifits} cols="50" rows="20"></textarea>

                        <label>Contract Type</label>
                        <input type="text" onChange={this.handleContract_typeChange} name="Contract Type" />

                        <br />

                        <input onChange={this.handleFull_timeChange} type="radio" name="hours" value="Full Time" /> Full Time<br></br>
                        <input onChange={this.handleFull_timeChange} type="radio" name="hours" value="Part Time" /> Part Time<br></br>

                        <label>Paid</label>

<input type="checkbox" name="paid" value={this.state.paid} onClick={this.handlePaidChange} />
                        





                       

                        <button className="bnt btn-default" type="submit" onClick={this.newApplication}>Add</button>
                </form>
                );
        }

        newApplication = (event) => {

                // Comment out for development purposes only
                event.preventDefault();

                console.log(this.state)
                fetch(`${api_url}/api/contracts`, {
                        headers: new Headers({ "Content-Type": "application/json" }),
                        method: 'POST',
                        body: JSON.stringify({

                                address_id: this.state.address_id,
                                contact_id: this.state.contact_id,
                                job_title: this.state.job_title,
                                occupation_sector: this.state.occupation_sector,
                                begin_date: this.state.begin_date,
                                end_date: this.state.end_date,
                                salary: this.state.salary,
                                live: this.state.live,
                                job_description: this.state.job_description,
                                responsibilities: this.state.responsibilities,
                                notice_period: this.state.notice_period,
                                benifits: this.state.benifits,
                                contract_type: this.state.contract_type,
                                full_time: this.state.full_time,
                                paid: this.state.paid,


                        })
                })
                        .then(res => res.json())
                        .catch(console.log)
        }
}

export default AddContract;