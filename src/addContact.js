import React from 'react'
import api_url from "./apiConfig";

class AddContact extends React.Component {
        state = {
                address_id: null,
                contact_name: '',
                contact_title: '',
                contact_position: '',
                tel_number1: '',
                tel_number2: '',
                fax: '',
                email: '',
                contact_url: '',
                reference: false,
                date_known: null,
                addresses: []
        }

        componentDidMount() {

                // Fetch all the companies and their locations and put them on the state

                fetch(`${api_url}/api/addresses`)
                        .then(res => {
                                return res.json();
                        })
                        .then(body => {



                                this.setState({
                                        addresses: body.map(address => {
                                                const addStrArr = []
                                                if (address.company_name != null) addStrArr.push(address.company_name)
                                                if (address.line_1 != null) addStrArr.push(address.line_1)
                                                if (address.line_2 != null) addStrArr.push(address.line_2)
                                                if (address.town_city != null) addStrArr.push(address.town_city)
                                                address.str = addStrArr.join(', ')
                                                address.address_id = address.address_id
                                                return address
                                        })

                                })
                                console.log(this.state.addresses)
                        })
        }


        handleContact_nameChange = (event) => {
                console.log(event.target.value)
                this.setState({
                        contact_name: event.target.value
                })
        }

        handleContact_titleChange = (event) => {
                this.setState({
                        contact_title: event.target.value
                })
        }

        handleContact_positionChange = (event) => {
                this.setState({
                        contact_position: event.target.value
                })
        }

        handleTel_number1Change = (event) => {
                this.setState({
                        tel_number1: event.target.value
                })
        }

        handleTel_number2Change = (event) => {
                this.setState({
                        tel_number2: event.target.value
                })
        }

        handleFaxChange = (event) => {
                this.setState({
                        fax: event.target.value
                })
        }

        handleEmailChange = (event) => {
                this.setState({
                        email: event.target.value
                })
        }

        handleContact_urlChange = (event) => {
                this.setState({
                        contact_url: event.target.value
                })
        }

        handleReferenceChange = (event) => {
                this.setState({
                        reference: !this.state.reference
                })
        }

        handleDate_knownChange = (event) => {
                this.setState({
                        date_known: event.target.value
                })
        }



        handleAddressChange = (event) => {

                // update locations list with only companies in that location



                this.setState({
                        address_id: event.target.value,
                })



        }




        render() {

                // Get the list of company names for the company name fields
                const addresses = [];
                addresses.push(<option value={null}>Please select</option>);
                if (this.state.addresses.length > 0) {

                        this.state.addresses.forEach(address => {
                                addresses.push(<option value={address.address_id}>{address.str}</option>);

                        })




                }



                return (<form>

                        <label>Address</label>
                        <select name="addresses" onChange={this.handleAddressChange}>

                                {addresses}


                        </select>





                        <label>Name</label>
                        <input type="text" onChange={this.handleContact_nameChange} name="contact name" />


                        <label>Title</label>
                        <input type="text" onChange={this.handleContact_titleChange} name="contact title" />

                        <label>Position</label>
                        <input type="text" onChange={this.handleContact_positionChange} name="contact position" />

                        <label>telephone number 1</label>
                        <input type="text" onChange={this.handTel_number1Change} name="tel number 1" />

                        <label>telephone number 2</label>
                        <input type="text" onChange={this.handTel_number2Change} name="tel number 2" />

                        <label>Fax number </label>
                        <input type="text" onChange={this.handleFaxChange} name="fax" />

                        <label>Email </label>
                        <input type="text" onChange={this.handleEmailChange} name="email" />

                        <label>Website </label>
                        <input type="text" onChange={this.handleContact_urlChange} name="contact url" />


                        <label>Reference </label>
                        <input type="checkbox" name="reference" value={this.state.reference} onClick={this.handleReferenceChange} />

                        <label>Date known</label>
                        <input type="date" onChange={this.handleDate_knownChange} name="date known" />





                        <button className="bnt btn-default" type="submit" onClick={this.newApplication}>Add</button>
                </form>
                );
        }

        newApplication = (event) => {

                // Comment out for development purposes only
                event.preventDefault();
                console.log(this.state)

                fetch(`${api_url}/api/contacts`, {
                        headers: new Headers({ "Content-Type": "application/json" }),
                        method: 'POST',
                        body: JSON.stringify({
                                address_id: this.state.address_id,
                                contact_name: this.state.contact_name,
                                contact_title: this.state.contact_title,
                                contact_position: this.state.contact_position,
                                tel_number1: this.state.tel_number1,
                                tel_number2: this.state.tel_number2,
                                fax: this.state.fax,
                                email: this.state.email,
                                contact_url: this.state.contact_url,
                                reference: this.state.reference,
                                date_known: this.state.date_known
                        })
                })
                        .then(res => res.json())
                        .catch(console.log)
        }
}

export default AddContact;