import React from 'react'
import ContactValues from './contactValues';


class Contact extends React.Component {

        state = {
                toggle: false,
                contact_type: '',
                contact_value: ''
        }

       


        handleFind_contactChange = (event) => {


                // Match the profession name with a name in the db
                var contact = {};

                const i = this.props.state.contacts.findIndex(contact => contact.contact_name.toUpperCase() === event.target.value.toUpperCase())
                if (i > -1) {
                        contact = { ...this.props.state.contacts[i] }
                        
                } else {
                        contact = { contact_name: event.target.value, contact_id: null }
                }

                // Prevent blank data from being entered
                if (event.target.value.trim().length === 0) {
                        contact.contact_id = undefined
                }

                this.props.updateData({ ...contact })

                // Check the list to see if we already have that contact
                // const i = this.props.getAllContactsState().findIndex(contact => contact.contact_name === event.target.value)
                // if (i > -1) this.props.setContactState(this.props.getAllContactsState()[i]);
        }

        handleContact_nameChange = (event) => {
                var contact_id = undefined;
                if (event.target.value.trim().length > 0) contact_id = null;
                this.props.updateData({contact_id: contact_id, contact_name: event.target.value })
              
        }

        handleAdd_values = (event) => {
                const values = this.props.getData().contact_values
                values.push({ contact_id: this.props.getData().contact_id, contact_type: this.state.contact_type, contact_value: this.state.contact_value })
                this.props.updateData({ contact_values: values })
        }

        handleContact_positionChange = (event) => this.props.updateData({ contact_position: event.target.value })

        handleContact_typeChange = (event) => this.setState({ contact_type: event.target.value })

        handleContact_valueChange = (event) => this.setState({ contact_value: event.target.value })

        handleCapacity_knownChange = (event) => this.props.updateData({ capacity_known: event.target.value })

        handleReferenceChange = (event) => this.props.updateData({ reference: !this.getContactState().reference })

        handleDate_knownChange = (event) => this.props.updateData({ date_known: event.target.value })

        contactToggle = (event) => { // Clear data if we are adding a new contact and toggle the switch state
                this.setState({ toggle: !this.state.toggle })
                if (this.state.toggle) {
                        this.props.updateData({ contact_id: undefined })
                        this.props.updateData({ contact_values: [] })
                }
        }

        render() {

                const contacts = []
                this.props.state.contacts.forEach(contact => {
                        if (contact !== null) contacts.push(<option value={contact.contact_name} ></option>)
                })



                if (this.props.disabled || this.state.toggle) {
                        return (
                                <div>
                                        <label>Contact</label>


                                        <label>Name</label>
                                        <input disabled={this.props.disabled} value={this.props.getData().contact_name} type="text" onChange={this.handleContact_nameChange} name="Contact Name" />

                                        <label>Position</label>
                                        <input disabled={this.props.disabled} value={this.props.getData().contact_position} type="text" onChange={this.handleContact_positionChange} name="position" />

                                        <label>Capacity Known</label>
                                        <input disabled={this.props.disabled} value={this.props.getData().capacity_known} type="text" onChange={this.handleCapacity_knownChange} name="Capacity known" />

                                        <label>Reference?</label>

                                        <input disabled={this.props.disabled} type="checkbox" name="reference" value={this.props.getData().reference} onClick={this.handleReferenceChange} />

                                        {this.props.getData().contact_values.map(value => {
                                                return (<div key={value.value_id}>

                                                        <ContactValues value={value} />


                                                </div>)
                                        })}
                                        <button disabled={this.props.disabled} type="button" onClick={this.contactToggle}>Cancel</button>
                                        <br />

                                        <input list="contact_types" name="contact_type" onChange={this.handleContact_typeChange} value={this.state.contact_type}></input>
                                        <datalist id="contact_types">
                                                <option value='Email'></option>
                                                <option value='Website'></option>
                                                <option value='Linkedin'></option>
                                                <option value='Telephone'></option>
                                                <option value='Mobile'></option>
                                                <option value='Fax'></option>
                                        </datalist>
                                        <input type="text" name="Contact Value" onChange={this.handleContact_valueChange} value={this.state.contact_value} />

                                        <button type="button" onClick={this.handleAdd_values}>Add Contact</button>





                                </div>
                        )

                } else {
                        return (<div>
                                <label>Find Contact</label>

                                <input list="contacts" onChange={this.handleFind_contactChange} name="contacts"></input>
                                <datalist id="contacts">
                                        {contacts}
                                </datalist>
                               

                                {this.props.getData().contact_values.map(value => {
                                        return (<div key={value.value_id}>

                                                <ContactValues value={value} />


                                        </div>)
                                })}

                                <button type='button' onClick={this.contactToggle}>New Name</button>
                                <br />

                                <input list="contact_types" name="contact_type" onChange={this.handleContact_typeChange} value={this.state.contact_type}></input>
                                <datalist id="contact_types">
                                        <option value='Email'></option>
                                        <option value='Website'></option>
                                        <option value='Linkedin'></option>
                                        <option value='Telephone'></option>
                                        <option value='Mobile'></option>
                                        <option value='Fax'></option>
                                </datalist>
                                <input type="text" name="Contact Value" onChange={this.handleContact_valueChange} value={this.state.contact_value} />

                                <button type="button" onClick={this.handleAdd_values}>Add Contact</button>


                        </div>
                        );
                }




        }


}

export default Contact;