import React from 'react'


const AddContactValues = (props) => {

        return (
                <div >
                      
                        <span className="form-group col-md-4">{props.value.contact_method}</span>
                        <span className="form-group col-md-4">{props.value.contact_value}</span>
                        
                     
                      
                </div>

        )

}

export default AddContactValues;