import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function AddOrganisationHR() {

    const {organisationId} = useParams()
    let navigate = useNavigate()

    const [organisations, setOrganisations] = useState([])

    const [organisationHR, setOrganisationHR] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: ""
    })

    const {firstName, lastName, email, contactNumber} = organisationHR

    const [error, setError] = useState('');

    const onInputChange = (event) => {
        setOrganisationHR({...organisationHR, [event.target.name]: event.target.value})
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            setError('');
            const selectedOrganisation = organisations.find(org => org.organisationId === Number(organisationId));
            
            console.log(selectedOrganisation);
            const organisationHRWithOrg = {
                ...organisationHR,
                organisation: selectedOrganisation,
            };
            console.log(organisationHRWithOrg)

            const response = await axios.post('http://localhost:8080/api/organisation-hrs', organisationHRWithOrg);
            console.log(response.data);

            window.alert('HR added successfully!');
            navigate(`/view-organisation/${organisationId}`)

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                setError('Server is not responding');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('An unexpected error occurred');
            }
        }
    };

    useEffect(() => {
        loadOrganisations()
    }, [])

    const loadOrganisations = async () => {
        const result = await axios.get(`http://localhost:8080/api/organisations`)
        console.log(result.data)
        setOrganisations(result.data)
    }

  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 p-4 mt-3 shadow">
                    <h3 className="text-center m-2">Add Organisation HR</h3>
                    <div className="card-body">
                        <form onSubmit={(event) => onSubmitHandler(event)}>
                            <div className="form-group mb-3">
                                <label className="form-label">First Name: </label>
                                <input
                                    placeholder="Enter First Name of the HR"
                                    type={"text"}
                                    className="form-control"
                                    name="firstName"
                                    value={firstName}
                                    onChange={(event) => onInputChange(event)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Last Name: </label>
                                <input
                                    placeholder="Enter Last Name of the HR"
                                    type={"text"}
                                    className="form-control"
                                    name="lastName"
                                    value={lastName}
                                    onChange={(event) => onInputChange(event)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Email: </label>
                                <input
                                    placeholder="Enter Email of the HR"
                                    type={"text"}
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={(event) => onInputChange(event)}
                                    required
                                />
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group mb-3">
                                <label className="form-label">Contact Number: </label>
                                <input
                                    placeholder="Enter Contact Number of the HR"
                                    type={"number"}
                                    maxLength={10}
                                    className="form-control"
                                    name="contactNumber"
                                    value={contactNumber}
                                    onChange={(event) => onInputChange(event)}
                                />
                            </div>
                            <button className="btn btn-outline-primary" type="submit">Submit</button>
                            <Link className="btn btn-outline-danger mx-2" to={`/view-organisation/${organisationId}`}>Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
