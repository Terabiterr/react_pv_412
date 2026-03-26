import type { Student } from "../models/Student";
import { StudentService } from "../services/StudentService";
import StudentItem from './StudentItem'

interface Props {
    students: Student[]
    onDelete: (id: number) => void
}

function StudentList({ students, onDelete}: Props) {
    return (
        <table className="table table-info">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>LastName</th>
                    <th>E-mail</th>
                    <th>Age</th>
                    <th>Tools</th>
                </tr>
            </thead>
            <tbody>
                {students.map(s => (
                      <StudentItem 
                        key={s.id}
                        student={s}
                        onDelete={onDelete} />               
                ))}
            </tbody>
        </table>
    )
}

export default StudentList;