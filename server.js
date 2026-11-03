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
app.put('/api/students/:id', (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const { name, email, course, age } = req.body;

  if (name) student.name = name;
  if (email) student.email = email;
  if (course) student.course = course;
  if (age) student.age = age;

  res.json({ message: 'Student updated', student });
});
app.delete('/api/students/:id', (req, res) => {
  const index = students.findIndex((s) => s.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const deleted = students.splice(index, 1)[0];

  res.json({ message: 'Student deleted', student: deleted });
});