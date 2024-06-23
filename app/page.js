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
  const [activeTodos, setactiveTodos] = useState([]);
  const [completedTodos, setcompletedTodos] = useState([]);

  const fetchData = async () => {
    const dataR = await axios.get("/api/");
    if (dataR.data) {
      setTodos(dataR.data);

      const newActiveTodos = todos.filter(todo => !todo.isDone);
      setactiveTodos(newActiveTodos)

      const newCompletedTodos = todos.filter(todo => todo.isDone);
      setcompletedTodos(newCompletedTodos)

    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    const newActiveTodos = todos.filter(todo => !todo.isDone);
    setactiveTodos(newActiveTodos)

    const newCompletedTodos = todos.filter(todo => todo.isDone);
    setcompletedTodos(newCompletedTodos)
  }, [todos])


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

  const deleteAll = async () => {
    const c = confirm("Delete All Todo?");
    if (c) {
      await axios.delete("/api/", { data: {} });
      setTodos([]);
    }


  }
  return (<>
    <div className="flex flex-col md:flex-row justify-center md:justify-around md:items-center px-5 gap-10 h-[100vh] ">

      <div className="greet flex flex-col justify-center">
        <span className="md:text-[48px] font-light">Hey 👋</span>
        <span className="text-5xl md:text-[96px] font-extrabold my-[8px]">Lakshya!</span>
        <p className="text-xs md:text-[24px] font-light  text-gray-400">Let&apos;s get those tasks done!</p>
      </div>

      <div className="right main p-5 bg-neutral-800 min-w-[375px-2.5rem] max-w-[767px] md:w-[550px] rounded-[13px] max-h-[calc(100vh-200px)]">

        <div className="header">
          <input className="text-white bg-neutral-700 py-3 px-5 rounded-tl-full rounded-bl-full w-[70%]" rotype="text" placeholder="Add Your Task!"
            onChange={e => setTodo(e.target.value)}
            value={todo}
            onKeyDown={e => {
              if (e.key == 'Enter') {
                setactiveBtn(0);
                addTodo();
                setTodo("");
              }
            }} />

          <button
            className="bg-neutral-900 rounded-tr-full rounded-br-full py-3 px-5 w-[30%] items-center"
            onClick={() => {
              setactiveBtn(0);
              addTodo();
            }}>Add</button>

          <h1 className="text-3xl font-bold my-5">Tasks</h1>
          <div className="flex justify-between items-center">
            <div>
              <button onClick={() => setactiveBtn(0)}
                className={activeBtn === 0 ? "btnActive" : "button"}>All</button>

              <button onClick={() => setactiveBtn(1)} className={activeBtn === 1 ? "btnActive" : "button"}>Active</button>

              <button onClick={() => setactiveBtn(2)} className={activeBtn === 2 ? "btnActive" : "button"}>Completed</button>
            </div>
            <span className="text-[#808080] text-sm underline underline-offset-2 cursor-pointer" onClick={deleteAll}>Delete All</span>
          </div>
        </div>

        <div className="tasks mt-5 max-h-[calc((100vh-200px)-210px)]">

          {activeBtn === 0 && (
            todos.length === 0 ? (
              <div className="text-center mt-4 text-gray-400">All Caught up</div>
            ) : (
              todos.map((item, index) => (
                <div key={index} className="task flex justify-between px-2 py-2 my-2 rounded-[4px] items-center">
                  <div className="flex gap-3 items-center">
                    <div onClick={() => toggleDone(item)} className={`${item.isDone ? "checkBox bg-[#808080]" : "checkBox"} transition-all`}></div>
                    <p className={`${item.isDone ? "text-[#808080] line-through de" : ""} transition-all`}>{item.todo}</p>
                  </div>
                  <button onClick={() => deleteTodo(item, index)}>
                    <Image src={crossImage} width={20} alt="Del" />
                  </button>
                </div>
              ))
            )
          )}

          {activeBtn === 1 && (activeTodos.length === 0 ? (
            <div className="text-center mt-4 text-gray-400">All Completed</div>)
            :
            (activeTodos.map((item, index) => {
              return <div key={index} className="task flex justify-between px-2 py-2 my-2 rounded-[4px] items-center">
                <div className="flex gap-3 items-center">
                  <div onClick={() => toggleDone(item)} className={`${item.isDone ? "checkBox bg-[#808080]" : "checkBox"} transition-all`}></div>

                  <p className={`${item.isDone ? "text-[#808080] line-through de" : ""} transition-all`}>{item.todo}</p>
                </div>

                <button onClick={() => deleteTodo(item, index)}><Image src={crossImage} width={20} alt="Del" /></button>
              </div>
            })))}

          {activeBtn === 2 && (completedTodos.length === 0 ? (
            <div className="text-center mt-4 text-gray-400">Nothing completed</div>)
            : (
              completedTodos.map((item, index) => {
                return <div key={index} className="task flex justify-between px-2 py-2 my-2 rounded-[4px] items-center">
                  <div className="flex gap-3 items-center">
                    <div onClick={() => toggleDone(item)} className={`${item.isDone ? "checkBox bg-[#808080]" : "checkBox"} transition-all`}></div>

                    <p className={`${item.isDone ? "text-[#808080] line-through de" : ""} transition-all`}>{item.todo}</p>
                  </div>

                  <button onClick={() => deleteTodo(item, index)}><Image src={crossImage} width={20} alt="Del" /></button>
                </div>
              })))}

        </div>

      </div>
    </div>
  </>);
}
