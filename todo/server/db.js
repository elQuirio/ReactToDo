import fs from 'fs';
import path from "path";

//simulating db with json file
export const db = path.resolve("../src/assets/todos.json");

export const readTodos = () => {
    try {
        const data = fs.readFileSync(db, "utf-8");
        return data ? JSON.parse(data) : [];
    } catch (err) {
        return [];
    }
    
};

export const writeTodos = (todo) => {
    const dbTodos = readTodos();
    const index = dbTodos.findIndex((t) => t.id == todo.id);
    console.log(index);
    if (index !== -1) {
        //update if exists
        dbTodos[index] = todo;
        fs.writeFileSync(db, JSON.stringify(dbTodos, null, 2));
        return dbTodos;
    } else {
        //else append
        dbTodos.push(todo);
        fs.writeFileSync(db, JSON.stringify(dbTodos, null, 2));
        console.log(todo);
        return todo;
    }
};


