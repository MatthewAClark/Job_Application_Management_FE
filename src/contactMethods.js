import React from 'react'


const AddContactValues = (props) => {

        return (
                <div className="form-group">
                        <label>{props.value.contact_method}</label>
                        <input className="form-control" type="text" name="position" value={props.value.contact_value} disabled />
                </div>

        )

}

export default AddContactValues;