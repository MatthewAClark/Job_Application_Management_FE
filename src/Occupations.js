import React from 'react'
import api_url from "./apiConfig";

class Occupations extends React.Component {

        state = {
                occupations: []
        }

        componentDidMount() {
                // Fetch the list of occupations and add them to the state
                fetch(`${api_url}/api/occupations/list`)
                        .then(res => res.json())
                        .then(body => {
                                this.setState({ occupations: body })
                        })
        }

        // handleOccupation_nameChange = (event) => {

        //         // Match the occupation name with a name in the db
        //         var occupation = {};

        //         const i = this.state.occupations.findIndex(occupation => occupation.occupation.toUpperCase() === event.target.value.toUpperCase())
        //         if (i > -1) {
        //                 occupation = { ...this.state.occupations[i] }
        //         } else {
        //                 occupation = { occupation: event.target.value, occupation_id: null }
        //         }

        //         // Prevent blank data from being entered
        //         if (event.target.value.trim().length === 0) {
        //                 occupation.occupation_id = undefined
        //         }

        //         this.props.updateData({ ...occupation })
        // }



        render() {

                // Produce a list of all the occupations in our db for our DOM
                const occupations = [];
                this.state.occupations.forEach((occupation, i) => occupations.push(<option value={occupation.occupation} key={i} />))

                return (<div className="form-group">
                        <label>Occupation</label>
                        <input disabled={this.props.disabled} list="occupations" onChange={this.handleOccupation_nameChange} className="form-control" value={this.props.state.data.occupation} name="occupations"></input>
                        <datalist id="occupations">
                                {occupations}
                        </datalist>
                        cvbcbv
                        
                        
                </div>
                );
        }

}






export default Occupations;