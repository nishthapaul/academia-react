import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

export default function ListHR(props) {

    const {organisationId} = props

    const [HRs, setHRs] = useState([])

    useEffect(() => {
        loadHRs()
    }, [])

    const loadHRs = async () => {
        const result = await axios.get(`http://localhost:8080/api/organisation-hrs/organisation/${organisationId}`)
        setHRs(result.data)
    }

    // const deleteOrganisation = async (organisationId) => {
    //     const result = await axios.delete(`http://localhost:8080/api/organisations/${organisationId}`)
    //     loadOrgs()
    // }

    return (
        <div className = 'container'>
            <h4 className='mt-2'>List Of HRs</h4>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Address</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact Number</th>
                            {/* <th scope="col">Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            HRs.map((hr, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{hr.firstName}</td>
                                    <td>{hr.lastName}</td>
                                    <td>{hr.email}</td>
                                    <td>{hr.contactNumber}</td>
                                    {/* <td>
                                        <button className="btn btn-primary mx-2">View</button>
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to = {`/view-organisation/${organisationId}`}
                                        >
                                            View
                                        </Link>
                                        <Link
                                            className="btn btn-outline-primary mx-2"
                                            to = {`/edit-organisation/${organisationId}`}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => deleteOrganisation(organisationId)}
                                        >
                                            Delete
                                        </button>
                                    </td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
