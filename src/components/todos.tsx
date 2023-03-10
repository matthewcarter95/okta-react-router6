import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from 'react'
// import { Route, useNavigate } from 'react-router-dom';
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createTodo } from '../graphql/mutations'
import { listTodos } from '../graphql/queries'


import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}
function Todos() {
  // const [data, setData] = useState<IFacility[]>();
  const [errors, setErrors] = useState<string>();
  
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])
  const { authState, oktaAuth } = useOktaAuth();

  const logout = async () => {
    try {
      await oktaAuth.signOut();
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    fetchTodos()
  }, [authState]);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    if (authState?.isAuthenticated && authState.accessToken?.accessToken) {
      try {
        // const todoData = await API.graphql(graphqlOperation(listTodos))
        const todoData: any = await API.graphql(graphqlOperation(listTodos))
        const todos = todoData.data.listTodos.items
        setTodos(todos)
      } 
      catch (err) { 
        console.log('error fetching todos') 
      }
    }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  if (!errors && authState?.isAuthenticated) {
    return (
      <div >
        <h2>My Todos</h2>
        <input
          onChange={event => setInput('name', event.target.value)}
          value={formState.name}
          placeholder="Name"
        />
        <input
          onChange={event => setInput('description', event.target.value)}
          value={formState.description}
          placeholder="Description"
        />
        <button onClick={addTodo}>Create Todo</button>
        {
          todos.map((todo, index) => (
            <div key={todo.id ? todo.id : index}>
              <p>{todo.name}</p>
              <p>{todo.description}</p>
            </div>
          ))
        }
      </div>
    )
  }
}



// const styles = {
//   container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
//   todo: {  marginBottom: 15 },
//   input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
//   todoName: { fontSize: 20, fontWeight: 'bold' },
//   todoDescription: { marginBottom: 0 },
//   button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
// }

export default Todos
