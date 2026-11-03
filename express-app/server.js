const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

const students = [];

app.post('/api/students', (req, res) => {
  const { id, name, email, course, age } = req.body;

  if (!id || !name || !email || !course || !age) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (students.find((s) => s.id === id)) {
    return res.status(409).json({ message: 'Student id already exists' });
  }

  const student = { id, name, email, course, age };
  students.push(student);

  res.status(201).json({ message: 'Student created', student });
});


app.get('/api/students', (req, res) => {
  res.json(students);
});


app.get('/api/students/:id', (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.json(student);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
