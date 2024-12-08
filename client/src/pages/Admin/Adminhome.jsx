import React from 'react'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser } from "../../redux/admin/adminSlice";
import AdminHeader from './AdminHeader'
import SearchBar from './Search';

export default function Adminhome() {
    const usersList = useSelector((state) => state.admin.users);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        id: '',
        name: '',
        email: '',
        password: ''
    });
    const dispatch = useDispatch();

    useEffect(() => {
        getUserList();
    }, [usersList]);

    const getUserList = async () => {
        try {
            const res = await fetch('/api/admin/getuser');
            const data = await res.json();
            if (data && data.users) {
                const validUsers = data.users.filter((user) => user && user.name && user.email);
                dispatch(addUser(validUsers));
            } else {
                toast.error("No users found");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/admin/deleteuser/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("Failed to delete the user");
            }
            const data = await response.json();
            toast.success(data.message);
            dispatch(deleteUser(id));
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleEdit = (user) => {
        setCurrentUser({ id: user.id, name: user.name, email: user.email, password: '' });
        console.log(user)
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!currentUser.id) {
            toast.error("User ID is missing");
            return;
        }
        try {
            const response = await fetch(`/api/admin/edituser/${currentUser.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentUser)
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("User details updated");
                setIsModalOpen(false);
            } else {
                toast.error(data.message || "Failed to update");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating user.");
        }
    };

    const SearchUsers = usersList
        ? usersList.filter((user) =>
            user && user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div>
            <AdminHeader />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="flex flex-col mt-10 items-center min-h-screen bg-gray-50">
                <h2 className="text-4xl font-semibold text-gray-900 mb-6">User Details</h2>
                <div className="container mx-auto w-full px-4">
                    <table className="min-w-full text-sm text-left text-gray-700 shadow-md rounded-lg overflow-hidden">
                        <thead className="text-xs uppercase bg-gray-200 text-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">Sl</th>
                                <th scope="col" className="px-6 py-3">name</th>
                                <th scope="col" className="px-6 py-3">email</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SearchUsers.map((user, index) => (
                                <tr className="bg-white border-b hover:bg-gray-100" key={user.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4 flex space-x-2">
                                        <button type="button"
                                            onClick={() => handleEdit(user)}
                                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(user.id)} type="button"
                                            className="text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 transition">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-2xl mb-4">Edit User</h2>
                        <div className="mb-4">
                            <label htmlFor="name" className="block">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={currentUser.name}
                                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={currentUser.email}
                                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={currentUser.password}
                                onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
