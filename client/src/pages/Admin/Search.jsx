import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/admin/adminSlice";
import { toast } from "react-toastify";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    const handleAddUser = async (e) => {
        e.preventDefault();
        if (!userName || userName.trim().length <= 4) {
            toast.error("Name is required and must be longer than 4 characters");
            return;
        }
        if (!userEmail || !/\S+@\S+\.\S+/.test(userEmail)) {
            toast.error("Email Required and Valid email is required");
            return;
        }
        if (password && !validatePassword(password)) {
            toast.error("Password does not meet the required policies");
            return;
        }

        const newUser = { userName, userEmail, password, };

        try {
            const response = await fetch('/api/admin/adduser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Failed to add user');
            }
            const data = await response.json();
            dispatch(addUser(data.user));
            toast.success("User added successfully!");
            setUserName('');
            setUserEmail('');
            setPassword('');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding user:', error.message);
            toast.error(`Error: ${error.message}`);
        }
    };

    const validatePassword = (password) => {
        const passwordPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        return passwordPolicy.test(password);
    };

    return (
        <div className="sm:rounded-lg mt-8">
            <div className="flex items-center justify-between flex-wrap pb-4 bg-white ">
                <input type="text" className="block mx-8 p-2 text-sm  border-2 border-black rounded-lg w-80 bg-gray-50"
                    placeholder="Search for users" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="inline-flex mx-8 items-center text-gray-500 bg-white  focus:outline-none hover:bg-gray-100  font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                    onClick={() => setIsModalOpen(true)} >
                    Add User
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <h2 className="text-lg font-semibold">Add User</h2>
                        <form onSubmit={handleAddUser}>
                            <div className="mb-4">
                                <label>Username</label>
                                <input type="text" className="block w-full mt-1 p-2 border rounded-lg"
                                    placeholder="Enter username" value={userName} onChange={(e) => setUserName(e.target.value)}
                                    required />
                            </div>
                            <div className="mb-4">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="block w-full mt-1 p-2 border rounded-lg"
                                    placeholder="Enter email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    required />
                            </div>
                            <div className="mb-4">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="block w-full mt-1 p-2 border rounded-lg"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                    onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg" >
                                    Add User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
