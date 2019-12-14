import React from 'react'
import api_url from "./apiConfig";

class Advert extends React.Component {
        state = {
                advert_id: null,
                company_name: '',
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
                job_location: ''
        }

        componentDidMount() {

                // Fetch all the live adverts and put them on the state
                fetch(`${api_url}/api/adverts/${this.props.match.params.advert_id}`)
                        .then(res => {
                                return res.json();
                        })
                        .then(body => {

                                console.log(body)
                                this.setState({
                                        ...body
                                })
                        })
        }


        handleJob_titleChange = (event) => {
                this.setState({
                        job_title: event.target.value
                })
        }

        handleCompany_nameChange = (event) => {
                this.setState({
                        company_name: event.target.value
                })
        }

        handleAdvert_refChange = (event) => {

                this.setState({

                        advert_ref: event.target.value
                })
        }

        handleContract_typeChange = (event) => {

                this.setState({

                        contract_type: event.target.value
                })
        }

        handleFull_time_part_timeChange = (event) => {

                this.setState({

                        full_time_part_time: event.target.value
                })



        }

        handleDate_postedChange = (event) => {

                this.setState({

                        date_posted: event.target.value
                })
        }


        handleClosing_dateChange = (event) => {

                this.setState({

                        closing_date: event.target.value
                })
        }


        handleWebsiteChange = (event) => {

                this.setState({

                        website: event.target.value
                })
        }

        handleMin_salaryChange = (event) => {

                this.setState({

                        min_salary: event.target.value
                })
        }
        handleMax_salaryChange = (event) => {

                this.setState({

                        max_salary: event.target.value
                })
        }
        handleAdvert_descriptionChange = (event) => {

                this.setState({

                        advert_description: event.target.value
                })
        }
        handleJob_locationChange = (event) => {

                this.setState({

                        job_location: event.target.value

                })
        }

        handleAgencyChange = () => {

                this.setState({
                        agency: !this.state.agency
                })

        }



        render() {




                return (<form>
                        <label>Job Title</label>
                        <input className="text" onChange={this.handleJob_titleChange} type="text" value={this.state.job_title} name="Job Title" size="40" />

                        <label>Company Name</label>
                        <input className="text" onChange={this.handleCompany_nameChange} type="text" value={this.state.company_name} name="Company Name" size="40" />


                        <label>Job Location</label>
                        <input type="text" onChange={this.handleJob_locationChange} name="Job Location" value={this.state.job_location}/>


                        <label>Advert Reference</label>
                        <input type="text" onChange={this.handleAdvert_refChange} name="Application Reference" value={this.state.advert_ref}/>



                        <label>Advert Website</label>
                        <input type="text" onChange={this.handleWebsiteChange} name="Advert URL" value={this.state.website}/>

                        <label>Agency?</label>

                        <input type="checkbox" name="agency" value={this.state.agency} onClick={this.handleAgencyChange} />

                        <label>Contract Type</label>
                        <input type="text" onChange={this.handleContract_typeChange} name="Contract Type" value={this.state.contract_type}/>



                        <label>Full Time or Part Time?</label>
                        <input type="text" onChange={this.handleFull_time_part_timeChange} name="Full Time or Part Time" value={this.state.full_time_part_time}/>




                        <label>Minimum Salary</label>
                        <input type="text" onChange={this.handleMin_salaryChange} name="Min Sal" value={this.state.min_salary}/>

                        <label>Maximum Salary</label>
                        <input type="text" onChange={this.handleMax_salaryChange} name="Max Sal" value={this.state.max_salary}/>

                        <label>Date Posted</label>
                        <input type="date" onChange={this.handleDate_postedChange} name="Date Posted" value={this.state.date_posted}/>


                        <label>Closing Date</label>
                        <input type="date" onChange={this.handleClosing_dateChange} name="Closing Date" value={this.state.closing_date}/>

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

                console.log(this.state)
                fetch(`${api_url}/api/adverts/${this.state.advert_id}`, {
                        headers: new Headers({ "Content-Type": "application/json" }),
                        method: 'PUT',
                        body: JSON.stringify({

                                company_name: this.state.company_name,
                                job_title: this.state.job_title,
                                advert_ref: this.state.advert_ref,
                                contract_type: this.state.contract_type,
                                full_time_part_time: this.state.full_time_part_time,
                                date_posted: this.state.date_posted,
                                closing_date: this.state.closing_date,
                                website: this.state.website,
                                min_salary: this.state.min_salary,
                                max_salary: this.state.max_salary,
                                advert_description: this.state.advert_description,
                                agency: this.state.agency,
                                job_board: this.state.job_board,
                                voluntary: this.state.voluntary,
                                job_location: this.state.job_location


                        })
                })
                        .then(res => res.json())
                        .catch(console.log)
        }
}

export default Advert;