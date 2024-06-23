//Frontend
"use client"
import Image from "next/image";
import crossImage from '../app/assets/cross.svg';
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [activeBtn, setactiveBtn] = useState(0);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);


  //Changes
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const storedTodos = JSON.parse(localStorage.getItem('todosData')) || [];
  //     setTodos(storedTodos);
  //   }
  // }, []);

  const fetchData = async () => {
    const dataR = await axios.get("/api/");
    if (dataR.data) { setTodos(dataR.data); }
  }

  useEffect(() => {
    fetchData();
  }, [])

  //Changes
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     localStorage.setItem("todosData", JSON.stringify(todos));
  //   }
  // }, [todos]);


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
    <div className="flex flex-col md:flex-row gap-10 justify-around m-10 h-[calc(100vh-5rem)]">

      <div className="greet flex flex-col justify-center">
        <span className="md:text-[48px] font-light">Hey 👋</span>
        <span className="text-5xl md:text-[96px] font-extrabold my-[8px]">Lakshya!</span>
        <p className="text-xs md:text-[24px] font-extralight  text-gray-400">Let's get those tasks done!</p>
      </div>

      <div className="right main overflow-y-auto scrollbar-hidden p-5 bg-neutral-800  min-w-[375px-2.5rem] max-w-[550px] md:w-[550px] rounded-[13px]">
        <div className="header">

          <input className="text-white bg-neutral-700 py-3 px-5 rounded-tl-full rounded-bl-full w-[70%]" rotype="text" placeholder="Add Your Task!"
            onChange={e => setTodo(e.target.value)}
            value={todo} />

          <button
            className="bg-neutral-900 rounded-tr-full rounded-br-full py-3 px-5 w-[30%] items-center"
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
    </div>
  </>);
}
