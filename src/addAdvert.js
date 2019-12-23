import React from 'react'
import api_url from "./apiConfig";
import Advert from "./Advert";

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
                }

              

        }



        // I've created some getters and setters to pass down the classes. Updaters are also provided which update tables with certain fields only


        // Advert
        setAdvertState = (advert) => this.setState({ advert: advert });

        setCompanyState = (company) => this.setState({ company: company });

        setAddressState = (address) => this.setState({ address: address });

        setContactState = (contact) => this.setState({ contact: contact })


        // Posting data to the server. 
        postCompany = (state) => new Promise(function (resolve, reject) {
                if (state.company.company_id > 0) resolve(state); else {
                        if (state.company.company_name !== '') {


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
                        } else resolve(state)

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
                                        state.contact = { ...contact, contact_values: values };
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
                console.log('here', contact_value)



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

                     
                        <Advert setAdvertState={this.setAdvertState} setAddressState={this.setAddressState} setCompanyState={this.setCompanyState} setContactState={this.setContactState} state={this.state} />
                      



                        <button className="bnt btn-default" type="submit" onClick={this.newApplication}>Add</button>

                </form>
                );
        }

        newApplication = (event) => {

                // Comment out for development purposes only
                event.preventDefault();



                // this.postAdvert()
                // console.log(this.state.advert)
                // console.log(this.state.company)
                // console.log(this.state.contact)
                // console.log(this.state.address)
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