import React from 'react'
import ContactValues from './contactMethods';
import api_url from "./apiConfig";


class Skill extends React.Component {

        state = {
                toggle: false,
                skill_name: '',
                skill_id: undefined,
                disabled: true
        }

        // handleContact_methodChange = (event) => this.setState({ skill_name: event.target.value })

        // handleContact_valueChange = (event) => this.setState({ contact_value: event.target.value })

        render() {
               
                return (
                        <div>
                        <div className="row">

                                <h3 className="col-md-4">{this.props.skill.skill_name}</h3>

                          
                               
                        </div>

                      
                        </div>
                )

        }
       
}









export default Skill;