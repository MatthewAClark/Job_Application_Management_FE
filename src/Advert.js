import React from 'react'
import Company from "./company";
import Address from "./address";
import Contact from "./contact";
import Professions from "./Professions"


class Advert extends React.Component {
        state = {

                // All fetched values from the database
                addresses: [],
                contacts: []
        }



        setCompanyAddresses = (addresses) => this.setState({ addresses: addresses });

        setContacts = (contacts) => this.setState({ contacts: contacts })



        // Reaction with the DOM 

        handlePosition_titleChange = (event) => this.props.updateData({ position_title: event.target.value })

        handleAdvert_refChange = (event) => this.props.updateData({ advert_ref: event.target.value })

        handleContract_typeChange = (event) => this.props.updateData({ contract_type: event.target.value })

        handleFull_time_part_timeChange = (event) => this.props.updateData({ full_time_part_time: event.target.value })

        handleDate_postedChange = (event) => this.props.updateData({ date_posted: event.target.value })

        handleClosing_dateChange = (event) => this.props.updateData({ closing_date: event.target.value })

        handleWebsiteChange = (event) => this.props.updateData({ advert_url: event.target.value })

        handleMin_salaryChange = (event) => this.props.updateData({ min_salary: event.target.value })

        handleMax_salaryChange = (event) => this.props.updateData({ max_salary: event.target.value })

        handleJob_locationChange = (event) => this.props.updateData({ job_location: event.target.value })

        handleAdvert_descriptionChange = (event) => this.props.updateData({ advert_description: event.target.value })

        handleAgencyChange = () => this.props.updateData({ agency: !this.props.data.agency })









        render() {


                return (
                        <div className="">
                                <div className="row">

                                        <div className="col-md-8">
                                                <div className="row">
                                                        <div className="col-md-6">
                                                                <label for="job_title">Job Title</label>
                                                                <input id="job_title" className="text form-control" disabled={this.props.state.disabled} onChange={this.handlePosition_titleChange} type="text" value={this.props.state.data.position_title} name="Job Title" size="40" />
                                                        </div>
                                                        <div className="col-md-6">
                                                                <Professions disabled={this.props.state.disabled} state={this.props.state} updateData={this.props.updateData} />
                                                        </div>
                                                </div>
                                                <div className="row">
                                                        <div className="col-md-12">
                                                                <label>Advert Description</label>
                                                                <textarea className="textarea" className="form-control" disabled={this.props.state.disabled} name="advert_description" onChange={this.handleAdvert_descriptionChange} value={this.props.state.data.advert_description} cols="50" rows="21"></textarea>
                                                        </div>

                                                </div>
                                                <div className="row">
                                                        <div className="col-md-8">
                                                                <label>Advert Website</label>
                                                                <input type="text" className="form-control" disabled={this.props.state.disabled} onChange={this.handleWebsiteChange} value={this.props.state.data.advert_url} name="Advert URL" />
                                                        </div>

                                                        <div className="col-md-4">
                                                                <label>Advert Reference</label>
                                                                <input className="form-control" type="text" disabled={this.props.state.disabled} onChange={this.handleAdvert_refChange} value={this.props.state.data.advert_ref} name="Advert Reference" />
                                                        </div>
                                                </div>
                                                <div className="row">
                                                        <div className="col-md-4">
                                                                <label>Contract Type</label>
                                                                <input type="text" className="form-control" disabled={this.props.state.disabled} onChange={this.handleContract_typeChange} value={this.props.state.data.contract_type} name="Contract Type" />
                                                        </div>
                                                        <div className="col-md-4">
                                                                <label>Full Time or Part Time?</label>
                                                                <input type="text" className="form-control" disabled={this.props.state.disabled} onChange={this.handleFull_time_part_timeChange} value={this.props.state.data.full_time_part_time} name="Full Time or Part Time" />
                                                        </div>
                                                        <div className="col-md-4">
                                                                <label>Location</label>
                                                                <input type="text" className="form-control" disabled={this.props.state.disabled} onChange={this.handleJob_locationChange} value={this.props.state.data.job_location} name="Location" />
                                                        </div>
                                                </div>
                                                <div className="row">
                                                        <div className="col-md-4">
                                                                <label>Minimum Salary</label>
                                                                <input type="text" className="form-control" disabled={this.props.state.disabled} onChange={this.handleMin_salaryChange} value={this.props.state.data.min_salary} name="Min Sal" />
                                                        </div>
                                                        <div className="col-md-4">
                                                                <label>Maximum Salary</label>
                                                                <input type="text" className="form-control" disabled={this.props.state.disabled} onChange={this.handleMax_salaryChange} value={this.props.state.data.max_salary} name="Max Sal" />
                                                        </div>
                                                </div>

                                                <div className="row">
                                                        <div className="col-md-5">
                                                                <label>Date Posted</label>

                                                                <input type="date" className="form-control" disabled={this.props.state.disabled} onChange={this.handleDate_postedChange} value={this.props.state.data.date_posted.slice(0,10)} name="Date Posted" />
                                                                
                                                        </div>
                                                        <div className="col-md-5">
                                                                <label>Closing Date</label>
                                                                <input type="date" className="form-control" disabled={this.props.state.disabled} onChange={this.handleClosing_dateChange} value={this.props.state.data.closing_date.slice(0,10)} name="Closing Date" />
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="col-md-4">
                                                <div className="row">
                                                        <div className="col-md-4 checkbox">
                                                                <label>Agency?</label>


                                                                <input type="checkbox" className="checkbox " disabled={this.props.state.disabled} name="agency" value={this.props.state.data.agency} onClick={this.handleAgencyChange} />
                                                        </div>
                                                </div>
                                                <div className="row">
                                                        <div className="col-md-12">
                                                                <Company disabled={this.props.state.disabled} state={this.props.state} updateData={this.props.updateData} setCompanyAddresses={this.setCompanyAddresses} setContacts={this.setContacts} />
                                                        </div>

                                                </div>

                                                <div className="row">
                                                        <div className="col-md-12">
                                                                <Address disabled={this.props.state.disabled} state={this.state} updateData={this.props.updateData} getData={this.props.getData} />
                                                        </div>
                                                </div>

                                                <div className="row">
                                                        <div className="col-md-12">
                                                                <Contact disabled={this.props.state.disabled} state={this.state} updateData={this.props.updateData} getData={this.props.getData} />
                                                        </div>
                                                </div>

                                        </div>


                                </div>


                        </div>
                );
        }


}




export default Advert;