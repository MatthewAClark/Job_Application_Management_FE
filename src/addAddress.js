import React from 'react'
import api_url from "./apiConfig";


class AddAddress extends React.Component {

        state = {
                toggle: false
        }


        // DOM elements
        // Match the address to what we have in the db
        handleFind_addressChange = (event) => {
        //         console.log(event.target.value)
        //        console.log(this.props.getAllAddressesState())
                this.props.setAddressState(this.props.getAllAddressesState()[this.props.getAllAddressesState().findIndex(address => address.address_id == event.target.value)])
                // console.log(this.props.getAllAddressesState()[this.props.getAllAddressesState().findIndex(address => address.address_id == event.target.value)])
        }

        // Ensure address id is null, if we are adding a new address it's what we use to determine whether we need to post to the db
        handleAddress_fieldChange = (event) => this.props.updateAddressState({ address_id: null, address_field: event.target.value })

        handlePostcodeChange = (event) => this.props.updateAddressState({ address_id: null, postcode: event.target.value })

        addressToggle = (event) => { // Set by the New Address/Cancel button to determine whether we are selecting an already existing company in our db, or adding a new one
                this.setState({ toggle: !this.state.toggle })
                if (this.state.toggle) this.props.updateAddressState({ address_id: null })
        }




        render() {

                // Generate the list of addresses from the db
                const addresses = []
                addresses.push(<option value='Please select' selected disabled hidden>none</option>) // Add blank option
                this.props.getAllAddressesState().forEach(address => addresses.push(<option value={address.address_id} >{address.address_field}, {address.postcode}</option>))

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
                                <select id="addresses" onChange={this.handleFind_addressChange}>
                                        {addresses}
                                </select>
                                <button type='button' onClick={this.addressToggle}>New Address</button>
                        </form>
                        );
                }

        }
}

export default AddAddress;