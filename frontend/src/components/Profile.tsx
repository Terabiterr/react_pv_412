import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { student, logout } = useAuth()
    if(!student) return null;
    return (
        <div style={{border: "3px solid crimson", padding: "10px"}}>
            <h3>Profile</h3>
            <hr />
            <div>Id: {student.id}</div>
            <hr />
            <div>Email: {student.email}</div>
            <hr />
            <div>Role: {student.role}</div>
            <hr />
            <button onClick={logout}>Logout</button>
            <hr />
        </div>
    )
}

export default Profile