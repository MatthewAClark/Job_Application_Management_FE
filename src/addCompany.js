import React from 'react'
import api_url from "./apiConfig";

class AddCompany extends React.Component {
        state = {
                company_name: '',
                sector: '' ,
                industry: '',
                company_url: ''
        }

       

     
        handleCompany_nameChange = (event) => {
                this.setState({
                        company_name: event.target.value
                })
        }

        handleSectorChange = (event) => {

                this.setState({

                        sector: event.target.value
                })
        }

        handleIndustryChange = (event) => {

                this.setState({

                        industry: event.target.value
                })
        }

        handleCompany_urlChange = (event) => {

               

                        this.setState({
                                company_url: event.target.value
                        })
          
        }

        
       


        render() {

                
              


                return (<form>
                        <label>Company Name</label>
                        <input className="text" onChange={this.handleCompany_nameChange} type="text" value={this.state.company_name} name="Company Name" size="40" />





                       



                        <label>Industry</label>
                        <input type="text" onChange={this.handleIndustryChange} name="Industry" />

                        <label>Sector</label>
                        <input type="text" onChange={this.handleSectorChange} name="Sector" />

                        <label>URL</label>
                        <input type="text" onChange={this.handleCompany_urlChange} name="Company URL" />




                        <button className="bnt btn-default" type="submit" onClick={this.newApplication}>Add</button>
                </form>
                );
        }

        newApplication = (event) => {

                // Comment out for development purposes only
                event.preventDefault();

               
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

export default AddCompany;