const express = require('express')
const app = express()

const persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    },
    {
      "name": "Martin Cervantes",
      "number": "(656) 123-45-67",
      "id": 5
    }
  ]

app.get('/', (request, response) => {
  const html = `
    <h1>Persons API</h1>
    <table>
      <tr>
        <th>URL</th>
        <th>verb</th>
        <th>functionality</th>
      </tr>
      <tr>
        <td>/api/persons</td>
        <td>GET</td>
        <td>fetch all resources in the collection</td>
      </tr>
      <tr>
        <td>/api/persons/:id</td>
        <td>GET</td>
        <td>fetch a single resource</td>
      </tr>
      <tr>
        <td>/api/info</td>
        <td>GET</td>
        <td>show how many entries are in the collection</td>
      </tr>
    </table>
  `;
  response.send(html)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/api/info', (request, response) => {
  const currentdate = new Date();

  const datetime = "Last Sync: " + currentdate.getDate() + "/"+(currentdate.getMonth()+1)
  + "/" + currentdate.getFullYear() + " @ "
  + currentdate.getHours() + ":"
  + currentdate.getMinutes() + ":" + currentdate.getSeconds();

  response.send(`<p>Phonebook has info for ${persons.length} people</p><br>${datetime}`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})