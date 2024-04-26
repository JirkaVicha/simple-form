import { useState } from "react"
import useFirestore from "./components/useFirestore"
import './index.css'

const App = () => {
  const [user, setUser] = useState({
    name: '',
    phone: '',
  })
  const [editMode, setEditMode] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  
  const { names, setNames, error, addName, deleteName, message } = useFirestore();
  
  const handleChangeName = (e) => {
    setUser({ ...user, name: e.target.value })
  }

  const handleChangePhone = (e) => {
    setUser({ ...user, phone: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (editMode) {
      const updatedNames = [...names]
      updatedNames[editIndex] = { ...updatedNames[editIndex], ...user }
      setNames(updatedNames)
      setEditMode(false)
      setEditIndex(null)
    } else {
      addName(user)
    }
    setUser({ name: '', phone: ''})
  }

  const handleEdit = (index) => {
    setUser(names[index])
    setEditMode(true)
    setEditIndex(index)
  }

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this name?")
    if (isConfirmed) {
      deleteName(id)
    }
  }

  const sortedNames = names.slice().sort((a, b) => {
    (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
  });

  return (
    <section className="container">
      <article className="form">
      <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={user.name} 
        name='name'
        className={editMode ? 'edit-mode' : ""}
        placeholder="Enter a name..."
        onChange={handleChangeName} 
        required
      />
      <input 
        type="text" 
        value={user.phone} 
        name='phone'
        className={editMode ? 'edit-mode' : ""}
        placeholder="Enter a phone..."
        onChange={handleChangePhone} 
        required
      />
      <button type="submit">{editMode ? 'Update' : 'Add'}</button>
    </form>
    </article>
    <div className="name-container">
      <div className="message">
       {message && <p>{message}</p>} 
      </div>
      
      <div className="result-container">
        {sortedNames.map((oneName, index) => {
          const {id, name, phone} = oneName

        return (
        <div className="result" key={id}>
          <p>{name} - {phone}</p>
          <div className="buttons">
          <button 
              className="update-button"
              onClick={() => handleEdit(index)}
            >
              Update
            </button>
            <button 
              className="del-button"
              onClick={() => handleDelete(id)}
            >
              x
            </button>
          </div>
        </div>
       )})}
      </div>
    </div>
    </section>
  )
}

export default App