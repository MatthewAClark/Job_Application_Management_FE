import React from 'react'
import api_url from "./apiConfig";
import Advert from "./Advert";

class AddAdvert extends React.Component {
        state = {
                // Table values we need for when we update
                data: {
                        agency: false,
                        voluntary: false,
                        address_field: '',
                        postcode: '',
                        contact_values: [],
                        contact_name: '',
                        contact_position: '',
                        capacity_known: '',
                        date_seen: null,
                        date_posted: null,
                        closing_date: null
                },
                disabled: false
        }



        // I've created some getters and setters to pass down the classes. Updaters are also provided which update tables with certain fields only


        // Advert

        updateData = (update) => {
                const data = { ...this.state.data, ...update };
                this.setState({ data: data });
        }

        getData = () => this.state.data;

     

        render() {
                return (<form className="container">

                        <Advert updateData={this.updateData} getData={this.getData} state={this.state} />

                        <button className="bnt btn-default" type="submit" onClick={this.newApplication}>Add</button>

                </form>
                );
        }

        newApplication = (event) => {

                // Comment out for development purposes only
                event.preventDefault();
                

                fetch(`${api_url}/api/adverts`, {
                                        headers: new Headers({ "Content-Type": "application/json" }),
                                        method: 'POST',
                                        body: JSON.stringify(this.state.data)
                                })
                                        .then(res => res.json())
                                        .then(data => console.log(data))
                                        .catch(console.log)
                       
                }
}


        export default AddAdvert;