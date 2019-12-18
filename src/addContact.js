import React from 'react'
import api_url from "./apiConfig";


class AddContact extends React.Component {

        state = {
                toggle: false
        }



        handleFind_contactChange = (event) => {

                // Check the list to see if we already have that contact

                var contact = {};
                const i = this.props.getAllContactsState().findIndex(contact => {
                        return contact.contact_name === event.target.value
                })

                if (i > -1) contact = this.props.getAllContactsState()[i]; else contact.contact_name = event.target.value

                this.props.setContactState(contact)


        }

        handleContact_nameChange = (event) => {

                // Check the list to see if we already have that contact
                console.log('contactname')
                this.props.updateContactState({ contact_id: null, contact_name: event.target.value })


        }

        handleContact_positionChange = (event) => {

                // Check the list to see if we already have that contact

                this.props.updateContactState({ contact_id: null, contact_position: event.target.value })


        }
        
        handleCapacity_knownChange = (event) => {

                // Check the list to see if we already have that contact

                this.props.updateContactState({ contact_id: null, capacity_known: event.target.value })


        }

        handleReferenceChange = (event) => {

                // Check the list to see if we already have that contact

                this.props.updateContactState({ contact_id: null, reference: !this.getContactState().reference })


        }

        handleDate_knownChange = (event) => {

                // Check the list to see if we already have that contact

                this.props.updateContactState({ contact_id: null, date_known: event.target.value })


        }
        
        contactToggle = (event) => {
                this.setState({toggle: !this.state.toggle})
                if(this.state.toggle) this.props.updateContactState({contact_id: null})
        }



        // newContact = () => {
        //         this.state.newContact = !this.state.newContact
        //         this.props.setContactState({})
        // }


        // handleWebsiteChange = (event) => {

        //         this.setState({

        //                 website: event.target.value
        //         })
        // }



        render() {

                const contacts = []
console.log(this.props.getAllContactsState())
                this.props.getAllContactsState().forEach(contact => contacts.push(<option value={contact.contact_name} ></option>))

                if (this.state.toggle) {
                        return (
                                <form>
                                        <label>Contact</label>


                                        <label>Name</label>
                                        <input type="text" onChange={this.handleContact_nameChange} name="Contact Name" />

                                        <label>Position</label>
                                        <input type="text" onChange={this.handleContact_positionChange} name="position" />
                                        
                                        <label>Capacity Known</label>
                                        <input type="text" onChange={this.handleCapacity_knownChange} name="Capacity known" />

                                        <label>Reference?</label>

                        <input type="checkbox" name="reference" value={this.props.getContactState().reference} onClick={this.handleReferenceChange} />



                                        <button type="button" onClick={this.contactToggle}>Cancel</button>






                                </form>
                        )

                } else {
                        return (<form>
                                <label>Find Contact</label>



                                <input list="contacts" onChange={this.handleFind_contactChange} name="contacts"></input>
                                <datalist id="contacts">
                                        {contacts}
                                </datalist>


                                <button type='button' onClick={this.contactToggle}>New Contact</button>



                                {/* 
        
        
                                <label>Industry</label>
                                <input type="text" onChange={this.handleIndustryChange} name="Industry" />
        
                                <label>Sector</label>
                                <input type="text" onChange={this.handleSectorChange} name="Sector" />
        
                                <label>URL</label>
                                <input type="text" onChange={this.handleContact_urlChange} name="Contact URL" /> */}



                                {/* 
                                <button className="bnt btn-default" type="submit" onClick={this.addContact}>Add</button> */}
                        </form>
                        );
                }




        }

        // addContact = (event) => {

        //         // Comment out for development purposes only
        //         event.preventDefault();

        //         // 


        //         // Add contact to db if it doesn't already exist in db

        // }
}

export default AddContact;