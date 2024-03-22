const User = ({ user }) => {
  if (!user) return null
  return (
    <div>
      <h2>{user.name}</h2>
      {user.notes.length === 0 ?
        <p>No notes added</p>
      : <>
          <h3>added notes</h3>
          <ul>
            {user.notes.map(note => (
              <li key={note.id}>{note.content}</li>
            ))}
          </ul>
        </>
      }
    </div>
  )
}

export default User
