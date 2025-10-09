import fs from 'fs';
import path from "path";

//simulating db with json file
export const db = path.resolve("../src/assets/todos.json");
export const preferences = path.resolve("../src/assets/preferences.json");

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
};

export const getNewPosition = () => {
    const dbTodos = readTodos();
    const maxPosition = dbTodos.reduce((acc, t) => Math.max(acc, t.position ?? 0), 0);
    return maxPosition +1;
};

export function sortTodos(direction) {
    const todos = readTodos();
    if (direction == 'desc') {
        todos.sort((a, b) => b.position - a.position);
        writeTodos(todos);
        return todos;
    } else if (direction == 'asc') {
        todos.sort((a,b) => a.position - b.position);
        writeTodos(todos);
        return todos;
    }
};

export function readPreferences() {
    try {
        const pref = fs.readFileSync(preferences, "utf-8");
        return JSON.parse(pref);
    } catch (err) { 
        return [];
    }
};

export function getPreferencesByUserID(userId) {
    try {
        const pref = readPreferences().find((p) => p.userId == userId);
        if (pref) {
            return pref;
        } else {
            return {userId: userId, sortDirection: 'asc'}; //defualt preferences object
        }
    } catch (err) {
        return {userId: userId, sortDirection: 'asc'}
    }
};

// capire dove va inizializzato il json con le preferenze
//ha senso creare una funzione per creare il template delle preferencze?
export function getMaxUserId() {
    const preferences = readPreferences();
    const maxUserIdDb = preferences.reduce((acc, p) => Math.max(acc, p.userId ?? 0), 0);
    return maxUserIdDb + 1;
};

export function patchPreferencesByUserId(userId, prefObj) {
    try {
        const allPref = readPreferences();
        const prefIndex = allPref.findIndex((i) => i.userId == userId);
        const pref = getPreferencesByUserID(userId);
        if (prefIndex!== -1) {
            const newPref = {...pref, ...prefObj};
            allPref[prefIndex] = newPref;
            fs.writeFileSync(preferences, JSON.stringify(allPref, null, 2));
            return newPref;
        } else {
            const defaultPreferences = {userId: userId, sortDirection: 'asc', ...prefObj};
            allPref.push(defaultPreferences);
            fs.writeFileSync(preferences, JSON.stringify(allPref, null, 2));
            return defaultPreferences;
        }
    } catch (err) {
        return {}
    }
};