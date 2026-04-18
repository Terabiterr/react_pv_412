import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { student, token, logout } = useAuth()
    if(!student) return null;
    console.log(student)
    console.log(token)
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