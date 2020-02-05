import React from 'react'
import Company from "./company";
import Address from "./address";
import AddContact from "./addContact";
import Contact from "./contacts";
import Occupations from "./Occupations"
import api_url from "./apiConfig";


class Advert extends React.Component {
        state = {

                // All fetched values from the database
                allOccupations: [],
                allCompanies: [],
                allAddresses: [],
                allContacts: [],
                contacts: [],
                address_disabled: true,
                contact_id: undefined,
                contact_name: '',
                contact_methods: []
        }


        componentDidMount() {

                // Fetch all the live adverts and put them on the state
                fetch(`${api_url}/api/occupations/list`)
                        .then(res => {
                                return res.json();
                        })
                        .then(body => this.setState({ allOccupations: body }))

                fetch(`${api_url}/api/companies/list`)
                        .then(res => {
                                return res.json();
                        })
                        .then(body => this.setState({ allCompanies: body }))



        }


        // Reaction with the DOM 

        handleFind_occupationChange = (event) => {


                // Match the contact name with a name in the db

                // Check to see if we have the data already
                const i = this.state.allOccupations.findIndex(occupation => occupation.occupation.toUpperCase() === event.target.value.toUpperCase())
                if (i > -1) {
                        var occupation = {};
                        occupation = { ...this.state.allOccupations[i] }
                        this.props.updateData({ occupation_id: occupation.occupation_id, occupation: occupation.occupation })


                } else {


                        var occupation_id = undefined;
                        if (event.target.value.trim().length > 0) occupation_id = null;
                        this.props.updateData({ occupation_id: occupation_id, occupation: event.target.value })
                }



        }

        handleFind_companyChange = (event) => {


                // Match the contact name with a name in the db


                const i = this.state.allCompanies.findIndex(company => company.company_name.toUpperCase() === event.target.value.toUpperCase())
                if (i > -1) {
                        var company = {};
                        company = { ...this.state.allCompanies[i] }
                        this.props.updateData({ company_id: company.company_id, company_name: company.company_name })


                        fetch(`${api_url}/api/addresses/companies/live/${company.company_id}`)
                                .then(res => {
                                        return res.json();
                                })
                                .then(body => this.setState({ allAddresses: body }))

                        fetch(`${api_url}/api/contacts/?company_id=${company.company_id}`)
                                .then(res => {
                                        return res.json();
                                })
                                .then(body => this.setState({ allContacts: body }))
                } else {


                        var company_id = undefined;
                        if (event.target.value.trim().length > 0) company_id = null;
                        this.props.updateData({ company_id: company_id, company_name: event.target.value })
                }



        }

        handleFind_addressChange = (event) => {


                this.props.updateData(this.state.allAddresses[this.state.allAddresses.findIndex(address => address.address_id.toString() === event.target.value.toString())])

        }

        handleFind_contactChange = (event) => {


                // Match the contact name with a name in the db


                const i = this.state.allContacts.findIndex(contact => contact.contact_name.toUpperCase() === event.target.value.toUpperCase())
                if (i > -1) {
                        var contact = {};
                        contact = { ...this.state.allContacts[i] }
                        this.setState({
                                contact_id: contact.contact_id,
                                contact_name: contact.contact_name
                        })



                } else {


                        var contact_id = undefined;
                        if (event.target.value.trim().length > 0) contact_id = null;
                        this.setState({
                                contact_id: contact_id,
                                contact_name: event.target.value,
                                
                        })
                }



        }




        handlePosition_titleChange = (event) => this.props.updateData({ position_title: event.target.value })

        handleAdvert_refChange = (event) => this.props.updateData({ advert_ref: event.target.value })

        handleContract_typeChange = (event) => this.props.updateData({ contract_type: event.target.value })

        handleContract_hoursChange = (event) => this.props.updateData({ contract_hours: event.target.value })

        handleDate_postedChange = (event) => this.props.updateData({ date_posted: event.target.value })

        handleClosing_dateChange = (event) => this.props.updateData({ closing_date: event.target.value })

        handleWebsiteChange = (event) => this.props.updateData({ advert_url: event.target.value })

        handleMin_salaryChange = (event) => this.props.updateData({ min_salary: event.target.value })

        handleMax_salaryChange = (event) => this.props.updateData({ max_salary: event.target.value })

        handleJob_locationChange = (event) => this.props.updateData({ job_location: event.target.value })

        handleAdvert_descriptionChange = (event) => this.props.updateData({ advert_description: event.target.value })

        handleJob_boardChange = (event) => this.props.updateData({ job_board: event.target.value })

        handleAgencyChange = () => this.props.updateData({ agency: !this.props.state.data.agency })

        handleVoluntaryChange = () => this.props.updateData({ voluntary: !this.props.state.data.voluntary })


        handleAddress_fieldChange = (event) => {
                var address_id = null
                if ((event.target.value.trim().length + this.props.getData().postcode.trim().length) === 0) {
                        address_id = undefined
                }
                this.props.updateData({ address_id: address_id, address_field: event.target.value })
                console.log(this.props.state.data)
        }


        handlePostcodeChange = (event) => this.props.updateData({ address_id: null, postcode: event.target.value })

        addressToggle = (event) => { // Set by the New Address/Cancel button to determine whether we are selecting an already existing company in our db, or adding a new one
                this.setState({ address_disabled: !this.state.address_disabled })
                // if (!this.state.address_disabled) this.props.updateData({ address_id: null })
                this.props.state.data.address_field = ''
                this.props.state.data.postcode = ''
                this.props.state.data.address_id = undefined
        }

        handleAddContact = (event) => { // Set by the New Address/Cancel button to determine whether we are selecting an already existing company in our db, or adding a new one
                if (this.state.contact_id > 0) {
                        fetch(`${api_url}/api/contacts/methods/${this.state.contact_id}`)
                                .then(res => res.json())
                                .then(body => {
                                        this.props.addContact({
                                                contact_id: this.state.contact_id,
                                                contact_name: this.state.contact_name,
                                                contact_methods: body
                                        })
                                        // if (!this.state.address_disabled) this.props.updateData({ address_id: null })
                                        this.setState({
                                                contact_id: undefined,
                                                contact_name: '',
                                                contact_methods: []
                                        })
                                     
                                })
                } else {
                        if(this.state.contact_id === null ) {
                                this.props.addContact({
                                        contact_id: this.state.contact_id,
                                        contact_name: this.state.contact_name,
                                        contact_methods: this.state.contact_methods,
                                        address_id: this.props.getData().address_id,
                                        company_id: this.props.getData().company_id
                                })
                                this.setState({
                                        contact_id: undefined,
                                        contact_name: '',
                                        contact_methods: []
                                })
                        }

                }


        }

        // handleAdd_methods = (event) => {
        //         contact = 
        //         contact.contact_methods.push({ contact_id: contact.contact_id, contact_method: this.state.contact_method, contact_value: this.state.contact_value })
        //         const values = contact.contact_methods
        //         values.push()
        //         this.props.updateData({ contact_methods: values })
        // }



        render() {

                const occupations = [];
                this.state.allOccupations.forEach((occupation, i) => occupations.push(<option value={occupation.occupation} key={i} />))

                const companies = [];
                this.state.allCompanies.forEach((company, i) => companies.push(<option value={company.company_name} key={i} />))

                const contacts = [];
                this.state.allContacts.forEach((contact, i) => contacts.push(<option value={contact.contact_name} key={i} />))

                // Fix date reporting 
                var date_posted = this.props.state.data.date_posted;
                var closing_date = this.props.state.data.closing_date;

                // Generate the list of addresses from the db
                const addresses = []
                addresses.push(<option value={null} key={0}>none</option>) // Add blank option

                this.state.allAddresses.forEach((address, i) => addresses.push(<option value={address.address_id} key={i} >{address.address_field}, {address.postcode}</option>))

                if (date_posted === null) date_posted = '';
                if (closing_date === null) closing_date = '';

                return (
                        <div className="">
                                <div className="row">

                                        <div className="col-md-8">
                                                <div className="row">
                                                        <div className="col-md-6">
                                                                <label for="job_title">Job Title</label>
                                                                <input id="job_title" className="text form-control" disabled={this.props.state.disabled} onChange={this.handlePosition_titleChange} type="text" value={this.props.state.data.position_title} name="Job Title" size="40" />
                                                        </div>
                                                        <div className="col-md-6">

                                                                <label>Occupation</label>
                                                                <input disabled={this.props.disabled} list="occupations" onChange={this.handleFind_occupationChange} className="form-control" value={this.props.state.data.occupation} name="occupations"></input>
                                                                <datalist id="occupations">
                                                                        {occupations}
                                                                </datalist>

                                                        </div>
                                                </div>
                                                <div className="row">
                                                        <div className="col-md-12">
                                                                <label>Advert Description</label>
                                                                <textarea className="textarea form-control" disabled={this.props.state.disabled} name="advert_description" onChange={this.handleAdvert_descriptionChange} value={this.props.state.data.advert_description} cols="50" rows="21"></textarea>
                                                        </div>

                                                </div>
                                                <div className="row">
                                                        <div className="col-md-8">
                                                                <label>Advert Website</label>
                                                                <input type="text" className="form-control" disabled={this.props.state.disabled} onChange={this.handleWebsiteChange} value={this.props.state.data.advert_url} name="Advert URL" />
                                                        </div>

                                                        <div className="col-md-4">
                                                                <label>Advert Reference</label>
                                                                <input className="form-control" type="text" disabled={this.props.state.disabled} onChange={this.handleAdvert_refChange} value={this.props.state.data.advert_ref} name="Advert Reference" />
                                                        </div>
                                                </div>
                                                <div className="row">
                                                        <div className="col-md-4">
                                                                <label>Contract Type</label>
                                                                <input type="text" className="form-control" disabled={this.props.state.disabled} onChange={this.handleContract_typeChange} value={this.props.state.data.contract_type} name="Contract Type" />
                                                        </div>
                                                        <div className="col-md-4">
                                                                <label>Full Time or Part Time?</label>
                                                                <input type="text" className="form-control" disabled={this.props.state.disabled} onChange={this.handleContract_hoursChange} value={this.props.state.data.contract_hours} name="Full Time or Part Time" />
                                                        </div>

                                                        <div className="col-md-4">
                                                                <label>Job Board</label>
                                                                <input type="text" className="form-control" disabled={this.props.state.disabled} onChange={this.handleJob_boardChange} value={this.props.state.data.job_board} name="Location" />
                                                        </div>

                                                        <div className="col-md-4">
                                                                <label>Location</label>
                                                                <input type="text" className="form-control" disabled={this.props.state.disabled} onChange={this.handleJob_locationChange} value={this.props.state.data.job_location} name="Location" />
                                                        </div>
                                                </div>
                                                <div className="row">
                                                        <div className="col-md-4">
                                                                <label>Minimum Salary</label>
                                                                <input type="text" className="form-control" disabled={this.props.state.disabled} onChange={this.handleMin_salaryChange} value={this.props.state.data.min_salary} name="Min Sal" />
                                                        </div>
                                                        <div className="col-md-4">
                                                                <label>Maximum Salary</label>
                                                                <input type="text" className="form-control" disabled={this.props.state.disabled} onChange={this.handleMax_salaryChange} value={this.props.state.data.max_salary} name="Max Sal" />
                                                        </div>
                                                </div>

                                                <div className="row">
                                                        <div className="col-md-6">
                                                                <label>Date Posted</label>

                                                                <input type="date" className="form-control" disabled={this.props.state.disabled} onChange={this.handleDate_postedChange} value={date_posted.slice(0, 10)} name="Date Posted" />

                                                        </div>
                                                        <div className="col-md-6">
                                                                <label>Closing Date</label>
                                                                <input type="date" className="form-control" disabled={this.props.state.disabled} onChange={this.handleClosing_dateChange} value={closing_date.slice(0, 10)} name="Closing Date" />
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="col-md-4">
                                                <div className="row">
                                                        <div className="col-md-4 checkbox">
                                                                <label>Agency?</label>


                                                                <input type="checkbox" className="checkbox " disabled={this.props.state.disabled} name="agency" value={this.props.state.data.agency} onClick={this.handleAgencyChange} />
                                                        </div>
                                                </div>

                                                <div className="row">
                                                        <div className="col-md-4 checkbox">
                                                                <label>Voluntary?</label>


                                                                <input type="checkbox" className="checkbox " disabled={this.props.state.disabled} name="voluntary" value={this.props.state.data.voluntary} onClick={this.handleVoluntaryChange} />
                                                        </div>
                                                </div>
                                                <div className="row">
                                                        <div className="col-md-12">

                                                                <label>Company Name</label>
                                                                <input className="form-control" disabled={this.props.disabled} list="companies" value={this.props.state.data.company_name} onChange={this.handleFind_companyChange} name="companies"></input>
                                                                <datalist id="companies">
                                                                        {companies}
                                                                </datalist>
                                                        </div>

                                                </div>

                                                <div className="row">
                                                        <div className="col-md-12">
                                                                <button type='button' disabled={this.state.address_disabled} onClick={this.addressToggle}>Select Address</button>
                                                                <button type="button" disabled={!this.state.address_disabled} onClick={this.addressToggle}>Add New Address</button>
                                                                <label>Select Address</label>

                                                                <div >
                                                                        <select disabled={!this.state.address_disabled} className="form-control" id="addresses" onChange={this.handleFind_addressChange}>
                                                                                {addresses}
                                                                        </select>


                                                                        {/* <Address disabled={this.props.state.disabled} state={this.state} updateData={this.props.updateData} getData={this.props.getData} /> */}
                                                                </div>
                                                                <div className="form-group">
                                                                        <label>Address</label>
                                                                        <textarea disabled={this.state.address_disabled} className="textarea form-control" name="address_field" onChange={this.handleAddress_fieldChange} value={this.props.getData().address_field}></textarea>
                                                                        <label>Postcode</label>
                                                                        <input className="form-control" disabled={this.state.address_disabled} type="text" onChange={this.handlePostcodeChange} value={this.props.getData().postcode} name="Postcode" />


                                                                </div>
                                                        </div>

                                                        {this.props.state.data.contacts.map((contact, i) => {
                                                                return (<div key={i}>

                                                                        {console.log(contact)}
                                                                        <Contact disabled={this.props.state.disabled} i={i} state={this.state} contact={contact} updateData={this.props.updateData} getData={this.props.getData} />

                                                                </div>)
                                                        })}

                                                        <div className="row">

                                                                {/* <AddContact disabled={this.props.state.disabled} state={this.state} updateData={this.props.updateData} getData={this.props.getData} /> */}




                                                                <div className="col-md-12">
                                                                        <label>Contact Name</label>
                                                                        <input className="form-control" disabled={this.props.disabled} list="contacts" value={this.state.contact_name} onChange={this.handleFind_contactChange} name="contacts"></input>
                                                                        <datalist id="contacts">
                                                                                {contacts}
                                                                        </datalist>
                                                                        <button type="button" disabled={this.props.disabled} onClick={this.handleAddContact}>Add Contact</button>
                                                                </div>
                                                        </div>

                                                </div>
                                        </div>

                                </div>


                        </div>
                );
        }


}




export default Advert;