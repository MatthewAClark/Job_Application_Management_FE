import React from 'react'
import api_url from "./apiConfig";

const AddContactValues = (props) => {




        // handleFind_contactChange = (event) => {

        //         // Check the list to see if we already have that contact
        //         const i = this.props.getAllContactsState().findIndex(contact => contact.contact_name === event.target.value)
        //         if (i > -1) this.props.setContactState(this.props.getAllContactsState()[i]);
        // }

   

        // handleContact_positionChange = (event) => this.props.updateContactState({ contact_id: null, contact_position: event.target.value })

        // handleCapacity_knownChange = (event) => this.props.updateContactState({ contact_id: null, capacity_known: event.target.value })

        // handleReferenceChange = (event) => this.props.updateContactState({ contact_id: null, reference: !this.getContactState().reference })

        // handleDate_knownChange = (event) => this.props.updateContactState({ contact_id: null, date_known: event.target.value })

        // contactToggle = (event) => { // Clear data if we are adding a new contact and toggle the switch state
        //         this.setState({ toggle: !this.state.toggle })
        //         if (this.state.toggle) this.props.updateContactState({ contact_id: null })
        // }

console.log(props.value)

                return (
                        
                                <div>
                                         <label>{props.value.contact_type}</label>
                                         <input type="text" name="position" value={props.value.contact_value} disabled/>
                                        
                                
                                         </div>
                       
                )

        







}

export default AddContactValues;