import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs

function App() {
 // State hook for managing the current todo input value
const [todo, setTodo] = useState("");

// State hook for managing the list of todos
const [todos, setTodos] = useState([]);

// State hook for managing the visibility of finished todos
const [showfinished, setshowFinished] = useState(true);


  // Load todos from localStorage when the component mounts
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  // Function to save todos to localStorage
  const saveTols = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Toggle the visibility of finished todos
  const toggleFinished = (e) => {
    setshowFinished(!showfinished);
  };

  // Handle editing a todo
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo); // Set the input field with the todo to be edited
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos); // Remove the todo from the list
    saveTols();
  };

  // Handle deleting a todo
  const handleDelte = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos); // Remove the todo from the list
    saveTols();
  };

  // Handle adding a new todo
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]); // Add new todo to the list
    setTodo(""); // Clear the input field
    saveTols();
  };

  // Handle input field changes
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Handle checkbox changes for marking todos as completed
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted; // Toggle the completion status
    setTodos(newTodos);
    saveTols();
  };

  return (
    <>
      {/* Navbar Component */}
      <Navbar />
      
      {/* Main container for the todo app */}
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[45%]">
      
        {/* Header */}
        <h1 className="font-bold text-center text-3xl">iTask -Manage your todos at one place</h1>
        
        {/* Section to add a new todo */}
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          
          {/* Input field and button to add todo */}
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-full px-5 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-violet-800 hover:bg-violet-950 p-4 py-2 text-sm font-bold text-white rounded-full disabled:bg-violet-700 mx-2">
              Save
            </button>
          </div>
        </div>
        
        {/* Checkbox to toggle visibility of finished todos */}
        <input className="my-4" id="show" onChange={toggleFinished} type="checkbox" checked={showfinished} />
        <label htmlFor="show" className="mx-2">Show Finished</label>
        
        {/* Divider */}
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        
        {/* Section for displaying todos */}
        <h2 className="text-2xl font-bold">Your Todos</h2>
        
        {/* Todos list */}
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return (showfinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex justify-between my-3">
                
                {/* Todo item with checkbox */}
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    id=""
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                
                {/* Edit and delete buttons */}
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1">
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => handleDelte(e, item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1">
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
