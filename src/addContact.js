import React from 'react'
import api_url from "./apiConfig";
import AddContactValues from './addContactValues';


class AddContact extends React.Component {

        state = {
                toggle: false,
                contact_type: '',
                contact_value: ''
        }



        handleFind_contactChange = (event) => {

                // Check the list to see if we already have that contact
                const i = this.props.getAllContactsState().findIndex(contact => contact.contact_name === event.target.value)
                if (i > -1) this.props.setContactState(this.props.getAllContactsState()[i]);
        }

        handleContact_nameChange = (event) => this.props.updateContactState({ contact_id: null, contact_name: event.target.value })

        handleAdd_values = (event) => {
                const values = this.props.getContactState().contact_values
                values.push({ contact_id: this.props.getContactState().contact_id, contact_type: this.state.contact_type, contact_value: this.state.contact_value })
                this.props.updateContactState({ contact_values: values })
                console.log(values)
        }

        handleContact_positionChange = (event) => this.props.updateContactState({ contact_id: null, contact_position: event.target.value })

        handleContact_typeChange = (event) => this.setState({ contact_type: event.target.value })

        handleContact_valueChange = (event) => this.setState({ contact_value: event.target.value })

        handleCapacity_knownChange = (event) => this.props.updateContactState({ contact_id: null, capacity_known: event.target.value })

        handleReferenceChange = (event) => this.props.updateContactState({ contact_id: null, reference: !this.getContactState().reference })

        handleDate_knownChange = (event) => this.props.updateContactState({ contact_id: null, date_known: event.target.value })

        contactToggle = (event) => { // Clear data if we are adding a new contact and toggle the switch state
                this.setState({ toggle: !this.state.toggle })
                if (this.state.toggle) {
                        this.props.updateContactState({ contact_id: null })
                        this.props.updateContactState({ contact_values: [] })
                }
        }

        render() {

                const contacts = []
                this.props.getAllContactsState().forEach(contact => {
                        if (contact !== null) contacts.push(<option value={contact.contact_name} ></option>)
                })



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

                                        {this.props.getContactState().contact_values.map(value => {
                                                return (<div key={value.value_id}>

                                                        <AddContactValues value={value} />


                                                </div>)
                                        })}
                                        <button type="button" onClick={this.contactToggle}>Cancel</button>
                                        <br/>

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

                                        



                                </form>
                        )

                } else {
                        return (<form>
                                <label>Find Contact</label>

                                <input list="contacts" onChange={this.handleFind_contactChange} name="contacts"></input>
                                <datalist id="contacts">
                                        {contacts}
                                </datalist>
                                {console.log(this.props.getContactState())}

                                {this.props.getContactState().contact_values.map(value => {
                                        return (<div key={value.value_id}>

                                                <AddContactValues value={value} />


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









                        </form>
                        );
                }




        }


}

export default AddContact;