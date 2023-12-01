import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import ListHR from './ListHR'

export default function ViewOrganisation() {

    const {organisationId} = useParams()

    const [organisation, setOrganisation] = useState({
        name: "",
        address: ""
    })

    const loadOrganisation = async () => {
        const result = await axios.get(`http://localhost:8080/api/organisations/${organisationId}`)
        console.log(result.data)
        setOrganisation(result.data)
    }

    useEffect(() => {
        loadOrganisation()
    }, [])

    return (
        <div className = 'container'>
            <div className="row">
                <div className="card col-md-8 offset-md-2 p-4 mt-3 shadow">
                    <h2 className="text-center m-2">Organisation Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of Organisation Id : {organisationId}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Name : </b>
                                    {organisation.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Address : </b>
                                    {organisation.address}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-3" to={`/add-organisation-hr/${organisationId}`}>Add a new HR</Link>
                    <ListHR organisationId={organisationId} />
                    <Link className="btn btn-primary my-2" to="/organisations">Back to Home</Link>
                </div>
            </div>
        </div>
    )
}
