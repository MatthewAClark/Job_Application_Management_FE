import React from 'react'
import api_url from "./apiConfig";

class AddAddress extends React.Component {
        state = {
                addNewAddress: false
        }

      

// DOM reaction
        handleFindAddress = () => {
                this.props.setAddressState(this.props.getAllAddressesState[0])
                this.setState({addNewAddress: false})
          
        }

        handleAddAddress = () => {
                this.props.setAddressState({address_id: null, address_field: '', postcode: ''})
                this.setState({addNewAddress: true})
             
        }

        handleAddress_findChange = (event) => {

                // Check the list to see if we already have that address
                // var postAddress = {}
                // const i = this.props.getAddresses.findIndex(address => {
                //         return address.address_field === event.target.value
                // })

                // if (i > -1) postAddress = this.props.getAddresses[i]; else postAddress.address_field = event.target.value

                // Add selected address to state
                // this.props.updatePostAddress(this.props.getAddresses[this.props.getAddresses.findIndex(address => parseInt(address.address_id) === parseInt(event.target.value))])

                this.props.setAddressState(this.props.getAllAddressesState()[this.props.getAllAddressesState().findIndex(address => parseInt(address.address_id) === parseInt(event.target.value))])
                
                
                // this.handleAddress_fieldChange()
                console.log(event.target.value)
        }


        handleAddress_fieldChange = (event) => {

                // Check the list to see if we already have that address
                // var postAddress = {}
                // const i = this.props.getAllAddressesState().findIndex(address => {
                //         return address.address_field === event.target.value
                // })

                // if (i > -1) postAddress = this.props.getAllAddressesState()[i]; else postAddress = address_field.event.target.value 
                this.props.setAddressState({address_id: null, address_field: event.target.value})
                
        }

        handlePostcodeChange = (event) => {

                // Check the list to see if we already have that address
                this.props.setAddressState({postcode: event.target.value})
                // postAddress.postcode = event.target.value
                // this.props.updatePostAddress(postAddress)
        }



        render() {

                const getAddresses = []
                
             
                this.props.getAllAddressesState().forEach(address => {
                      
                        getAddresses.push(<option value={address.address_id}>{address.address_field + ', ' + address.postcode}</option> )})
                

                        if (this.state.addNewAddress) {
                               return( <form>
   {/* <input list="addresses" onSelect={this.handleAddress_fieldChange} name="addresses"></input>
                                <datalist  id="addresses">
                                        {getAddresses}
                                </datalist> */}
       
                                <label>Address:</label>
                                <textarea className="textarea" name="address_field" onChange={this.handleAddress_fieldChange} value={this.props.getAddressState().address_field} cols="10" rows=""></textarea>
                             
                                <label>Postcode</label>
                                <input type="text" onChange={this.handlePostcodeChange} value={this.props.getAddressState().postcode} name="Postcode" />
                                
                                <button type='button' onClick={this.handleFindAddress} >Find Address</button>   

                                </form>
                                )

                                                         

                        } else {
                                return (<form>
                                       
                                        <label>Find Address</label>
                                        
                                        <select name="address find" onChange={this.handleAddress_findChange}>
                
                                              {getAddresses}
                
                
                                        </select>
                                        <button type='button' onClick={this.handleAddAddress} >New Address</button> 
                
                                        
                                        
                
                
                
                
                
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

export default AddAddress;