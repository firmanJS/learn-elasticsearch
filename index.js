const express = require('express')
const { Client } = require('@elastic/elasticsearch')

require('dotenv').config()
const app = express()
const router = express.Router()
const elascticClient = new Client({
    node: process.env.ELASTIC_HOST,
    // cloud: {
    //     id: process.env.ELASTIC_CLOUD_ID
    // },
    // auth: { apiKey }
})

app.get('/', (req, res) => {
    elascticClient.index({
        index: 'student',
        id: 1,
        body: {
            name: 'sutendt a'
        }
    }).then(resp => {
        res.json(resp)
    })
})
app.get('/:id', async (req, res) => {
    try {
        const result = await elascticClient.get({
            index: 'student',
            id: req.params.id
        })
        res.json(result.body)
    } catch (error) {
        res.json(error.body)
    }
})
app.use(router)
app.listen(3000, () => {
    console.info('app running')
})