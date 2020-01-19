import React from 'react'

class Adverts extends React.Component {


        render() {

                // 
                const tableData = [];
                this.props.getAllAdvertsState().forEach((advert, i) => {
                        if (advert.advert_description !== null) {
                                tableData.push(<tr key={i}><td>{advert.position_title}</td><td>{advert.company_name}</td><td><p>{advert.advert_description.slice(0, 200)}...</p></td><td>{advert.job_location}</td><td>{advert.min_salary} - {advert.max_salary}</td><td>{advert.closing_date}</td><td><a className="btn btn-primary btn-sm" href={`adverts/${advert.advert_id}`} role="button">View</a></td></tr>);
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

       
}

export default Adverts;