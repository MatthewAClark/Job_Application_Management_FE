import React from 'react'
import api_url from "./apiConfig";

class AddOrganisation extends React.Component {
    state = {
        organisation_name: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        postcode: "",
        email: "",
        organisation_url: "",
        contact_number: "",
        fax_number: ""
    }



    handleOrganisation_nameChange = (event) => {

        this.setState({

            organisation_name: event.target.value
        })
    }

    handleAddress1Change = (event) => {

        this.setState({

            address1: event.target.value
        })
    }

    handleAddress2Change = (event) => {

        this.setState({

            address2: event.target.value
        })
    }

    handleAddress3Change = (event) => {

        this.setState({

            address3: event.target.value
        })
    }

    handleAddress4Change = (event) => {

        this.setState({

            address4: event.target.value
        })
    }

    handlePostcodeChange = (event) => {

        this.setState({

            postcode: event.target.value
        })
    }

    handleEmailChange = (event) => {

        this.setState({

            email: event.target.value
        })
    }

    handleOrganisation_urlChange = (event) => {

        this.setState({

            organisation_url: event.target.value
        })
    }

    handleContact_numberChange = (event) => {

        this.setState({

            contact_number: event.target.value
        })
    }

    handleFax_numberChange = (event) => {

        this.setState({

            fax_number: event.target.value
        })
    }



    render() {

     
        return (<form>
            


            <label>Organisation Name</label>
            <input type="text" onChange={this.handleOrganisation_nameChange} name="Organisation Name" />

            <label>Address</label>
            <input type="text" onChange={this.handleAddress1Change} name="Address 1" />
            <input type="text" onChange={this.handleAddress2Change} name="Address 2" />
            <input type="text" onChange={this.handleAddress3Change} name="Address 3" />
            <input type="text" onChange={this.handleAddress4Change} name="Address 4" />

            <label>Postcode</label>
            <input type="text" onChange={this.handlePostcodeChange} name="Postcode" />

            <label>Email</label>
            <input type="text" onChange={this.handleEmailChange} name="Email" />

            <label>Website</label>
            <input type="text" onChange={this.handleOrganisation_urlChange} name="URL" />

            <label>Contact Number</label>
            <input type="text" onChange={this.handleContact_numberChange} name="URL" />

            <label>Fax Number</label>
            <input type="text" onChange={this.handleFax_numberChange} name="URL" />



            <button className="bnt btn-default" type="submit" onClick={this.newOrganisation}>Add</button>
        </form>
        );
    }

    newOrganisation = (event) => {

        // Comment out for development purposes only
        event.preventDefault();

        fetch(`${api_url}/api/organisation`, {
            headers: new Headers({ "Content-Type": "application/json" }),
            method: 'POST',
            body: JSON.stringify({
                organisation_name: this.state.organisation_name,
                address1: this.state.address1,
                address2: this.state.address2,
                address3: this.state.address3,
                address4: this.state.address4,
                postcode: this.state.postcode,
                email: this.state.email,
                organisation_url: this.state.organisation_url,
                contact_number: this.state.contact_number,
                fax_number: this.state.fax_number
            })
        })
            .then(res => res.json())
            .catch(console.log)
    }
}

export default AddOrganisation;