import React from 'react'
import ContactValues from './contactMethods';
import api_url from "./apiConfig";


class Contact extends React.Component {

        state = {
                toggle: false,
                contact_type: '',
                contact_value: '',
                contact_methods: [],
                contact_name: '',
                contact_id: undefined,
                disabled: true
        }







        handleAdd_values = (event) => {
                // console.log(this.state)
                this.props.contact.contact_methods.push({ method_id: null, contact_id: this.props.contact.contact_id, contact_method: this.state.contact_method, contact_value: this.state.contact_value })


                var contacts = this.props.getData().contacts
                contacts[this.props.i] = this.props.contact

                this.props.updateData({ contacts: contacts })

                // const values = contact.contact_methods
                // values.push()
                // this.props.updateData({ contact_methods: values })
        }

        // handleContact_positionChange = (event) => this.props.updateData({ contact_position: event.target.value })

        handleContact_methodChange = (event) => this.setState({ contact_method: event.target.value })

        handleContact_valueChange = (event) => this.setState({ contact_value: event.target.value })

        // handleCapacity_knownChange = (event) => this.props.updateData({ capacity_known: event.target.value })

        // handleReferenceChange = (event) => this.props.updateData({ reference: !this.getContactState().reference })

        // handleDate_knownChange = (event) => this.props.updateData({ date_known: event.target.value })

        // contactToggle = (event) => { // Clear data if we are adding a new contact and toggle the switch state
        //         this.setState({ toggle: !this.state.toggle })
        //         if (this.state.toggle) {
        //                 this.props.updateData({ contact_id: undefined })
        //                 this.props.updateData({ contact_values: [] })
        //         }
        // }

        render() {
                // console.log(this.props.contact)
                //  if (this.props.contact.contact_id > 0) {
                //          console.log('here')
                //         fetch(`${api_url}/api/contacts/methods/${this.props.contact.contact_id}`)
                //                 .then(res => res.json())
                //                 .then(body => this.setState({ contact_methods: body }))
                //  }


                // const contacts = []

                // this.props.state.contacts.forEach(contact => {
                //         if (contact !== null) contacts.push(<option value={contact.contact_name} ></option>)
                // })




                return (
                        <div>
                                <label>Contact</label>
                                <br />

                                <input disabled={this.state.disabled} value={this.props.contact.contact_name}></input>
                                {/* <input disabled value={this.props.contact.contact_name} type="text" onChange={this.handleContact_nameChange} name="Contact Name" /> */}

                                {/* <label>Position</label>
                                        <input disabled={this.props.disabled} value={this.props.contact.contact_position} type="text" onChange={this.handleContact_positionChange} name="position" />

                                        <label>Capacity Known</label>
                                        <input disabled={this.props.disabled} value={this.props.contact.capacity_known} type="text" onChange={this.handleCapacity_knownChange} name="Capacity known" />

                                        <label>Reference?</label> */}

                                {/* <input disabled={this.props.disabled} type="checkbox" name="reference" value={this.props.contact.reference} onClick={this.handleReferenceChange} /> */}

                                {this.props.contact.contact_methods.map(value => {
                                        return (<div key={value.value_id}>

                                                <ContactValues value={value} />


                                        </div>)
                                })}
                                {/* <button disabled={this.props.disabled} type="button" onClick={this.contactToggle}>Cancel</button> */}
                                <br />

                                <input list="contact_methods" name="contact_method" onChange={this.handleContact_methodChange} value={this.state.contact_method}></input>
                                <datalist id="contact_methods">
                                        <option value='Email'></option>
                                        <option value='Website'></option>
                                        <option value='Linkedin'></option>
                                        <option value='Telephone'></option>
                                        <option value='Mobile'></option>
                                        <option value='Fax'></option>
                                </datalist>
                                <input type="text" disabled={this.props.disabled} name="Contact Value" onChange={this.handleContact_valueChange} value={this.state.contact_value} />

                                <button type="button" disabled={this.props.disabled} onClick={this.handleAdd_values}>Add Method</button>





                        </div>
                )

        }
        //                 else {
        //                         return (<div className="form-group">
        //                                 <label>Find Contact</label>

        //                                 <input className="form-control" list="contacts" onChange={this.handleFind_contactChange} name="contacts"></input>
        //                                 <datalist id="contacts">
        //                                         {contacts}
        //                                 </datalist>


        //                                 {this.props.getData().contact_values.map(value => {
        //                                         return (<div key={value.value_id}>

        //                                                 <ContactValues value={value} />


        //                                         </div>)
        //                                 })}

        //                                 <button type='button' onClick={this.contactToggle}>New Name</button>
        //                                 <br />

        // <label>Contact Type</label>
        //                                 <input className="form-control" list="contact_methods" name="contact_type" onChange={this.handleContact_typeChange} value={this.state.contact_type}></input>
        //                                 <datalist id="contact_types">
        //                                         <option value='Email'></option>
        //                                         <option value='Website'></option>
        //                                         <option value='Linkedin'></option>
        //                                         <option value='Telephone'></option>
        //                                         <option value='Mobile'></option>
        //                                         <option value='Fax'></option>
        //                                 </datalist>

        //                                 <label>Contact Value</label>
        //                                 <input className="form-control" disabled={this.props.disabled} type="text" name="Contact Value" onChange={this.handleContact_valueChange} value={this.state.contact_value} />

        //                                 <button disabled={this.props.disabled} type="button" onClick={this.handleAdd_values}>Add Contact</button>


        //                         </div>
        // );
}









export default Contact;