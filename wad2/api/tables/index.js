import express from "express"
import Table from './tableModel.js'

const router = express.Router()

router.get('/tables', async (req, res, next) => {
    await Table.getTables().then(tables => res.status(200).json(tables)
    )
})

//router.post('/tables')

export default router;
