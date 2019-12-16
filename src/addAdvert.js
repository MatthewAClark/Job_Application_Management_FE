import React from 'react'
import api_url from "./apiConfig";
import AddCompany from "./addCompany";
import AddAddress from "./addAddress";

class AddAdvert extends React.Component {
        state = {
                postAdvert: {
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
                postCompany: {
                        company_id: null,
                        company_name: ''
                },
                getCompanies: [],
                postAddress: {
                        address_id: null,
                        address_field: '',
                        postcode: ''
                },
                getAddresses: []
        }

        // Fetch a list of all the companies so we know not to add the same company twice
        componentDidMount() {
                fetch(`${api_url}/api/companies/list`)
                        .then(res => res.json())
                        .then(body => {
                                this.setState({ getCompanies: body })
                        })
        }


        handleJob_titleChange = (event) => {
                const postAdvert = this.state.postAdvert;
                postAdvert.job_title = event.target.value;
                this.setState({
                        postAdvert: postAdvert
                })
        }

        // handleCompany_nameChange = (event) => {
        //         postAdvert = this.state.postAdvert;
        //         postAdvert.job_title = event.target.value;
        //         this.setState({
        //                 job_title: postAdvert
        //         })
        // }

        handleAdvert_refChange = (event) => {

                const postAdvert = this.state.postAdvert;
                postAdvert.advert_ref = event.target.value;
                this.setState({
                        postAdvert: postAdvert
                })
        }

        handleContract_typeChange = (event) => {

                const postAdvert = this.state.postAdvert;
                postAdvert.contract_type = event.target.value;
                this.setState({
                        postAdvert: postAdvert
                })
        }

        handleFull_time_part_timeChange = (event) => {

                const postAdvert = this.state.postAdvert;
                postAdvert.full_time_part_time = event.target.value;
                this.setState({
                        postAdvert: postAdvert
                })



        }

        handleDate_postedChange = (event) => {

                const postAdvert = this.state.postAdvert;
                postAdvert.date_posted = event.target.value;
                this.setState({
                        postAdvert: postAdvert
                })
        }


        handleClosing_dateChange = (event) => {

                const postAdvert = this.state.postAdvert;
                postAdvert.closing_date = event.target.value;
                this.setState({
                        postAdvert: postAdvert
                })
        }


        handleWebsiteChange = (event) => {

                const postAdvert = this.state.postAdvert;
                postAdvert.website = event.target.value;
                this.setState({
                        postAdvert: postAdvert
                })
        }

        handleMin_salaryChange = (event) => {

                const postAdvert = this.state.postAdvert;
                postAdvert.min_salary = event.target.value;
                this.setState({
                        postAdvert: postAdvert
                })
        }
        handleMax_salaryChange = (event) => {

                const postAdvert = this.state.postAdvert;
                postAdvert.max_salary = event.target.value;
                this.setState({
                        postAdvert: postAdvert
                })
        }
        handleAdvert_descriptionChange = (event) => {

                const postAdvert = this.state.postAdvert;
                postAdvert.advert_description = event.target.value;
                this.setState({
                        postAdvert: postAdvert
                })
        }
        // handleJob_locationChange = (event) => {

        //         postAdvert = this.state.postAdvert;
        //         postAdvert.job_location = event.target.value;
        //         this.setState({
        //                 postAdvert: postAdvert
        //         })
        // }

        handleAgencyChange = () => {

                const postAdvert = this.state.postAdvert;
                postAdvert.agency = !postAdvert.agency;
                this.setState({
                        postAdvert: postAdvert
                })

        }


        // Update company details to state from addCompany component
        updatePostCompany = (postCompany) => {
                this.setState({
                        postCompany: postCompany

                })

                // And fetch all addresses for that company
                if (postCompany.company_id != null) {
                        fetch(`${api_url}/api/addresses/companies/${postCompany.company_id}`)
                                .then(res => res.json())
                                .then(body => {
                                        console.log(body)
                                        const getAddresses = body;
                                        this.setState({ getAddresses: getAddresses })
                                })
                }

        }

        postAdvert = () => {
                console.log(this.state.postCompany)
                if (this.state.postCompany.company_id > 0) {

                        const postAdvert = this.state.postAdvert;
                        postAdvert.company_id = this.state.postCompany.company_id;
                        this.setState({ postAdvert: postAdvert });
                        fetch(`${api_url}/api/adverts`, {
                                headers: new Headers({ "Content-Type": "application/json" }),
                                method: 'POST',
                                body: JSON.stringify(this.state.postAdvert)
                        })
                                .then(res => res.json())
                                .catch(console.log)
                } else {


                        fetch(`${api_url}/api/companies`, {
                                headers: new Headers({ "Content-Type": "application/json" }),
                                method: 'POST',
                                body: JSON.stringify(
                                        this.state.postCompany
                                )
                        })
                                .then(res => res.json())
                                .then(company => {
                                        const postAdvert = this.state.postAdvert;
                                        postAdvert.company_id = company.company_id;
                                        this.setState({ postAdvert: postAdvert });
                                })
                                .then(() => {
                                        fetch(`${api_url}/api/adverts`, {
                                                headers: new Headers({ "Content-Type": "application/json" }),
                                                method: 'POST',
                                                body: JSON.stringify(this.state.postAdvert)
                                        })
                                                .then(res => res.json())
                                                .catch(console.log)
                                })
                                .catch(console.log)
                }







        }



        addAddressIdToState = (address_id) => {
                this.setState({
                        address_id: address_id
                })
        }


        render() {




                return (<form>
                        <label>Job Title</label>
                        <input className="text" onChange={this.handleJob_titleChange} type="text" value={this.state.job_title} name="Job Title" size="40" />



                        <AddCompany updatePostCompany={this.updatePostCompany} postCompany={this.state.postCompany} getCompanies={this.state.getCompanies} />
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



                this.postAdvert()


                // var addCompany = new Promise(function (resolve, reject) {
                //         setTimeout(function () {
                //                 resolve('foo');
                //         }, 300);
                // });



                // // Add to companies table if required
                // if (this.state.company_id === null) {
                //         this.postCompany(this.state.company_name)
                // }

                console.log(this.state.company_id)

        }
}

export default AddAdvert;