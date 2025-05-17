import { useState, useEffect } from 'react';
import { User, UserModel } from '../models/User';
import UserForm from './UserForm';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const fetchedUsers = await UserModel.findAll();
      setUsers(fetchedUsers);
      setError(null);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (username: string, email: string) => {
    try {
      const newUser = await UserModel.create({ username, email });
      setUsers([...users, newUser]);
      setError(null);
    } catch (err) {
      setError('Failed to create user');
      console.error('Error creating user:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      
      {/* Add User Form */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Add New User</h3>
        <UserForm onUserAdded={loadUsers} />
      </div>

      {/* User List */}
      <div className="space-y-4">
        {users.length === 0 ? (
          <p className="text-gray-500">No users found. Add one above!</p>
        ) : (
          users.map(user => (
            <div key={user.id} className="p-4 border rounded-lg bg-white shadow-sm">
              <h3 className="font-semibold">{user.username}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-400 text-sm">
                Created: {new Date(user.created_at!).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 