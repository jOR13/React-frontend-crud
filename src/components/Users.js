import React, { useState, useEffect } from 'react';

const Users = () => {

    const API = 'http://127.0.0.1:5000';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const [users, setUsers] = useState([]);

    const [editing, setEditing] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editing) {
            const res = await fetch(`${API}/users`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })
        } else {
            const res = await fetch(`${API}/users/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })
            setEditing(false)
            setId('')
        }
        await getUsers();
        setName('');
        setEmail('');
        setPassword('');
    }


    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data);
    }

    const deleteUser = async id => {
        const userRespose = window.confirm('Are you sure to delete it?')

        if (userRespose) {
            const res = await fetch(`${API}/users/${id}`, {
                method: 'DELETE'
            })
            console.log(id)
            await getUsers();
        }

    }

    const editUser = async id => {
        const res = await fetch(`${API}/users/${id}`);
        const data = await res.json();

        setEditing(true);
        setId(id);


        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (

        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input type="text" onChange={e => setName(e.target.value)} value={name} className="form-control" placeholder="name" autoFocus />
                    </div>

                    <div className="form-group">
                        <input type="text" onChange={e => setEmail(e.target.value)} value={email} className="form-control" placeholder="email" />
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={e => setPassword(e.target.value)} value={password} className="form-control" placeholder="password" />
                    </div>
                    <button className="btn btn-primary btn-block">{editing ? 'update' : 'create'}</button>

                </form>
            </div>


            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operations</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={() => editUser(user._id)}
                                    >Edit</button>
                                    <button
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={() => deleteUser(user._id)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default Users;