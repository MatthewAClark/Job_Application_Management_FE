import React from 'react'


const AddContactValues = (props) => {

        return (
                <div>
                        <label>{props.value.contact_type}</label>
                        <input type="text" name="position" value={props.value.contact_value} disabled />
                </div>

        )

}

export default AddContactValues;