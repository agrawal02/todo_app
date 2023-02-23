const express = require('express');
const cors = require('cors');
const mysql = require('mysql')



const app = express ();

app.use(cors());
const connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "todo_schema",
  });

app.use(express.json());

connection.connect((err)=>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log(" Database connected successfully");
});


// Get all todos
app.get("/todos", async (req, res)=>{
    connection.query("SELECT * FROM tasks", (err, results, fields)=>{
        if(err){
           return res.json({
            error : true,
            message : "something went wrong",
           });
        }
        return res.status(200).json({data : results});
    });
});

// Add a new todo
app.post("/todo", (req, res)=>{
    const {todoText} = req.body;
    
    const sql = `INSERT INTO tasks(text) VALUES (?)`;

    connection.query(sql,[todoText], (err, results)=>{
        if(err){
            return res.status(500).json({err});
        }
        res.json(results);
    });

});


app.delete("/todo/:id", (req, res)=>{
    const todo_id = req.params.id;

    connection.query(`DELETE FROM tasks WHERE id=${todo_id};`, 
    (err, results, fields)=>{
        console.log("data deleted");
        return res.json({data : results});
    }
    );
}); 



app.listen (8000, ()=>{
    console.log("Server running on port 8000");
})