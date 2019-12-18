import React from 'react'
import api_url from "./apiConfig";


class AddAddress extends React.Component {

        state = {
                toggle: false
        }



        handleFind_addressChange = (event) => {

                // Check the list to see if we already have that address

                var address = {};
                const i = this.props.getAllAddressesState().findIndex(address => {
                        return address.address_field === event.target.value
                })

                if (i > -1) address = this.props.getAllAddressesState()[i]; else address.address_field = event.target.value
console.log(address)
                this.props.setAddressState(address)


        }

        handleAddress_fieldChange = (event) => {

                // Check the list to see if we already have that address

                this.props.updateAddressState({ address_id: null, address_field: event.target.value })


        }

        handlePostcodeChange = (event) => {

                // Check the list to see if we already have that address

                this.props.updateAddressState({ address_id: null, postcode: event.target.value })


        }

        addressToggle = (event) => {
                console.log('should not be here')
                this.setState({toggle: !this.state.toggle})
                if(this.state.toggle) this.props.updateAddressState({address_id: null})
        }



        // newAddress = () => {
        //         this.state.newAddress = !this.state.newAddress
        //         this.props.setAddressState({})
        // }


        // handleWebsiteChange = (event) => {

        //         this.setState({

        //                 website: event.target.value
        //         })
        // }



        render() {

                const addresses = []

                this.props.getAllAddressesState().forEach(address => addresses.push(<option value={address.address_field} >{address.postcode}</option>))

                if (this.state.toggle) {
                        return (
                                <form>
                                        <label>Address</label>


                                        <textarea className="textarea" name="address_field" onChange={this.handleAddress_fieldChange} value={this.props.getAddressState().address_field}></textarea>

                                        <label>Postcode</label>
                                        <input type="text" onChange={this.handlePostcodeChange} name="Postcode" />



                                        <button type="button" onClick={this.addressToggle}>Cancel</button>






                                </form>
                        )

                } else {
                        return (<form>
                                <label>Find Address</label>



                                <input list="addresses" onChange={this.handleFind_addressChange} name="addresses"></input>
                                <datalist id="addresses">
                                        {addresses}
                                </datalist>


                                <button type='button' onClick={this.addressToggle}>New Address</button>



                                {/* 
        
        
                                <label>Industry</label>
                                <input type="text" onChange={this.handleIndustryChange} name="Industry" />
        
                                <label>Sector</label>
                                <input type="text" onChange={this.handleSectorChange} name="Sector" />
        
                                <label>URL</label>
                                <input type="text" onChange={this.handleAddress_urlChange} name="Address URL" /> */}



                                {/* 
                                <button className="bnt btn-default" type="submit" onClick={this.addAddress}>Add</button> */}
                        </form>
                        );
                }




        }

        // addAddress = (event) => {

        //         // Comment out for development purposes only
        //         event.preventDefault();

        //         // 


        //         // Add address to db if it doesn't already exist in db

        // }
}

export default AddAddress;