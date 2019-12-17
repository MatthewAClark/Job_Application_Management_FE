import React from 'react'
import api_url from "./apiConfig";

class AddCompany extends React.Component {



        handleCompany_nameChange = (event) => {

                // Check the list to see if we already have that company

                var company = {};
                const i = this.props.getAllCompaniesState().findIndex(company => {
                        return company.company_name === event.target.value
                })

                if (i > -1) company = this.props.getAllCompaniesState()[i]; else company.company_name = event.target.value

                this.props.setCompanyState(company)
        
             
               

        }

        // handleWebsiteChange = (event) => {

        //         this.setState({

        //                 website: event.target.value
        //         })
        // }



        render() {

                const companies = []

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

        // addCompany = (event) => {

        //         // Comment out for development purposes only
        //         event.preventDefault();

        //         // 


        //         // Add company to db if it doesn't already exist in db

        // }
}

export default AddCompany;