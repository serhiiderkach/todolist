import {userReducer} from "./user-reducer";

it('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Serhii'};

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'});

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

it('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Serhii'};

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'});

    expect(endState.childrenCount).toBe(3);
    expect(endState.age).toBe(20);
});

it('user reducer should change name of user', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Serhii'};
    const newName = 'Viktor';

    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName});

    expect(endState.name).toBe(newName);
});