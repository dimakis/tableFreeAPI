import express from "express"
import Table from './tableModel.js'

const router = express.Router()

router.get('/tables', async (req, res, next) => {
    await Table.getTables().catch(next).then(tables => res.status(200).json(tables)
    )
})

router.post('/addtable', async ( req, res, next ) => {
    await Table.create(req.body).catch(next)
    res.status(201).json({
        code: 201,
        msg: 'Successfully added new table'
    })
})

export default router;
