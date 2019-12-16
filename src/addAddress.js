import React from 'react'
import api_url from "./apiConfig";

class AddAddress extends React.Component {
        state = {
                company_location: '',
                address_field: '',
                postcode: '',
                addresses: this.props.addresses,
                address_id: null
        }

        // Fetch a list of all the companies so we know not to add the same company twice
        componentDidMount() {
              
        }


        handleCompany_locationChange = (event) => {

                // Check the list to see if we already have that address

                const i = this.state.addresses.findIndex(address => {
                        return address.company_location === event.target.value
                })

                if (i > -1) this.setState({ address_id: (this.state.addresses[i].address_id) })

                this.setState({
                        company_location: event.target.value
                })
        }

        // handleWebsiteChange = (event) => {

        //         this.setState({

        //                 website: event.target.value
        //         })
        // }



        render() {

                const addresses = []
console.log(this.props.addresses)
                this.props.addresses.forEach(address => addresses.push(<option value={address.company_location} />))


                return (<form>
                        <label>Company Location</label>



                        <input list="addresses" onChange={this.handleCompany_locationChange} name="addresses"></input>
                        <datalist id="addresses">
                                {addresses}
                        </datalist>





{/* 


                        <label>Industry</label>
                        <input type="text" onChange={this.handleIndustryChange} name="Industry" />

                        <label>Sector</label>
                        <input type="text" onChange={this.handleSectorChange} name="Sector" />

                        <label>URL</label>
                        <input type="text" onChange={this.handleCompany_urlChange} name="Company URL" /> */}




                        <button className="bnt btn-default" type="submit" onClick={this.addLocation}>Add</button>
                </form>
                );
        }

        addLocation = (event) => {

                // Comment out for development purposes only
                event.preventDefault();

                // 
                this.props.addAddressIdToState(this.state.address_id);

                // Add company to db if it doesn't already exist in db
                if (this.state.company_id === null) {


                        fetch(`${api_url}/api/companies`, {
                                headers: new Headers({ "Content-Type": "application/json" }),
                                method: 'POST',
                                body: JSON.stringify({

                                        company_name: this.state.company_name,
                                        sector: this.state.sector,
                                        industry: this.state.industry,
                                        company_url: this.state.company_url

                                })
                        })
                                .then(res => res.json())
                                .catch(console.log)
                }
        }
}

export default AddAddress;