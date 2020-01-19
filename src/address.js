import React from 'react'


class Address extends React.Component {

        state = {
                toggle: false
        }

      

        // DOM elements
        // Match the address to what we have in the db

        
     
        handleFind_addressChange = (event) => {
                

                this.props.updateData(this.props.state.addresses[this.props.state.addresses.findIndex(address => address.address_id == event.target.value)])
               
        }

        // Ensure address id is null, if we are adding a new address it's what we use to determine whether we need to post to the db


        handleAddress_fieldChange = (event) => {
                var address_id = null
                if ((event.target.value.trim().length + this.props.getData().postcode.trim().length) === 0 ) {
                        address_id = undefined
                }
                this.props.updateData({ address_id: address_id, address_field: event.target.value })
        }


        handlePostcodeChange = (event) => this.props.updateData({ address_id: null, postcode: event.target.value })

        addressToggle = (event) => { // Set by the New Address/Cancel button to determine whether we are selecting an already existing company in our db, or adding a new one
                this.setState({ toggle: !this.state.toggle })
                if (this.state.toggle) this.props.updateData({ address_id: null })
        }




        render() {



                // Generate the list of addresses from the db
                const addresses = []
                // addresses.push(<option value={null} key={0}>none</option>) // Add blank option

                this.props.state.addresses.forEach((address, i) => addresses.push(<option value={address.address_id} key={i} >{address.address_field}, {address.postcode}</option>))

                if (this.props.disabled || this.state.toggle) {
                        return (
                                <div>
                                        <label>Address</label>
                                        <textarea disabled={this.props.disabled} className="textarea" name="address_field" onChange={this.handleAddress_fieldChange} value={this.props.getData().address_field}></textarea>
                                        <label>Postcode</label>
                                        <input disabled={this.props.disabled} type="text" onChange={this.handlePostcodeChange} value={this.props.getData().postcode} name="Postcode" />
                                        <button type="button" disabled={this.props.disabled} onClick={this.addressToggle}>Cancel</button>

                                </div>
                        )

                } else {
                        return (<div>
                                <label>Find Address</label>
                                <select id="addresses" onChange={this.handleFind_addressChange}>
                                        {addresses}
                                </select>
                                <button type='button' onClick={this.addressToggle}>New Address</button>
                        </div>
                        );
                }

        }
}

export default Address;