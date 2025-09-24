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
    if (index !== -1) {
        //update if exists
        dbTodos[index] = todo;
        fs.writeFileSync(db, JSON.stringify(dbTodos, null, 2));
        return dbTodos;
    } else {
        //else append
        dbTodos.push(todo);
        fs.writeFileSync(db, JSON.stringify(dbTodos, null, 2));
        return todo;
    }
};


export const clearTodos = (status="all") => {
    if (status==="completed") {
        const dbTodos = readTodos();
        const newDbTodos = dbTodos.filter((t) => t.status !== "completed");
        fs.writeFileSync(db, JSON.stringify(newDbTodos, null, 2));
        return newDbTodos;
    } else if (status === "all") {
        fs.writeFileSync(db, JSON.stringify([], null, 2));
        return [];
    }
}

export const getNewPosition = () => {
    const dbTodos = readTodos();
    const maxPosition = dbTodos.reduce((acc, t) => Math.max(acc, t.position ?? 0), 0);
    return maxPosition +1;
}