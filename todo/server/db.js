import fs from 'fs';
import path from "path";

export const db = path.resolve("src/assets/todos.json");

//simulating db with json file
//export const db = "../src/assets/todos.json"

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
    dbTodos.push(todo);
    fs.writeFileSync(db, JSON.stringify(dbTodos, null, 2));
    return dbTodos;
};


