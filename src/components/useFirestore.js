import { useState, useEffect } from "react";
import { projectFirestore } from "../../dbconfig";

const useFirestore = () => {
  const [names, setNames] = useState([])
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const unsubscribe = projectFirestore.collection('movies')
      .onSnapshot(handleSnapshot, (err) => setError(err.message)); 

      return () => unsubscribe()
  }, [])

  const handleSnapshot = (snapshot) => {
    if (snapshot.empty) {
      setMessage("The list is empty.")
      setNames([])
    } else {
        let result = []
        snapshot.docs.forEach((oneName) => {
          result.push({id: oneName.id, ...oneName.data()})
        })
        setMessage('')
        setNames(result)
      }
    }

  const addName = (nameData) => {
    try {
      projectFirestore.collection('movies').add(nameData);
    } catch (err) {
      setError(err.message)
    }
  }

  const deleteName = async (id) => {
    try {
      await projectFirestore.collection("movies").doc(id).delete();
    } catch (err) {
      setError(err.message)
    }
  }

  return { names, setNames, error, addName, deleteName, message }
}

export default useFirestore;