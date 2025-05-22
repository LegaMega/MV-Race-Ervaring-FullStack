import React, { useState } from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import UserCard from "./UserCard";
import "./Dashboard.css";

const initialUsers = [
  {
    id: 1,
    name: "Jan Jansen",
    age: "18+",
    location: "1",
    status: "betaald",
    time: "gereserveerde tijd",
    email: "jan.jansen@example.com",
    phone: "+1234567890",
    avatarColor: "blue",
  },
  {
    id: 2,
    name: "Piet Pietersen",
    age: "25",
    location: "2",
    status: "niet betaald",
    time: "gereserveerde tijd",
    email: "piet.pietersen@example.com",
    phone: "+1987654321",
    avatarColor: "orange",
  },
  {
    id: 3,
    name: "Klaas Klaassen",
    age: "30",
    location: "3",
    status: "betaald",
    time: "gereserveerde tijd",
    email: "klaas.klaassen@example.com",
    phone: "+1122334455",
    avatarColor: "red",
  },
  {
    id: 4,
    name: "Anna de Vries",
    age: "22",
    location: "1",
    status: "betaald",
    time: "gereserveerde tijd",
    email: "anna.devries@example.com",
    phone: "+1098765432",
    avatarColor: "blue",
  },
  {
    id: 5,
    name: "Els de Boer",
    age: "28",
    location: "2",
    status: "niet betaald",
    time: "gereserveerde tijd",
    email: "els.deboer@example.com",
    phone: "+1230984567",
    avatarColor: "orange",
  },
  {
    id: 6,
    name: "Henk Hendriks",
    age: "35",
    location: "3",
    status: "betaald",
    time: "gereserveerde tijd",
    email: "henk.hendriks@example.com",
    phone: "+1987098765",
    avatarColor: "red",
  },
];

const Dashboard = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Clear selected user when modal opens
  React.useEffect(() => {
    if (showModal) {
      setSelectedUser(null);
    }
  }, [showModal]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserAge, setNewUserAge] = useState("");
  const [newUserLocation, setNewUserLocation] = useState("");
  const [newUserStatus, setNewUserStatus] = useState("");
  const [newUserTime, setNewUserTime] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPhone, setNewUserPhone] = useState("");
  const [newUserColor, setNewUserColor] = useState("blue");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (newUserName.trim() === "") return;
    const newUser = {
      id: users.length + 1,
      name: newUserName,
      age: newUserAge,
      location: newUserLocation,
      status: newUserStatus,
      time: newUserTime,
      email: newUserEmail,
      phone: newUserPhone,
      avatarColor: newUserColor,
    };
    setUsers([...users, newUser]);
    setNewUserName("");
    setNewUserAge("");
    setNewUserLocation("");
    setNewUserStatus("");
    setNewUserTime("");
    setNewUserEmail("");
    setNewUserPhone("");
    setNewUserColor("blue");
    setShowModal(false);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="top-bar">
          <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <button className="add-button" onClick={() => setShowModal(true)} aria-label="Add user">
            +
          </button>
        </div>
        <div className="user-grid">
          {filteredUsers.map(user => (
            <div key={user.id} onClick={() => setSelectedUser(user)} style={{ cursor: "pointer" }}>
              <UserCard user={user} />
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-button" onClick={() => setShowModal(false)} aria-label="Close modal">
              &#x2715;
            </button>
            <h2>Naam/Achternaam <span role="img" aria-label="edit">✏️</span></h2>
            <input
              type="text"
              placeholder="Naam/Achternaam"
              value={newUserName}
              onChange={e => setNewUserName(e.target.value)}
            />
            <label>Leeftijd: 18+</label>
            <input
              type="text"
              placeholder="Leeftijd"
              value={newUserAge}
              onChange={e => setNewUserAge(e.target.value)}
            />
            <label>Locatie: 1 van locaties</label>
            <input
              type="text"
              placeholder="Locatie"
              value={newUserLocation}
              onChange={e => setNewUserLocation(e.target.value)}
            />
            <label>Status: betaald of niet</label>
            <input
              type="text"
              placeholder="Status"
              value={newUserStatus}
              onChange={e => setNewUserStatus(e.target.value)}
            />
            <label>Tijd: gereserveerde tijd</label>
            <input
              type="text"
              placeholder="Tijd"
              value={newUserTime}
              onChange={e => setNewUserTime(e.target.value)}
            />
            <label>E-mail:</label>
            <input
              type="email"
              placeholder="E-mail"
              value={newUserEmail}
              onChange={e => setNewUserEmail(e.target.value)}
            />
            <label>Telefoonnummer:</label>
            <input
              type="tel"
              placeholder="Telefoonnummer"
              value={newUserPhone}
              onChange={e => setNewUserPhone(e.target.value)}
            />
            <select value={newUserColor} onChange={e => setNewUserColor(e.target.value)}>
              <option value="blue">Blauw</option>
              <option value="orange">Oranje</option>
              <option value="red">Rood</option>
            </select>
            <button onClick={handleAddUser}>Toevoegen</button>
            <button onClick={() => setShowModal(false)}>Annuleren</button>
          </div>
        </div>
      )}

      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-button" onClick={() => setSelectedUser(null)} aria-label="Close details">
              &#x2715;
            </button>
            <h2>{selectedUser.name}</h2>
            <p>Leeftijd: {selectedUser.age}</p>
            <p>Locatie: {selectedUser.location}</p>
            <p>Status: {selectedUser.status}</p>
            <p>Tijd: {selectedUser.time}</p>
            <p>E-mail: {selectedUser.email}</p>
            <p>Telefoonnummer: {selectedUser.phone}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
