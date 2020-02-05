import React from 'react'



class AddContact extends React.Component {

        state = {
                toggle: false,
                contact_name: '',
                contact_id: undefined
        }





        handleFind_contactChange = (event) => {


                // Match the profession name with a name in the db
                var contact = {};
                console.log('contacts ',this.props.state.contacts)
                const i = this.props.state.contacts.findIndex(contact => contact.contact_name.toUpperCase() === event.target.value.toUpperCase())
                if (i > -1) {

                        contact = { ...this.props.state.contacts[i] }
                        this.setState({ contact_id: contact.contact_id, contact_name: contact.contact_name })

                } else {


                        var contact_id = undefined;
                        if (event.target.value.trim().length > 0) contact_id = null;
                        this.setState({ contact_methods: [], contact_name: event.target.value, contact_id: contact_id })
                }



        }

        addNewContact = (event) => { // 
                // this.setState({ toggle: !this.state.toggle })
                // if (this.state.toggle) {
                //         this.props.updateData({ contact_id: undefined })
                //         this.props.updateData({ contact_values: [] })
                // }
                var contacts = this.props.getData().contacts
                if (this.state.contact_id !== undefined) {
                        contacts.push({ contact_id: this.state.contact_id, contact_name: this.state.contact_name })
                        this.props.updateData({ contacts: contacts })
                }
               

        }


        render() {


                const contacts = []

                this.props.state.contacts.forEach(contact => {
                        if (contact !== null) contacts.push(<option value={contact.contact_name} ></option>)
                })




                return (<div className="form-group">
                        <label>New Contact</label>

                        <input className="form-control" list="contacts" onChange={this.handleFind_contactChange} name="contacts"></input>
                        <datalist id="contacts">
                                {contacts}
                        </datalist>




                        <button type='button' onClick={this.addNewContact}>New Contact</button>
                        <br />


                </div>
                );
        }




}




export default AddContact;