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

        handleEssentialChange = () => {
                var skills = this.props.getData().skills
                skills[this.props.i].essential = !skills[this.props.i].essential
                this.props.updateData({ skills: skills })
        }

        handleDurationChange = (event) => {
                var skills = this.props.getData().skills
                skills[this.props.i].duration = event.target.value
                this.props.updateData({ skills: skills })
        }

        handleExperienceChange = (event) => {
                var skills = this.props.getData().skills
                skills[this.props.i].experience_description = event.target.value
                this.props.updateData({ skills: skills })
        }

        render() {
                console.log(this.props.skill)
                return (
                        <div>
                                <div className="row">

                                        <h3 className="col-md-4">{this.props.skill.skill_name}</h3>


                                        <label>Essential?</label>
                                        <input type="checkbox" className="checkbox " disabled={this.props.state.disabled} name="essential" value={this.props.skill.essential} onClick={this.handleEssentialChange}  />

                                        <label>Duration</label>
                                        <input className="form-control" type="number" disabled={this.props.state.disabled} onChange={this.handleDurationChange} value={this.props.skill.duration} name="duration" />

                                        <label>Experience</label>
                                        <textarea className="textarea form-control" disabled={this.props.state.disabled} name="advert_description" onChange={this.handleExperienceChange} value={this.props.skill.experience_description} cols="50" rows="5"></textarea>

                                </div>


                        </div>
                )

        }

}









export default Skill;