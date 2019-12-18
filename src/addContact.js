import React from 'react'
import api_url from "./apiConfig";

class AddContact extends React.Component {
        state = {
                addNewContact: false
        }

      

// DOM reaction


        handleAddContact = () => {
                this.props.setContactState({contact_id: null, contact_name: '', contact_position: '', capacity_known: '', reference: false})
                this.setState({addNewContact: true})
             
        }

        handleContact_findChange = (event) => {

      

                this.props.setContactState(this.props.getAllContactsState()[this.props.getAllContactsState().findIndex(contact => parseInt(contact.contact_id) === parseInt(event.target.value))])
                
                
                // this.handleAddress_fieldChange()
                console.log(event.target.value)
        }


        handleContact_nameChange = (event) => {

                // Check the list to see if we already have that address
                // var postAddress = {}
                // const i = this.props.getAllAddressesState().findIndex(address => {
                //         return address.address_field === event.target.value
                // })

                // if (i > -1) postAddress = this.props.getAllAddressesState()[i]; else postAddress = address_field.event.target.value 
                this.props.setContactState({contact_id: null, contact_name: event.target.value})
                
        }

        handleContact_positionChange = (event) => {

                // Check the list to see if we already have that address
                this.props.setContactState({contact_position: event.target.value})
                // postAddress.postcode = event.target.value
                // this.props.updatePostAddress(postAddress)
        }

        handleCapacity_knownChange = (event) => {

                // Check the list to see if we already have that address
                this.props.setContactState({capacity_known: event.target.value})
                // postAddress.postcode = event.target.value
                // this.props.updatePostAddress(postAddress)
        }



        render() {

                const getContacts = []
                
             
                this.props.getAllContactsState().forEach(contact => {
                      
                        getContacts.push(<option value={contact.contact_id}>{contact.contact_name}</option> )})
                

                        if (this.state.addNewContact) {
                               return( <form>
   {/* <input list="addresses" onSelect={this.handleAddress_fieldChange} name="addresses"></input>
                                <datalist  id="addresses">
                                        {getAddresses}
                                </datalist> */}
       
                                <label>Contact Name:</label>
                                <input type='text' name="Contact name" onChange={this.handleContact_nameChange} value={this.props.getContactState().contact_name}/>
                             
                                <label>Position</label>
                                <input type="text" onChange={this.handleContact_positionChange} value={this.props.getContactState().contact_position} name="position" />

                                <label>Capacity Known</label>
                                <input type="text" onChange={this.handleCapacity_knownChange} value={this.props.getContactState().capacity_known} name="capacity known" />
                                
                                <button type='button' onClick={this.handleFindAddress} >Find Contact</button>   

                                </form>
                                )

                                                         

                        } else {
                                return (<form>
                                       
                                        <label>Find Contact</label>
                                        
                                        <select name="contact find" onChange={this.handleContact_findChange}>
                
                                              {getContacts}
                
                
                                        </select>
                                        <button type='button' onClick={this.handleAddContact} >New Contact</button> 
                
                                        
                                        
                
                
                
                
                
                {/* 
                
                
                                        <label>Industry</label>
                                        <input type="text" onChange={this.handleIndustryChange} name="Industry" />
                
                                        <label>Sector</label>
                                        <input type="text" onChange={this.handleSectorChange} name="Sector" />
                
                                        <label>URL</label>
                                        <input type="text" onChange={this.handleCompany_urlChange} name="Company URL" /> */}
                
                
                
                
                                        {/* <button className="bnt btn-default" type="submit" onClick={this.addLocation}>Add</button> */}
                                </form>
                                );
                        }
               
        }

        // addLocation = (event) => {

        //         // Comment out for development purposes only
        //         event.preventDefault();

        //         // 
        //         this.props.addAddressIdToState(this.state.address_id);

        //         // Add company to db if it doesn't already exist in db
        //         if (this.state.company_id === null) {


        //                 fetch(`${api_url}/api/companies`, {
        //                         headers: new Headers({ "Content-Type": "application/json" }),
        //                         method: 'POST',
        //                         body: JSON.stringify({

        //                                 company_name: this.state.company_name,
        //                                 sector: this.state.sector,
        //                                 industry: this.state.industry,
        //                                 company_url: this.state.company_url

        //                         })
        //                 })
        //                         .then(res => res.json())
        //                         .catch(console.log)
        //         }
        // }
}

export default AddContact;