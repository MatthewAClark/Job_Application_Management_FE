import React from 'react'
import api_url from "./apiConfig";
import Advert from "./Advert";

class EditAdvert extends React.Component {
        state = {

                // Table values we need for when we update
                data: {
                        advert_id: null,
                        company_id: null,
                        address_id: null,
                        contact_id: null,
                        contact_name: '',
                        position_title: '',
                        profession: '',
                        advert_ref: '',
                        contract_type: '',
                        full_time_part_time: '',
                        date_posted: null,
                        closing_date: null,
                        advert_url: '',
                        min_salary: '',
                        max_salary: '',
                        advert_description: '',
                        agency: false,
                        job_board: '',
                        voluntary: false,
                        job_location: '',
                        profession_id: null,
                        company_name: '',
                        address_field: '',
                        postcode: '',
                        contact_position: '',
                        capacity_known: '',
                        reference: false,
                        date_known: null,
                        contact_values: [],
                        contacts: [],
                        skills: []
                },
                disabled: true,

                // All fetched values from the database
                allAddresses: [],
                allCompanies: [],
                allContacts: []

        }

        // First thing first. Fetch the list of companies we have in our database
        componentDidMount() {

                fetch(`${api_url}/api/adverts/${this.props.match.params.advert_id}`)
                        .then(res => res.json())
                        .then(advert => {
                                advert.contact_values = [];
                                if (advert.date_posted === null) advert.date_posted = ''
                                if (advert.closing_date === null) advert.closing_date = ''
                                this.updateData({...advert, contacts: []})
                                fetch(`${api_url}/api/adverts/contacts/${this.props.match.params.advert_id}`)
                                        .then(res => res.json())
                                        .then(contacts => {
                                                this.updateData({contacts: contacts.map(contact => {return {...contact, contact_methods: []}})})      
                                               contacts.forEach((contact,i) => {
                                                        fetch(`${api_url}/api/contacts/methods/${contact.contact_id}`)
                                                        .then(res => res.json())
                                                        .then(methods => {
                                                                if(methods.length > 0) {
                                                                        contacts[i] = {...contact, contact_methods: methods}
                                                                        this.updateData({contacts: contacts})
                                                                }
                                                        })
                                                })         
                                        })

                                        fetch(`${api_url}/api/adverts/requirements/${advert.advert_id}`)
                                        .then(res => res.json())
                                        .then(skills => {
                                                this.updateData({skills: skills})
                                        })
                        })

        }

        // I've created some getters and setters to pass down the classes. Updaters are also provided which update tables with certain fields only


        // Advert
        getData = () => this.state.data;

                updateData = (update) => {
                        const data = { ...this.state.data, ...update };
                        this.setState({ data: data });
                }







                render() {
                        console.log(this.getData())
                        if (this.state.disabled) {
                                return (<form className="container">

                                        <Advert updateData={this.updateData} getData={this.getData} state={this.state} />
                                        <button className="bnt btn-default" type="button" onClick={this.disableToggle}>Edit</button>

                                        <button className="bnt btn-default" disabled={this.state.disabled} type="submit" onClick={this.editThisAdvert}>update</button>

                                </form>
                                );
                        } else {
                                return (<form>

                                        <Advert updateData={this.updateData} getData={this.getData} state={this.state} />

                                        <button className="bnt btn-default" type="button" onClick={this.disableToggle}>Cancel</button>

                                        <button className="bnt btn-default" disabled={this.state.disabled} type="submit" onClick={this.editThisAdvert}>update</button>

                                </form>
                                );
                        }

                }

                disableToggle = () => this.setState({ disabled: !this.state.disabled })

                editThisAdvert = (event) => {

                        // Comment out for development purposes only
                        event.preventDefault();
                        if (typeof (this.state.data.date_posted) === "string") {
                                if (this.state.data.date_posted.length < 1) this.updateData({ date_posted: null })
                        }

                        if (typeof (this.state.data.closing_date) === "string") {
                                if (this.state.data.closing_date.length < 1) this.updateData({ closing_date: null })
                        }

                       

                        // const advert_id = state.advert.advert_id
                        // delete state.advert.advert_id
                        // console.log(advert_id)
                        // fetch(`${api_url}/api/adverts/${this.state.data.advert_id}`, {
                        //         headers: new Headers({ "Content-Type": "application/json" }),
                        //         method: 'PUT',
                        //         body: JSON.stringify(this.state.data)
                        // })
                        //         // .then(res => res.json())
                        //         // .then(advert => {
                        //         //         // state.advert = advert;
                        //         //         // resolve(state)
                        //         //         console.log(advert)
                        //         // })
                        //         .catch(console.log)

                        console.log(this.state.data)

                }
        }


        export default EditAdvert;