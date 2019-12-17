import React from 'react'
import api_url from "./apiConfig";
import AddCompany from "./addCompany";
import AddAddress from "./addAddress";

class AddAdvert extends React.Component {
        state = {
                advert: {
                        company_id: null,
                        job_title: '',
                        advert_ref: '',
                        contract_type: '',
                        full_time_part_time: '',
                        date_posted: null,
                        closing_date: null,
                        website: '',
                        min_salary: '',
                        max_salary: '',
                        advert_description: '',
                        agency: false,
                        job_board: '',
                        voluntary: false,
                        job_location: '',
                },
                company: {
                        company_id: null,
                        company_name: ''
                },
                allCompanies: [],
                address: {
                        address_id: null,
                        address_field: '',
                        postcode: ''
                },
                allAddresses: []
        }

        // Fetch a list of all the companies so we know not to add the same company twice
        componentDidMount() {
                fetch(`${api_url}/api/companies/list`)
                        .then(res => res.json())
                        .then(body => {
                                this.setState({ allCompanies: body })
                        })
        }



        getAdvertState = () => this.state.advert;

        setAdvertState = (advert) => {
                var update = this.state.advert;
                update = { ...update, ...advert  }
                this.setState({advert: update});
        }

        getCompanyState = () => this.state.company;

        setCompanyState = (company) => {
                var update = this.state.company;
                update = { ...update, ...company  }
                this.setState({company: update});

                // Fetch address list of company
                if (company.company_id != null) {
                        fetch(`${api_url}/api/addresses/companies/${company.company_id}`)
                                .then(res => res.json())
                                .then(body => {
                                        console.log(body)
                                        this.setAllAddressesState(body)

                                        // Set default values
                                        this.setAddressState(body[0])
                                        this.setAdvertState({address_id: body[0].address_id})
                                })
                }
        }

        getAddressState = () => this.state.address;

        setAddressState = (address) => {
                var update = this.state.address;
                update = { ...update, ...address, company_id: this.getCompanyState().company_id }
                this.setState({address: update});
                this.setAdvertState({address_id: address.address_id})
        }

        getAllCompaniesState = () => this.state.allCompanies;

        setAllCompaniesState = (allCompanies) => {
                var update = this.state.allCompanies;
                update = [ ...update, ...allCompanies  ]
                this.setState({allCompanies: update});
        }

        getAllAddressesState = () => this.state.allAddresses;

        setAllAddressesState = (allAddresses) => {
                var update = this.state.allAddresses;
                update = [ ...update, ...allAddresses  ]
                this.setState({allAddresses: update});
        }

        // Reaction with the DOM 

        handleJob_titleChange = (event) => {
                // const postAdvert = this.state.postAdvert;
                // postAdvert.job_title = event.target.value;
                // this.setState({
                //         postAdvert: postAdvert
                // })
                this.setAdvertState({job_title: event.target.value})
        }



        handleAdvert_refChange = (event) => {

                // const postAdvert = this.state.postAdvert;
                // postAdvert.advert_ref = event.target.value;
                // this.setState({
                //         postAdvert: postAdvert
                // })
                this.setAdvertState({advert_ref: event.target.value})
        }

        handleContract_typeChange = (event) => {

                // const postAdvert = this.state.postAdvert;
                // postAdvert.contract_type = event.target.value;
                // this.setState({
                //         postAdvert: postAdvert
                // })
                this.setAdvertState({contract_type: event.target.value})
        }

        handleFull_time_part_timeChange = (event) => {

                // const postAdvert = this.state.postAdvert;
                // postAdvert.full_time_part_time = event.target.value;
                // this.setState({
                //         postAdvert: postAdvert
                // })
                this.setAdvertState({full_time_part_time: event.target.value})



        }

        handleDate_postedChange = (event) => {

                // const postAdvert = this.state.postAdvert;
                // postAdvert.date_posted = event.target.value;
                // this.setState({
                //         postAdvert: postAdvert
                // })
                this.setAdvertState({date_posted: event.target.value})
        }


        handleClosing_dateChange = (event) => {

                // const postAdvert = this.state.postAdvert;
                // postAdvert.closing_date = event.target.value;
                // this.setState({
                //         postAdvert: postAdvert
                // })
                this.setAdvertState({closing_date: event.target.value})
        }


        handleWebsiteChange = (event) => {

                // const postAdvert = this.state.postAdvert;
                // postAdvert.website = event.target.value;
                // this.setState({
                //         postAdvert: postAdvert
                // })
                this.setAdvertState({website: event.target.value})
        }

        handleMin_salaryChange = (event) => {

                // const postAdvert = this.state.postAdvert;
                // postAdvert.min_salary = event.target.value;
                // this.setState({
                //         postAdvert: postAdvert
                // })
                this.setAdvertState({min_salary: event.target.value})
        }
        handleMax_salaryChange = (event) => {

                // const postAdvert = this.state.postAdvert;
                // postAdvert.max_salary = event.target.value;
                // this.setState({
                //         postAdvert: postAdvert
                // })
                this.setAdvertState({max_salary: event.target.value})
        }
        handleAdvert_descriptionChange = (event) => {

                // const postAdvert = this.state.postAdvert;
                // postAdvert.advert_description = event.target.value;
                // this.setState({
                //         postAdvert: postAdvert
                // })
                this.setAdvertState({advert_description: event.target.value})
        }
     

        handleAgencyChange = () => {

                // const postAdvert = this.state.postAdvert;
                // postAdvert.agency = !postAdvert.agency;
                // this.setState({
                //         postAdvert: postAdvert
                // })
                this.setAdvertState({agency: !this.getAdvertState().agency})

        }



       

        postCompany = (state) => new Promise(function (resolve, reject) {
                // console.log(this.state)

                if (state.company.company_id > 0) {


                        state.advert.company_id = state.company.company_id;
                        resolve(state)


                } else {
                        fetch(`${api_url}/api/companies`, {
                                headers: new Headers({ "Content-Type": "application/json" }),
                                method: 'POST',
                                body: JSON.stringify(
                                        state.company
                                )
                        })
                                .then(res => res.json())
                                .then(company => {
                                        state.company = company;
                                        state.advert.company_id = company.company_id;
                                        state.address.company_id = company.company_id;
                                        resolve(state);
                                })

                }

        });

        postAddress = (state) => new Promise(function (resolve, reject) {
                fetch(`${api_url}/api/addresses/company`, {
                        headers: new Headers({ "Content-Type": "application/json" }),
                        method: 'POST',
                        body: JSON.stringify(state.address)
                })
                        .then(res => res.json())
                        .then(address => {
                                state.address = address;
                                state.advert.address_id = address.address_id;
                                resolve(state);
                        })
        });

        postAdvert = (state) => new Promise(function (resolve, reject) {

                fetch(`${api_url}/api/adverts`, {
                        headers: new Headers({ "Content-Type": "application/json" }),
                        method: 'POST',
                        body: JSON.stringify(state.advert)
                })
                        .then(res => res.json())
                        .then(resolve(state))
                        .catch(console.log)
               
           

        })






        render() {




                return (<form>
                        
                        <label>Job Title</label>
                        <input className="text" onChange={this.handleJob_titleChange} type="text" value={this.state.job_title} name="Job Title" size="40" />

                       

                        <AddCompany getCompanyState={this.getCompanyState} setCompanyState={this.setCompanyState} getAllCompaniesState={this.getAllCompaniesState} setAllCompaniesState={this.setAllCompaniesState} />
                        <AddAddress getAddressState={this.getAddressState} setAddressState={this.setAddressState} getAllAddressesState={this.getAllAddressesState} setAllAddressesState={this.setAllAddressesState}  />
                        {/* <label>Job Location</label>
                        <input type="text" onChange={this.handleJob_locationChange} name="Job Location" /> */}

                        {/* <AddAddress addAddressIdToState={this.addAddressIdToState} addresses={this.state.addresses} />
                        {/* <label>Job Location</label>
                        <input type="text" onChange={this.handleJob_locationChange} name="Job Location" /> */} */}

                       

                        <label>Advert Reference</label>
                        <input type="text" onChange={this.handleAdvert_refChange} name="Application Reference" />



                        <label>Advert Website</label>
                        <input type="text" onChange={this.handleWebsiteChange} name="Advert URL" />

                        <label>Agency?</label>

                        <input type="checkbox" name="agency" value={this.state.agency} onClick={this.handleAgencyChange} />

                        <label>Contract Type</label>
                        <input type="text" onChange={this.handleContract_typeChange} name="Contract Type" />



                        <label>Full Time or Part Time?</label>
                        <input type="text" onChange={this.handleFull_time_part_timeChange} name="Full Time or Part Time" />




                        <label>Minimum Salary</label>
                        <input type="text" onChange={this.handleMin_salaryChange} name="Min Sal" />

                        <label>Maximum Salary</label>
                        <input type="text" onChange={this.handleMax_salaryChange} name="Max Sal" />

                        <label>Date Posted</label>
                        <input type="date" onChange={this.handleDate_postedChange} name="Date Posted" />


                        <label>Closing Date</label>
                        <input type="date" onChange={this.handleClosing_dateChange} name="Closing Date" />

                        <br />

                        <label>Advert Description</label>
                        <textarea className="textarea" name="advert_description" onChange={this.handleAdvert_descriptionChange} value={this.state.advert_description} cols="50" rows="20"></textarea>



                        <button className="bnt btn-default" type="submit" onClick={this.newApplication}>Add</button>
                        
                </form>
                );
        }

        newApplication = (event) => {

                // Comment out for development purposes only
                event.preventDefault();



                // this.postAdvert()
               console.log(this.getAddressState())
                this.postCompany(this.state).then(state => this.postAddress(state)).then(state => this.postAdvert(state)).then(state => this.setState(state))
                
         


                // console.log(this.state.company_id)

        }
}


export default AddAdvert;