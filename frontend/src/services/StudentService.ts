import type { Student } from '../models/Student';
import { api } from './api';

const server_url: string = "http://localhost:3001";

export const StudentService = {
    async getAll(): Promise<Student[]> {
        const res = await api.get(`${server_url}/students`)
        return res.data
    },
    async getById(id: number): Promise<Student> {
        const res = await api.get(`${server_url}/students/${id}`)
        return res.data
    },
    //Додати методи
    //create, update, delete
    async update(id: number, student: Omit<Student, "id">) 
    : Promise<Student> {
        const res = await api.put(`${server_url}/students/${id}`, student)
        return res.data
    },
    async create(student: Omit<Student, "id">): Promise<Student> {
        const res = await api.post(`${server_url}/students`, student)
        return res.data    
    },
    async delete(id: number): Promise<void> {
        const res = await api.delete(`${server_url}/students/${id}`)
        return res.data
    }
}