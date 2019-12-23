import React from 'react'
import api_url from "./apiConfig";

class Adverts extends React.Component {
      

        render() {

                // 
                const tableData = [];
                this.props.getAllAdvertsState().forEach(advert => {
                        if(advert.advert_description !== null) {
                                tableData.push(<tr><td>{advert.job_title}</td><td>{advert.company_name}</td><td>{advert.advert_description.slice(0,200)}...</td><td>{advert.job_location}</td><td>{advert.min_salary} - {advert.max_salary}</td><td>{advert.closing_date}</td><td><a className="btn btn-primary btn-sm" href={`adverts/${advert.advert_id}`} role="button">View</a></td></tr>);
                        }
                       
                })
                        
          

                return (
                        <div>
  <table className='table'>
                                <tbody>
                                        <tr><th>Job Title</th><th>Company</th><th>Description</th><th>Location</th><th>Salary</th><th>Closing Date</th><th></th></tr>
                                {tableData}
                                </tbody>
                        </table>


                        
                        <a className="btn btn-primary btn-lg" href="/addadvert" role="button">Add Advert</a>
                        </div>
                      
                
                );
        }

        // newApplication = (event) => {

        //         // Comment out for development purposes only
        //         event.preventDefault();

        //         console.log(this.state)
        //         fetch(`${api_url}/api/adverts`, {
        //                 headers: new Headers({ "Content-Type": "application/json" }),
        //                 method: 'POST',
        //                 body: JSON.stringify({

        //                         address_id: this.state.address_id,
        //                         contact_id: this.state.contact_id,
        //                         job_title: this.state.job_title,
        //                         occupation_sector: this.state.occupation_sector,
        //                         advert_ref: this.state.advert_ref,
        //                         contract_type: this.state.contract_type,
        //                         full_time: this.state.full_time,
        //                         date_posted: this.state.date_posted,
        //                         date_applied: this.state.date_applied,
        //                         closing_date: this.state.closing_date,
        //                         advert_url: this.state.advert_url,
        //                         min_salary: this.state.min_salary,
        //                         max_salary: this.state.max_salary,
        //                         advert_description: this.state.advert_description,
        //                         agency: this.state.agency,
        //                         job_board: this.state.job_board,
        //                         job_location: this.state.job_location,
        //                         paid: this.state.paid


        //                 })
        //         })
        //                 .then(res => res.json())
        //                 .catch(console.log)
        // }
}

export default Adverts;