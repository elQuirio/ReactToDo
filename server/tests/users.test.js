import { users, getUserByEmail, readUsers, saveNewUser, getUserByUserId } from '../db.js';
import fs, { readFileSync } from 'fs';


describe('getUserByEmail', () => {
    test('throws an error if email is missing', () => {
        expect(() => getUserByEmail()).toThrow('Missing email');
    });

    test('to return null if user not found', () => {
        const user = getUserByEmail('fake@email.com');
        expect(user).toBeNull();
    })
});

describe('readUsers', () => {
    test('returns an array', () => {
        const users = readUsers();
        expect(users).toBeInstanceOf(Array);
    })
});

describe('saveNewUser', () => {
    test('throws an error when no user data is provided', () => {
        expect(() => saveNewUser()).toThrow('Missing user email/id');
    });
    
    test('throws an error when mandatory keys are not provided', () => {
        expect(() => saveNewUser({email: null, userId: null, password:'fakepassword'})).toThrow('Missing user email/id');
    });

    test('user is saved correctly', () => {
        const originalUsers = fs.readFileSync(users, "utf-8");
        try {
            const newUser = {
                userId:'fakeUserId',
                email: 'fake@email.com',
                password: 'fakepassword'
            }
            const savedUser = saveNewUser(newUser);
            expect(savedUser).toEqual(newUser);
        } 
        finally{
            fs.writeFileSync(users, originalUsers);
        }
    });

});