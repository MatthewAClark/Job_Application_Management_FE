import React from 'react'
import api_url from "./apiConfig";
import Advert from "./Advert";

class AddAdvert extends React.Component {
        state = {
                // Table values we need for when we update
                data: {
                        occupation_id: undefined,
                        occupation: '',
                        company_id: undefined,
                        company_name: '',
                        address_field: '',
                        postcode: '',
                        contacts: [],
                        address_id: undefined,
                        position_title: '',
                        advert_ref: '',
                        contract_type: '',
                        contract_hours: '',
                        date_posted: null,
                        closing_date: null,
                        advert_url: '',
                        min_salary: '',
                        max_salary: '',
                        advert_description: ''
                },
                disabled: false
        }



        // I've created some getters and setters to pass down the classes. Updaters are also provided which update tables with certain fields only


        // Advert

        updateData = (update) => {
                const data = { ...this.state.data, ...update };
                this.setState({ data: data });
        }

        getData = () => this.state.data;

       addContact = (contact) => {
               var contacts = this.state.data.contacts
               contacts.push(contact)
               this.updateData({contacts: contacts})
       }

        render() {
                return (<form className="container">

                        <Advert addContact={this.addContact} updateData={this.updateData} getData={this.getData} state={this.state} addContact={this.addContact}/>

                        <button className="bnt btn-default" type="submit" onClick={this.newApplication}>Add</button>

                </form>
                );
        }

        newApplication = (event) => {
                // console.log(this.state.data)
                // Comment out for development purposes only
                //event.preventDefault();
                if (typeof (this.state.data.date_posted) === "string") {
                        if (this.state.data.date_posted.length < 1) this.updateData({ date_posted: null })
                }

                if (typeof (this.state.data.closing_date) === "string") {
                        if (this.state.data.closing_date.length < 1) this.updateData({ closing_date: null })
                }

                fetch(`${api_url}/api/adverts`, {
                        headers: new Headers({ "Content-Type": "application/json" }),
                        method: 'POST',
                        body: JSON.stringify(this.state.data)
                })
                        .then(res => res.json())
                        .then(data => console.log(data))
                        .catch(console.log)

        }
}


export default AddAdvert;