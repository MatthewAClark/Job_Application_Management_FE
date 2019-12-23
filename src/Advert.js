import React from 'react'
import api_url from "./apiConfig";
import AddCompany from "./addCompany";
import AddAddress from "./addAddress";
import AddContact from "./addContact";


class Advert extends React.Component {
        state = {
            
                // Table values we need for when we update
                // company: {
                //         company_id: null,
                //         company_name: ''
                // },
                // address: {
                //         address_id: null,
                //         address_field: '',
                //         postcode: ''
                // },

                // contact: {
                //         company_id: null,
                //         address_id: null,
                //         contact_name: '',
                //         contact_position: '',
                //         capacity_known: '',
                //         reference: false,
                //         date_known: null,
                //         contact_values: []
                // },

                // All fetched values from the database
                allAddresses: [],
                allCompanies: [],
                allContacts: []

        }

        // First thing first. Fetch the list of companies we have in our database
        componentDidMount() {
                fetch(`${api_url}/api/companies/list`)
                        .then(res => res.json())
                        .then(body => {
                                this.setAllCompaniesState(body)
                        })
        }


        // I've created some getters and setters to pass down the classes. Updaters are also provided which update tables with certain fields only
   // Advert
        getAdvertState = () => this.props.state.advert;
        updateAdvertState = (update) => {
                var advert = this.props.state.advert;
                advert = { ...advert, ...update }
                this.props.setAdvertState(advert);
        }
        setAdvertState = (advert) => this.props.setAdvertState(advert);

        // Company
        getCompanyState = () => this.props.state.company;
        updateCompanyState = (update) => { // Used when we add a new company to the db
                var company = this.props.state.company;
                company = { ...company, ...update };
                this.props.setCompanyState(company);
        }
        setCompanyState = (company) => { // Used for when selecting an existing company. All data fields should be replaced with data from selected value
                this.props.setCompanyState(company);

                // Update foreign keys in the other tables. Reset the contacts and address values
                this.updateAddressState({ company_id: company.company_id });
                this.updateContactState({ company_id: company.company_id })

                // But update the company id in the company table
                this.updateAdvertState({ company_id: company.company_id });

                // Now we have our company chosen, fetch all the addresses and contacts for that company
                if (company.company_id != null) {
                        // Fetch address list of company
                        fetch(`${api_url}/api/addresses/companies/live/${company.company_id}`)
                                .then(res => res.json())
                                .then(body => this.setAllAddressesState(body))

                        // Fetch contacts from company
                        fetch(`${api_url}/api/contacts/?company_id=${company.company_id}`)
                                .then(res => res.json())
                                .then(body => this.setAllContactsState(body))
                } else {
                        // If it is a new company, reset the contacts and addresses
                        this.setAllAddressesState([])
                        this.setAllContactsState([])
                }
        }

        getAddressState = () => this.props.state.address;

        updateAddressState = (update) => { // Used to add a new address
                var address = this.props.state.address;
                address = { ...address, ...update }
                this.props.setAddressState(address);
        }

        setAddressState = (address) => {
                this.props.setAddressState(address);

                // Update advert and contact with address id
                this.updateAdvertState({ address_id: address.address_id })
                this.updateContactState({ address_id: address.address_id })

                // Fetch all contacts from that address
                if (address.address_id) {
                        fetch(`${api_url}/api/contacts/?address_id=${address.address_id}`)
                                .then(res => res.json())
                                .then(body => this.setAllContactsState(body))
                } else {
                        this.setAllContactsState([])
                }

        }

        getContactState = () => this.props.state.contact;

        setContactState = (contact) => {
                contact = { ...contact, contact_values: [] }
                this.props.setContactState(contact);

                // Update advert with contact id
                this.updateAdvertState({ contact_id: contact.contact_id })

                // And fetch contact values to add to the contact
                fetch(`${api_url}/api/contacts/${contact.contact_id}`)
                        .then(res => res.json())
                        .then(body => this.updateContactState({ contact_values: body }))
        }

        updateContactState = (update) => {
                var contact = this.props.state.contact;
                contact = { ...contact, ...update }
                this.props.setContactState(contact);
        }

        // Fetch or post all the data from the database so the user can choose
        getAllCompaniesState = () => this.state.allCompanies;

        setAllCompaniesState = (allCompanies) => this.setState({ allCompanies: allCompanies });

        getAllAddressesState = () => this.state.allAddresses;

        setAllAddressesState = (allAddresses) => this.setState({ allAddresses: allAddresses });

        getAllContactsState = () => this.state.allContacts;

        setAllContactsState = (allContacts) => this.setState({ allContacts: allContacts });


        // Reaction with the DOM 

        handleJob_titleChange = (event) => this.updateAdvertState({ job_title: event.target.value })

        handleAdvert_refChange = (event) => this.updateAdvertState({ advert_ref: event.target.value })

        handleContract_typeChange = (event) => this.updateAdvertState({ contract_type: event.target.value })

        handleFull_time_part_timeChange = (event) => this.updateAdvertState({ full_time_part_time: event.target.value })
p
        handleDate_postedChange = (event) => this.updateAdvertState({ date_posted: event.target.value })

        handleClosing_dateChange = (event) => this.updateAdvertState({ closing_date: event.target.value })

        handleWebsiteChange = (event) => this.updateAdvertState({ website: event.target.value })

        handleMin_salaryChange = (event) => this.updateAdvertState({ min_salary: event.target.value })

        handleMax_salaryChange = (event) => this.updateAdvertState({ max_salary: event.target.value })

        handleJob_locationChange = (event) => this.updateAdvertState({ job_location: event.target.value })

        handleAdvert_descriptionChange = (event) => this.updateAdvertState({ advert_description: event.target.value })

        handleAgencyChange = () => this.updateAdvertState({ agency: !this.getAdvertState().agency })









        render() {
                return (<div>

                        <label>Job Title</label>
                        <input className="text" onChange={this.handleJob_titleChange} type="text" value={this.state.job_title} name="Job Title" size="40" />



                        <AddCompany getCompanyState={this.getCompanyState} setCompanyState={this.setCompanyState} updateCompanyState={this.updateCompanyState} getAllCompaniesState={this.getAllCompaniesState} />
                        <AddAddress getAddressState={this.getAddressState} setAddressState={this.setAddressState} updateAddressState={this.updateAddressState} getAllAddressesState={this.getAllAddressesState} setAllAddressesState={this.setAllAddressesState} />
                        <AddContact getContactState={this.getContactState} setContactState={this.setContactState} updateContactState={this.updateContactState} getAllContactsState={this.getAllContactsState} setAllContactsState={this.setAllContactsState} />


                        <label>Advert Reference</label>
                        <input type="text" onChange={this.handleAdvert_refChange} name="Application Reference" />



                        <label>Advert Website</label>
                        <input type="text" onChange={this.handleWebsiteChange} name="Advert URL" />

                        <label>Agency?</label>

                        <input type="checkbox" name="agency" value={this.state.agency} onClick={this.handleAgencyChange} />

                        <label>Contract Type</label>
                        <input type="text" onChange={this.handleContract_typeChange} name="Contract Type" />



                        <label>Full Time or Part Time?</label>
                        <input type="text" onChange={this.handleFull_time_part_timeChange} name="Full Time or Part Time" />


                        <label>Minimum Salary</label>
                        <input type="text" onChange={this.handleMin_salaryChange} name="Min Sal" />

                        <label>Maximum Salary</label>
                        <input type="text" onChange={this.handleMax_salaryChange} name="Max Sal" />

                        <label>Location</label>
                        <input type="text" onChange={this.handleJob_locationChange} name="Location" />

                        <label>Date Posted</label>
                        <input type="date" onChange={this.handleDate_postedChange} name="Date Posted" />


                        <label>Closing Date</label>
                        <input type="date" onChange={this.handleClosing_dateChange} name="Closing Date" />

                        <br />

                        <label>Advert Description</label>
                        <textarea className="textarea" name="advert_description" onChange={this.handleAdvert_descriptionChange} value={this.state.advert_description} cols="50" rows="20"></textarea>


                </div>
                );
        }


}




export default Advert;