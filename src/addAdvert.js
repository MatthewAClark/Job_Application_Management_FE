import React from 'react'
import api_url from "./apiConfig";
import AddCompany from "./addCompany";
import AddAddress from "./addAddress";
import AddContact from "./addContact";

class AddAdvert extends React.Component {
        state = {

                // Table values we need for when we update
                advert: {
                        company_id: null,
                        address_id: null,
                        contact_id: null,
                        job_title: '',
                        advert_ref: '',
                        contract_type: '',
                        full_time_part_time: '',
                        date_posted: null,
                        closing_date: null,
                        website: '',
                        min_salary: '',
                        max_salary: '',
                        advert_description: '',
                        agency: false,
                        job_board: '',
                        voluntary: false,
                        job_location: '',
                },
                company: {
                        company_id: null,
                        company_name: ''
                },
                address: {
                        address_id: null,
                        address_field: '',
                        postcode: ''
                },

                contact: {
                        company_id: null,
                        address_id: null,
                        contact_name: '',
                        contact_position: '',
                        capacity_known: '',
                        reference: false,
                        date_known: null,
                        contact_values: []
                },

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
        getAdvertState = () => this.state.advert;
        updateAdvertState = (update) => {
                var advert = this.state.advert;
                advert = { ...advert, ...update }
                this.setState({ advert: advert });
        }
        setAdvertState = (advert) => this.setState({ advert: advert });

        // Company
        getCompanyState = () => this.state.company;
        updateCompanyState = (update) => { // Used when we add a new company to the db
                var company = this.state.company;
                company = { ...company, ...update };
                this.setState({ company: company });
        }
        setCompanyState = (company) => { // Used for when selecting an existing company. All data fields should be replaced with data from selected value
                this.setState({ company: company });

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

        getAddressState = () => this.state.address;

        updateAddressState = (update) => { // Used to add a new address
                var address = this.state.address;
                address = { ...address, ...update }
                this.setState({ address: address });
        }

        setAddressState = (address) => {
                this.setState({ address: address });

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

        getContactState = () => this.state.contact;

        setContactState = (contact) => {
                contact = {...contact, contact_values: []}
                this.setState({ contact: contact });

                // Update advert with contact id
                this.updateAdvertState({ contact_id: contact.contact_id })

                // And fetch contact values to add to the contact
                fetch(`${api_url}/api/contacts/${contact.contact_id}`)
                .then(res => res.json())
                .then(body => this.updateContactState({contact_values: body}))
        }

        updateContactState = (update) => {
                var contact = this.state.contact;
                contact = { ...contact, ...update }
                this.setState({ contact: contact });
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

        handleDate_postedChange = (event) => this.updateAdvertState({ date_posted: event.target.value })

        handleClosing_dateChange = (event) => this.updateAdvertState({ closing_date: event.target.value })

        handleWebsiteChange = (event) => this.updateAdvertState({ website: event.target.value })

        handleMin_salaryChange = (event) => this.updateAdvertState({ min_salary: event.target.value })

        handleMax_salaryChange = (event) => this.updateAdvertState({ max_salary: event.target.value })

        handleJob_locationChange = (event) => this.updateAdvertState({ job_location: event.target.value })

        handleAdvert_descriptionChange = (event) => this.updateAdvertState({ advert_description: event.target.value })

        handleAgencyChange = () => this.updateAdvertState({ agency: !this.getAdvertState().agency })


        // Posting data to the server. 
        postCompany = (state) => new Promise(function (resolve, reject) {

                if (state.company.company_id > 0) resolve(state); else {

                        // If it is new data, we need to add it to the company table
                        fetch(`${api_url}/api/companies`, {
                                headers: new Headers({ "Content-Type": "application/json" }),
                                method: 'POST',
                                body: JSON.stringify(
                                        state.company
                                )
                        })
                                .then(res => res.json())
                                .then(company => {
                                        // And update foreign keys in all other tables
                                        state.company = company;
                                        state.advert.company_id = company.company_id;
                                        state.address.company_id = company.company_id;
                                        state.contact.company_id = company.company_id;
                                        resolve(state);
                                })

                }

        });

        postAddress = (state) => new Promise(function (resolve, reject) {

                if (state.address.address_id == null && state.address.address_field !== '' && state.address.postcode !== '') {
                        delete state.address.address_id;
                        fetch(`${api_url}/api/addresses/company`, {
                                headers: new Headers({ "Content-Type": "application/json" }),
                                method: 'POST',
                                body: JSON.stringify(state.address)
                        })
                                .then(res => res.json())
                                .then(address => {

                                        // Update IDs of state tables
                                        state.address = address;
                                        state.advert.address_id = address.address_id;
                                        state.contact.address_id = address.address_id;
                                        resolve(state);
                                })
                } else {
                        resolve(state)
                }

        });

        postContact = (state) => new Promise(function (resolve, reject) {
                if (state.contact.contact_id == null && state.contact.contact_name !== '') {
                        const values = state.contact.contact_values;
                        delete state.contact.contact_values;
                        delete state.contact.contact_id;
                        console.log('values', values)
                        console.log(state.contact)
                        fetch(`${api_url}/api/contacts/`, {
                                headers: new Headers({ "Content-Type": "application/json" }),
                                method: 'POST',
                                body: JSON.stringify(state.contact)
                        })
                                .then(res => res.json())
                                .then(contact => {

                                        

                                        
                                        // console.log(contact)
                                        state.contact = {...contact, contact_values: values};
                                        state.advert.contact_id = contact.contact_id;
                                        resolve(state)
                                })
                                .catch(console.log)
                } else {
                        resolve(state)
                }

        })

        postAdvert = (state) => new Promise(function (resolve, reject) {

                fetch(`${api_url}/api/adverts`, {
                        headers: new Headers({ "Content-Type": "application/json" }),
                        method: 'POST',
                        body: JSON.stringify(state.advert)
                })
                        .then(res => res.json())
                        .then(advert => {
                                state.advert = advert;
                                resolve(state)
                        })
                        .catch(console.log)



        })

        postContactValue = (contact_value) => new Promise(function (resolve, reject) {
                // const contact_values = state.contact.contact_values.filter(value => {
                //         return !(value.value_id > 0)
                // });
                console.log('here',contact_value)


               
                fetch(`${api_url}/api/contacts/${contact_value.contact_id}/`, {
                        headers: new Headers({ "Content-Type": "application/json" }),
                        method: 'POST',
                        body: JSON.stringify(contact_value)
                })
                        .then(res => res.json())
                        .then(contact_value => {
                                
                                resolve(contact_value)
                        })
                        .catch(console.log)



        })








        render() {
                return (<form>

                        <label>Job Title</label>
                        <input className="text" onChange={this.handleJob_titleChange} type="text" value={this.state.job_title} name="Job Title" size="40" />



                        <AddCompany getCompanyState={this.getCompanyState} setCompanyState={this.setCompanyState} updateCompanyState={this.updateCompanyState} getAllCompaniesState={this.getAllCompaniesState}/>
                        <AddAddress getAddressState={this.getAddressState} setAddressState={this.setAddressState} updateAddressState={this.updateAddressState} getAllAddressesState={this.getAllAddressesState} setAllAddressesState={this.setAllAddressesState} />
                        <AddContact getContactState={this.getContactState} setContactState={this.setContactState} updateContactState={this.updateContactState} getAllContactsState={this.getAllContactsState} setAllContactsState={this.setAllContactsState} />
                        {/* <AddContact getContactState={this.getContactState} setContactState={this.setContactState} getAllContactsState={this.getAllContactsState} setAllContactsState={this.setAllContactsState} /> */}
                        {/* <label>Job Location</label>
                        <input type="text" onChange={this.handleJob_locationChange} name="Job Location" /> */}

                        {/* <AddAddress addAddressIdToState={this.addAddressIdToState} addresses={this.state.addresses} />
                        {/* <label>Job Location</label>
                        <input type="text" onChange={this.handleJob_locationChange} name="Job Location" /> */} 



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



                        <button className="bnt btn-default" type="submit" onClick={this.newApplication}>Add</button>

                </form>
                );
        }

        newApplication = (event) => {

                // Comment out for development purposes only
                event.preventDefault();



                // this.postAdvert()
                // console.log(this.getAdvertState())
                // console.log(this.getCompanyState())
                // console.log(this.getContactState())
                // console.log(this.getAddressState())
                this.postCompany(this.state).then(state => this.postAddress(state)).then(state => this.postContact(state)).then(state => this.postAdvert(state)).then(state => {
                         
                        Promise.all(state.contact.contact_values.filter(value => !(value.value_id > 0)).map(value => {
                                value.contact_id = state.contact.contact_id;
                                return this.postContactValue(value)
                        })).then(() => {
                                 // window.location.reload()
                        })
                })
//  Promise.all(values.filter(value => !(value.value_id > 0)).map(value => {
//         value.contact_id = contact.contact_id;
//         return this.postContactValue(value);
//  }))



                // console.log(this.state.company_id)

        }
}


export default AddAdvert;