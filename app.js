const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs/promises');
const path = require('path');
const id = require('./utils/idGenerator');

const filePath = path.join(__dirname, './data/contact.json');

app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).send(`<h3>Welcome To MyContact Server!</h3>`)
})

app.get('/contact',async (req, res)=>{
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    res.status(200).send(data)
})

app.post('/contact', async (req, res)=>{
        try{
            try{
                const { name, phone, email } = req.body;
                const Entries = JSON.parse(await fs.readFile(filePath, 'utf-8'));
                const newData = {
                    id: id,
                    name: name,
                    phone: phone,
                    email: email
                }
                if(typeof(name) !== 'string' || typeof(phone) !== 'string' || typeof(email) !== 'string' || name.trim() === '' || phone.trim() === '' || email.trim() === ''){
                    res.status(400).send({message: `Invalid Data!`})
                }
                Entries.push(newData);
                await fs.writeFile(filePath, JSON.stringify(Entries, null, 2));
                res.status(201).send({message:`Successfully Added!`})
            }catch(zero){
                const Entries = [];
                const { name, phone, email } = req.body;
                const newData = {
                    id: id,
                    name: name,
                    phone: phone,
                    email: email
                }
                if(typeof(name) !== 'string' || typeof(phone) !== 'string' || typeof(email) !== 'string' || name.trim() === '' || phone.trim() === '' || email.trim() === ''){
                    res.status(400).send({message: `Invalid Data!`})
                }
                Entries.push(newData);
                await fs.writeFile(filePath, JSON.stringify(Entries, null, 2));
                res.status(201).send({message:`Successfully Added!`})
            }
        }catch(err){
            res.status(404).send({message: `Request Not Found!`})
        }
    })

app.put('/contact/:id', async(req, res) =>{
    try{
        const { name, phone, email } = req.body;
        const oldId = req.params.id;
        const Entries = JSON.parse(await fs.readFile(filePath, 'utf-8'));
        const index = Entries.findIndex(e => e.id == oldId);
        if(index !== -1){
            const newData = {
                id: oldId,
                name: name,
                phone: phone,
                email: email
            }
            if(typeof(name) !== 'string' || typeof(phone) !== 'string' || typeof(email) !== 'string' || name.trim() === '' || phone.trim() === '' || email.trim() === ''){
                    res.status(400).send({message: `Invalid Data!`})
            }
            Entries[index] = newData;
            await fs.writeFile(filePath, JSON.stringify(Entries, null, 2));
            res.status(201).send({message:`Successfully Updated!`})
        }else{
        res.status(404).send({message: `Contact Not Found!`});
        }
    }catch(err){
        res.status(404).send({message: `Request Not Found!`});
    }
})

app.delete('/contact/:id', async(req, res)=>{
    try{
        const id = req.params.id;
        const Entries = JSON.parse(await fs.readFile(filePath, 'utf-8'));
        const isFind = Entries.find(e => e.id == id);
        if(isFind){
            const newData = Entries.filter(e=> e.id != id);
            await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
            res.status(200).send({message:`Successfully Deleted!`})
        }else{
            res.status(404).send({message: `Contact Not Found!`});
        }
    }catch(err){
        res.status(404).send({message: `Request Not Found!`});
    }
})

app.get('/contact/:id', async(req,res)=>{
    const Entries = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    const id = req.params.id;
    const isFind = Entries.find(e => e.id == id);
    if(isFind){
      res.status(200).send(isFind)
    }else{
      res.status(404).send({message: `Contact Not Found!`});
    }
})

app.listen(port, '0.0.0.0', ()=>{
    console.log(`Server Run at http://localhost:${port}`)
})