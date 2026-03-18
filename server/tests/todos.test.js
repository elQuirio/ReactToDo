import { todosPath, readTodos, writeTodo, writeGetSortedTodos, writeAllTodos, clearTodos, getNewPosition, manualResortTodos, sortTodos } from '../db.js';
import fs, { readFileSync } from 'fs';
import crypto from "crypto";

describe('readTodos', () => {
    test('returns an array', () => {
        const testTodos = readTodos();
        expect(Array.isArray(testTodos)).toBe(true);
    });

    test('returns correct todos', () => {
        const originalTodos = fs.readFileSync(todosPath, "utf-8");
                try {
                    const testTodo = [{
                            "userId": `${crypto.randomUUID()}`,
                            "id": `${crypto.randomUUID()}`,
                            "text": "test 1",
                            "status": "active",
                            "createdAt": 1773086379576,
                            "updatedAt": 1773086379576,
                            "toBeCompletedAt": 1773086879576,
                            "position": 1
                            }]

                    fs.writeFileSync(todosPath, JSON.stringify(testTodo, null, 2));
                    const testReadTodos = readTodos();
                    expect(testReadTodos).toEqual(testTodo);
                }
                finally {
                    fs.writeFileSync(todosPath, originalTodos);
                }
    });
});


describe('writeTodo', () => {
    test('throws an error when an invalid todo is provided', () => {
        const testTodo = [{
                            "userId": `${crypto.randomUUID()}`,
                            "text": "test 1",
                            "status": "active",
                            "createdAt": 1773086379576,
                            "updatedAt": 1773086379576,
                            "toBeCompletedAt": 1773086879576,
                            "position": 1
                            }]
        expect(() => writeTodo(testTodo)).toThrow('Invalid todo');

    });
});