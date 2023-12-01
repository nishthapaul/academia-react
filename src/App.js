import "./App.css"
import NavBar from "./components/NavBar"
import AddOrganisation from "./pages/AddOrganisation";
import ListOrganisations from "./pages/ListOrganisations"
import EditOrganisation from "./pages/EditOrganisation"
import ViewOrganisation from "./pages/ViewOrganisation"
import AddOrganisationHR from "./pages/AddOrganisationHR";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/organisations" element={<ListOrganisations />} />
          <Route exact path="/add-organisation" element={<AddOrganisation />} />
          <Route exact path="/edit-organisation/:organisationId" element={<EditOrganisation />} />
          <Route exact path="/view-organisation/:organisationId" element={<ViewOrganisation />} />
          <Route exact path="/add-organisation-hr/:organisationId" element={<AddOrganisationHR />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
