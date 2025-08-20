import { Router } from "express";

const router = Router();

const users = [{id: 0, name: 'John Doe', age: 30}, {id: 1, name: 'Jane Doe', age: 25}];


router.get('/api/users', (request, response) => {
    console.log(request.query);
    const { query: { filter, value } } = request;

    if (filter && value) {
        return response.send(users.filter(user => user[filter].includes(value)));
    }
    return response.send(users);
});

router.post('/api/users', (request, response) => {
    console.log(request.body);
    const newUser = { id: users[users.length - 1].id + 1, ...request.body };
    users.push(newUser);
    return response.status(201).send(newUser);    
});

router.get('/api/users/:id', (request, response) => {
    console.log(request.params);
    const userId = parseInt(request.params.id);
    if (isNaN(userId)) {
        return response.status(400).send('Invalid user ID');
    }
    const user = users.find(u => u.id === userId);
    if (!user) {
        return response.sendStatus(404);
    }
    return response.send(user);
});

export default router;