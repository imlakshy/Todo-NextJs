//Frontend
"use client"
import Image from "next/image";
import crossImage from '../app/assets/cross.svg';
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  // const initialTodos = JSON.parse(localStorage.getItem('todosData')) || [];
  const [activeBtn, setactiveBtn] = useState(0);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(initialTodos);


  //Changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTodos = JSON.parse(localStorage.getItem('todosData')) || [];
      setTodos(storedTodos);
    }
  }, []);

  const fetchData = async () => {
    const dataR = await axios.get("/api/");
    if (dataR.data) { setTodos(dataR.data); }
  }

  useEffect(() => {
    fetchData();
  }, [])

  //Changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("todosData", JSON.stringify(todos));
    }
  }, [todos]);


  const addTodo = async () => {
    setTodos([...todos, { todo, isDone: false }]);


    await axios.post("/api/", { todo: todo });
    setTodo("");

  }

  const toggleDone = async (item) => {
    item.isDone = !item.isDone;
    const tempTodos = [...todos];
    setTodos(tempTodos);

    await axios.put("/api/", item);
  }

  const deleteTodo = async (item, index) => {
    const tempTodo = todos.filter((_, i) => i !== index);
    setTodos(tempTodo);

    await axios.delete("/api/", { data: { item } });
  }

  return (<>
    <div className=" overflow-y-auto scrollbar-hidden main bg-slate-800 m-10 p-5 rounded-[13px] h-[calc(100vh-5rem)] min-w-[375px-2.5rem] max-w-[550px]">
      <div className="header">

        <input className="text-black py-3 px-5 rounded-tl-full rounded-bl-full w-[70%]" rotype="text" placeholder="Add Your Task!"
          onChange={e => setTodo(e.target.value)}
          value={todo} />

        <button
          className="bg-red-800 rounded-tr-full rounded-br-full py-3 px-5 w-[30%] items-center"
          onClick={() => {
            setactiveBtn(0);
            addTodo();
          }}>Add</button>

        <h1 className="text-3xl font-bold my-5">Tasks</h1>
        <div>
          <button onClick={() => setactiveBtn(0)}
            className={activeBtn === 0 ? "button btnActive" : "button"}>All</button>

          <button onClick={() => setactiveBtn(1)} className={activeBtn === 1 ? "button btnActive" : "button"}>Active</button>

          <button onClick={() => setactiveBtn(2)} className={activeBtn === 2 ? "button btnActive" : "button"}>Completed</button>
        </div>
      </div>

      <div className="tasks my-5 ">
        {todos.map((item, index) => {
          return <div key={index} className="task flex justify-between px-2 py-2 my-2 rounded-[4px] items-center">
            <div className="flex gap-3 items-center">
              <div onClick={() => toggleDone(item)} className={item.isDone ? "checkBox bg-[#808080]" : "checkBox"}></div>

              <p className={item.isDone ? "text-[#808080] line-through de" : ""}>{item.todo}</p>
            </div>

            <button onClick={() => deleteTodo(item, index)}><Image src={crossImage} width={20} alt="Del" /></button>
          </div>
        })}
      </div>

    </div>
  </>);
}
