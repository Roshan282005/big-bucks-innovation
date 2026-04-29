import { useUsers } from '../hooks/useUsers'

export default function UsersPage() {
  const { data: users, isLoading, error, refetch } = useUsers()

  if (isLoading) return <div style={{ padding: '2rem' }}>Loading users...</div>
  if (error) return <div style={{ padding: '2rem' }}>Error: {String(error)}</div>

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <h1>Users ({users?.length || 0})</h1>
        <button onClick={() => refetch()} style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.25rem' }}>
          Refresh
        </button>
      </div>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {users?.map((user: any) => (
          <div key={user.id} style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>{user.name}</h3>
            <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>{user.email}</p>
            <span style={{ 
              padding: '0.25rem 0.5rem', 
              background: '#dbeafe', 
              color: '#1e40af', 
              borderRadius: '9999px', 
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {user.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
