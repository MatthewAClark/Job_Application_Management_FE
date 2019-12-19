import React from 'react'
import api_url from "./apiConfig";

class AddCompany extends React.Component {

        handleCompany_nameChange = (event) => {

                // Match the company name with a name in the db

                var company = {};
                const i = this.props.getAllCompaniesState().findIndex(company => company.company_name === event.target.value)
                if (i > -1) company = this.props.getAllCompaniesState()[i]; else company.company_name = event.target.value
                this.props.setCompanyState(company)
        }

        // handleWebsiteChange = (event) => {

        //         this.setState({

        //                 website: event.target.value
        //         })
        // }



        render() {

                // Produce a list of all the companies in our db for our DOM
                const companies = [];
                this.props.getAllCompaniesState().forEach(company => companies.push(<option value={company.company_name} />))


                return (<form>
                        <label>Company Name</label>
                        <input list="companies" onChange={this.handleCompany_nameChange} name="companies"></input>
                        <datalist id="companies">
                                {companies}
                        </datalist>


                        {/* 


                        <label>Industry</label>
                        <input type="text" onChange={this.handleIndustryChange} name="Industry" />

                        <label>Sector</label>
                        <input type="text" onChange={this.handleSectorChange} name="Sector" />

                        <label>URL</label>
                        <input type="text" onChange={this.handleCompany_urlChange} name="Company URL" /> */}



                        {/* 
                        <button className="bnt btn-default" type="submit" onClick={this.addCompany}>Add</button> */}
                </form>
                );
        }

}

export default AddCompany;