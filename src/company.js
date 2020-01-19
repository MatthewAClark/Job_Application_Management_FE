import React from 'react'
import api_url from "./apiConfig";

class Company extends React.Component {

        state = {
                companies: []
        }

        componentDidMount() {
                // Fetch the list of professions and add them to the state
                fetch(`${api_url}/api/companies/list`)
                        .then(res => res.json())
                        .then(body => {
                                this.setState({ companies: body })
                        })
        }

        handleCompany_nameChange = (event) => {

                // Match the profession name with a name in the db
                var company = {};


                const i = this.state.companies.findIndex(company => company.company_name.toUpperCase() === event.target.value.toUpperCase())
                if (i > -1) {
                        company = { ...this.state.companies[i] }
                        fetch(`${api_url}/api/addresses/companies/live/${company.company_id}`)
                                .then(res => res.json())
                                .then(body => this.props.setCompanyAddresses(body))
                        // Fetch contacts from company
                        fetch(`${api_url}/api/contacts/?company_id=${company.company_id}`)
                                .then(res => res.json())
                                .then(body => this.props.setContacts(body))

                } else {
                        company = { company_name: event.target.value, company_id: null };
                        this.props.setCompanyAddresses([]);
                        this.props.setContacts([]);
                }

                // Prevent blank data from being entered
                if (event.target.value.trim().length === 0) {
                        company.company_id = undefined
                }
                this.props.updateData({ ...company })
        }



        render() {
              
                // Produce a list of all the companies in our db for our DOM value={this.props.state.data.company_name} 
                const companies = [];
                this.state.companies.forEach((company, i) => companies.push(<option value={company.company_name} key={i}/>))

                return (<div className="form-group">
                        <label>Company Name</label>
                        <input className="form-control" disabled={this.props.disabled} list="companies" value={this.props.state.data.company_name} onChange={this.handleCompany_nameChange} name="companies"></input>
                        <datalist id="companies">
                                {companies}
                        </datalist>



                </div>
                );
        }






}

export default Company;