import fs, { readFileSync } from 'fs';
import path from "path";

//simulating db with json file
export const db = path.resolve("../src/assets/todos.json");
export const preferences = path.resolve("../src/assets/preferences.json");
export const users = path.resolve("../src/assets/users.json")

export const readTodos = () => {
    try {
        const data = fs.readFileSync(db, "utf-8");
        if (!data) {
            return [];
        }
        const userData = JSON.parse(data);
        return userData ? userData : [];
    } catch (err) {
        return [];
    }
};

export const writeTodo = (todo, userId) => {
    const dbTodos = readTodos(userId);
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

export const writeAllTodos = (todos) => {
    fs.writeFileSync(db, JSON.stringify(todos, null, 2));
    return todos;
}


export const clearTodos = (userId, status="all") => {
    if (status==="completed") {
        const dbTodos = readTodos();
        const userTodos = dbTodos.filter((t) => t.status !== "completed" && t.userId === userId);
        const otherTodos = dbTodos.filter((t) => t.userId !== userId);
        fs.writeFileSync(db, JSON.stringify([...userTodos, ...otherTodos], null, 2));
        return userTodos;
    } else if (status === "all") {
        const dbTodos = readTodos();
        const newDbTodos = dbTodos.filter((t) => t.userId !== userId);
        fs.writeFileSync(db, JSON.stringify(newDbTodos, null, 2));
        return [];
    }
};

export const getNewPosition = (userId) => {
    const dbTodos = readTodos();
    const userTodos = dbTodos.filter((t)=> t.userId === userId);
    const maxPosition = userTodos.reduce((acc, t) => Math.max(acc, t.position ?? 0), 0);
    return maxPosition +1;
};

export function manualResortTodos(fromId, toId, userId) {
    if (fromId === toId) return;
    try {
        const allTodos = readTodos();
        const userTodos = allTodos.filter((t) => t.userId === userId);
        const otherTodos = allTodos.filter((t) => t.userId !== userId);
        const activeTodos = userTodos.filter((t) => t.status === 'active');
        const completedTodos = userTodos.filter((t) => t.status === 'completed');
        const fromIdIndex = activeTodos.findIndex((t) => t.id === fromId);
        let toIdIndex = activeTodos.findIndex((t) => t.id === toId);

        if (fromIdIndex === -1 || toIdIndex === -1) throw new Error("Todo not found");

        const [moved] = activeTodos.splice(fromIdIndex, 1);
        activeTodos.splice(toIdIndex, 0, moved);

        const now = Date.now();
        activeTodos[toIdIndex].updatedAt = now;

        for (let i=0; i<activeTodos.length; i++) {
            activeTodos[i].position = i+1;
        }
        const todosAll = [...activeTodos, ...completedTodos, ...otherTodos];
        writeAllTodos(todosAll);
        return [...activeTodos, ...completedTodos];
    } catch (e) {
        throw new Error(e);
    }
};

export function sortTodos(sortDirection, sortBy, userId) {
    const allTodos = readTodos();
    const userTodos = allTodos.filter((t)=> t.userId === userId);
    const otherTodos = allTodos.filter((t)=> t.userId !== userId);
    const activeTodos = userTodos.filter((t) => t.status === "active");
    const completedTodos = userTodos.filter((t) => t.status === "completed");

    const SORTBY_MAP = {
        "manual": "position",
        "createdAt": "createdAt",
        "updatedAt": "updatedAt",
        "alpha": "text"
    }
    const sortMethod = SORTBY_MAP[sortBy];
    if (!sortMethod) throw new Error("SortBy method not found!");
    try {
        activeTodos.sort((a, b) => {
            const valA = a[sortMethod];
            const valB = b[sortMethod];
            if (typeof valA === "string") {
                return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            } else {
                return sortDirection === 'asc' ? valA - valB : valB - valA;
            }
        });
        const todosAll = [...activeTodos, ...completedTodos, ...otherTodos];
        writeAllTodos(todosAll);
        return [...activeTodos, ...completedTodos];
    } catch (e) {
        throw new Error(e);
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
            const defaultPreferences = {userId: userId, sortBy: 'manual', sortDirection: 'asc', isLightMode: true};
            return defaultPreferences;
        }
    } catch (err) {
        return {userId: userId, sortBy: 'manual', sortDirection: 'asc', isLightMode: true};
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
            const newPref = {userId, ...pref, ...prefObj};
            allPref[prefIndex] = newPref;
            fs.writeFileSync(preferences, JSON.stringify(allPref, null, 2));
            return newPref;
        } else {
            const defaultPreferences = {userId: userId, sortBy: 'manual', sortDirection: 'asc', ...prefObj};
            allPref.push(defaultPreferences);
            fs.writeFileSync(preferences, JSON.stringify(allPref, null, 2));
            return defaultPreferences;
        }
    } catch (err) {
        return {}
    }
};


/////////////////////////////////// AUTH / REGISTRATION //////////////////////////

export function readUsers() {
    try {
        const data = fs.readFileSync(users, "utf-8");
        return data.trim() ? JSON.parse(data) : [];
    }
    catch(e) {
        return [];
    }
}


export function getUserByEmail(email) {
    const userData = readUsers();
    const userInfo = userData.find((u) => u.email === email);
    if (userInfo) {
        return userInfo;
    } else {
        return null;
    }
}

export function saveNewUser(userInfo) {
    try{
        const usersDb = readUsers();
        usersDb.push(userInfo);
        fs.writeFileSync(users, JSON.stringify(usersDb, null, 2));
        return userInfo;
    } catch(e) {
        return null;
    }
}

export function getUserByUserId(userId){
    try {
        const userData = readUsers();
        const user = userData.find((u) => u.userId === userId)
        return user || null;
    } catch (e) {
        return null;
    }
};