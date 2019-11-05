import React from 'react'

const AddApplication = () => {
    
        return (<form>
                <label>Job Title</label>
           <input type="text"  name="Job Title" size="40"  />
           <label>Application Reference</label>
           <input type="text" name="Application Reference" />
           <label>Job Field</label>
           <input type="text" name="Job Field" />
           <br/>
           <label>Location</label>
           <input type="text" name="Location" />
           <label>Minimum Salary</label>
           <input type="text" name="Min Sal" />
           <label>Maximum Salary</label>
           <input type="text" name="Max Sal" />
           <label>Date Posted</label>
           <input type="date" name="Date Posted" />
           <label>Closing Posted</label>
           <input type="date" name="Closing Date" />
           <br/>
           <label>Job Description</label>
           <textarea cols="50" rows="20"></textarea>
        </form>
        )
    
}

export default AddApplication;