import React from 'react'
import api_url from "./apiConfig";

class AddApplication extends React.Component {
        state = {
                advert_ref: "",
                contract_type: "",
                full_time : true,
                date_posted: null,
                date_seen: null,
                closing_date: null,
                advert_url: "",
                min_salary: "",
                max_salary: "",
                job_title: "",
                job_description: "",
                job_location: "",
                job_field: "",
                agency: false
        }

        handleJob_titleChange = (event) => {
               
                this.setState({
                        
                        job_title: event.target.value
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

        handleFull_timeChange = (event) => {
              
               if(event.target.value === "Part Time") {
                     
                this.setState({
                        full_time: false
                })
               }
               else {
                
                this.setState({
                        full_time: true
                })

               }
                    
               
               
        }

        handleDate_postedChange = (event) => {
               
                this.setState({
                        
                        date_posted: event.target.value
                })
        }

        handleDate_appliedChange = (event) => {
               
                this.setState({
                        
                        date_applied: event.target.value
                })
        }

        handleClosing_dateChange = (event) => {
               
                this.setState({
                        
                        closing_date: event.target.value
                })
        }

        handleDate_seenChange = (event) => {
               
                this.setState({
                        
                        date_seen: event.target.value
                })
        }

        handleAdvert_urlChange = (event) => {
               
                this.setState({
                        
                        advert_url: event.target.value
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
        handleJob_descriptionChange = (event) => {
               
                this.setState({
                        
                        job_description: event.target.value
                })
        }
        handleJob_locationChange = (event) => {
               
                this.setState({
                        
                        job_location: event.target.value
                })
        }
        handleJob_fieldChange = (event) => {
               
                this.setState({
                        
                        job_field: event.target.value
                })
        }

        handleAgencyChange = () => {

                this.setState({              
                        agency: !this.state.agency
                })
                
        }

        handleAdvert_urlChange = (event) => {

                this.setState({              
                        advert_url: event.target.value
                })
                
        }


        render() {

        
        return (<form>
                <label>Job Title</label>
           <input className="text" onChange={this.handleJob_titleChange} type="text"  value={this.state.job_title} name="Job Title" size="40"  />

           <label>Advert Reference</label>
           <input type="text" onChange={this.handleAdvert_refChange} name="Application Reference" />

           <label>Job Field</label>
           <input type="text" onChange={this.handleJob_fieldChange} name="Job Field" />

           <label>Advert URL</label>
           <input type="text" onChange={this.handleAdvert_urlChange} name="Advert URL" />

           <label>Agency?</label>
           {/* <input type="radio" name="agency" value="yes" onClick={this.handleAgencyChange}/> */}
           <input type="checkbox" name="agency" value={this.state.agency} onClick={this.handleAgencyChange}/>

           <label>Contract Type</label>
           <input type="text" onChange={this.handleContract_typeChange} name="Contract Type" />

           <br/>

           <input onChange={this.handleFull_timeChange} type="radio" name="hours" value="Full Time"/> Full Time<br></br>
                <input onChange={this.handleFull_timeChange} type="radio" name="hours" value="Part Time"/> Part Time<br></br>

           <label>Location</label>
           <input type="text" onChange={this.handleJob_locationChange} name="Location" />

           <label>Minimum Salary</label>
           <input type="text" onChange={this.handleMin_salaryChange} name="Min Sal" />

           <label>Maximum Salary</label>
           <input type="text" onChange={this.handleMax_salaryChange} name="Max Sal" />

           <label>Date Posted</label>
           <input type="date" onChange={this.handleDate_postedChange} name="Date Posted" />

           <label>Date Seen</label>
           <input type="date" onChange={this.handleDate_seenChange} name="Date Seen" />

           <label>Closing Date</label>
           <input type="date" onChange={this.handleClosing_dateChange} name="Closing Date" />

           <br/>

           <label>Advert Description</label>
           <textarea className="textarea" name="job_description" onChange={this.handleJob_descriptionChange} value={this.state.job_description} cols="50" rows="20"></textarea>

           <button className="bnt btn-default" type="submit" onClick={this.newApplication}>Add</button>
        </form>
        );
        }
    
        newApplication = (event) => {

                // Comment out for development purposes only
                 event.preventDefault();

                fetch(`${api_url}/api/application`, {
                        headers: new Headers({ "Content-Type": "application/json" }),
                        method: 'POST',
                        body: JSON.stringify({
                                 advert_ref: this.state.advert_ref,
                                 contract_type: this.state.contract_type,
                                 full_time: this.state.full_time,
                                 date_posted: this.state.date_posted,
                                 date_seen: this.state.date_seen,
                                 closing_date: this.state.closing_date,
                                 live: true,
                                 advert_url: this.state.advert_url,
                                 min_salary: this.state.min_salary,
                                 max_salary: this.state.max_salary,
                                 job_title: this.state.job_title,
                                 job_description: this.state.job_description,
                                 job_location: this.state.job_location,
                                 job_field: this.state.job_field,
                                 agency: this.state.agency
                        })
                })
                        .then(res => res.json())
                        .catch(console.log)
        }
}

export default AddApplication;