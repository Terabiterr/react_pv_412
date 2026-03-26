import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentService } from "../services/StudentService";

function StudentFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (id) {
      StudentService.getById(Number(id)).then(s => {
        setFirstName(s.firstName);
        setLastName(s.lastName);
        setEmail(s.email);
        setAge(s.age);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const student = { firstName, lastName, email, age };

    if (id) {
      await StudentService.update(Number(id), student);
    } else {
      await StudentService.create(student);
    }

    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Редагування" : "Створення"} студента</h2>

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Ім'я"
          value={firstName} onChange={e => setFirstName(e.target.value)} />

        <input className="form-control mb-2" placeholder="Прізвище"
          value={lastName} onChange={e => setLastName(e.target.value)} />

        <input className="form-control mb-2" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} />

        <input className="form-control mb-2" type="number" placeholder="Вік"
          value={age} onChange={e => setAge(Number(e.target.value))} />

        <button className="btn btn-success">
          Зберегти
        </button>
      </form>
    </div>
  );
}
export default StudentFormPage;