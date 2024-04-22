import { useEffect, useState } from "react";


const Home = () => {

    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then(res => res.json())
            .then(data => setUsers(data))


    }, [])

    const handleAddUser = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const user = { name, email }
        console.log(user)
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const newUser = [...users, data];
                setUsers(newUser);
                form.reset();
                
            })
    }




    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div>
                <div className="w-full max-w-md px-10 py-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl"></h1>

                    <form className="space-y-6" onSubmit={handleAddUser}>
                        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">User Management System</h2>
                        <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-white">Number of users {users.length}</h2>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                placeholder="Enter name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                placeholder="Enter email"
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="px-6 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                            >
                                Add User
                            </button>
                        </div>
                    </form>
                </div>



                <div className="w-full max-w-4xl px-4 py-5 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Users</h2>
                    <div className="mt-4 overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Email
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.email}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;