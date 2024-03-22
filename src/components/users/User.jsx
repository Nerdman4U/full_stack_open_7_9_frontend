const User = ({ user }) => {
  if (!user) return null
  return (
    <div className='m-10'>
      <h2 className='text-3xl'>{user.name}</h2>
      {user.notes.length === 0 ?
        <p>No notes added</p>
      : <>
          <h3 className='text-2xl'>added notes</h3>
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
