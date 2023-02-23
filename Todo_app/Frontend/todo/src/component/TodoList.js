import React, {Fragment, useEffect, useState } from 'react';
import "../component/TodoList.css";


function TodoList() {

  const [todoTask, setTodoTask]= useState("");
  const [todoList, setTodoList]= useState([]);

  useEffect (()=> {
    fetchAllTodo();
  }, [] );



  const handleSubmit = (e)=>{
    e.preventDefault();
     if(todoTask === ""){
      alert("please add your task");
    }
    else {
      try{
        fetch("http://localhost:8000/todo", {
          method: "POST",
          headers:{"Content-Type": "application/json"},
          body: JSON.stringify({todoText: todoTask }),

        })
        .then((res)=> {
        setTodoTask("");
        fetchAllTodo();
       });

      } catch (err){
        console.error(err.message);
       }
     
    }
  };
  

  const handleDelete = (id)=>{
    try{
      fetch(`http://localhost:8000/todo/${id}`,{
        method: "DELETE",
          headers:{"Content-Type": "application/json"},
          
       })
       .then(()=>{
         fetchAllTodo();
        
       });

      }
      catch(err){
        console.log("error occured");
      }
   
  };

  const fetchAllTodo = async()=> {

    try{
      const response = await fetch(`http://localhost:8000/todos`,{
        method: "GET",
          headers:{"Content-Type": "application/json"},
          
       });
       
       const todos = await response.json();
        setTodoList(todos?.data || []);

      }
      catch(err){
        console.log("error occured");
      }
   
  

  };
 
   

  return (
    <Fragment>
    <div>
      <div className='container-fluid my-5'>
            <div className='row'>
                <div className='col-sm-6 mx-auto text-white shadow-lg p-3'>
                    <h1 className='text-center'>To-Do-List</h1>
                    <div className='row p-5'>
                        <div className='col-md-12'>
                          <form onSubmit= {handleSubmit}>
                            <div className="input-group mb-3">
                                <span className="fw-bold text-center input-group-text">
                                  Enter the task : {" "} </span>
                                <input type="text" className="form-control" value={todoTask} onChange={(e)=> setTodoTask(e.target.value)} />
                                <button className="fw-bold px-5 btn btn-add-task" type="submit">Add Task</button>
                            </div>
                            </form>
                          </div>
                        <div className="conatiner">
                        
                       
                         <ul className="list-unstyled row m-5">
                          
                          {todoList.map((t)=>{
                            return(
                              <li className="list-group-item" key={t.id}>
                                <span>{t.text}</span>
                            <button className='fw-bold btn1' onClick={() => handleDelete(t.id)}>
                            X
                            </button>
                            </li>

                            );
                          }
                          )
                            
                        }
                          </ul>
                          
                        
                        
                        </div>
                    </div>
                    
                </div> 
            </div>
        </div>

    </div>
    </Fragment>
  
  );
 }   


export default TodoList

