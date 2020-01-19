import React from 'react'
import api_url from "./apiConfig";

class Professions extends React.Component {

        state = {
                professions: []
        }

        componentDidMount() {
                // Fetch the list of professions and add them to the state
                fetch(`${api_url}/api/professions/list`)
                        .then(res => res.json())
                        .then(body => {
                                this.setState({ professions: body })
                        })
        }

        handleProfession_nameChange = (event) => {

                // Match the profession name with a name in the db
                var profession = {};
             
                const i = this.state.professions.findIndex(profession => profession.profession.toUpperCase() === event.target.value.toUpperCase())
                if (i > -1) {
                        profession = { ...this.state.professions[i] }
                } else {
                        profession = { profession: event.target.value, profession_id: null }
                }

                // Prevent blank data from being entered
                if (event.target.value.trim().length === 0) {
                        profession.profession_id = undefined
                }
                
                this.props.updateData({ ...profession })
        }



        render() {

                // Produce a list of all the professions in our db for our DOM
                const professions = [];
                this.state.professions.forEach((profession, i) => professions.push(<option value={profession.profession} key={i}/>))

                return (<div>
                        <label>Profession</label>
                        <input disabled={this.props.disabled} list="professions" onChange={this.handleProfession_nameChange} value={this.props.state.data.profession} name="professions"></input>
                        <datalist id="professions">
                                {professions}
                        </datalist>



                </div>
                );
        }

}






export default Professions;