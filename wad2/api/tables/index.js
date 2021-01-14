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

router.delete('/deletetable/:id', async ( req, res, next  ) => {
    const table = await Table.findByTableName(req.body.tableName)
    await Table.findByIdAndDelete(table._id, function(err) {
        if(err) console.log(err);
        console.log('Successfully Deleted')
    }).catch(next)
    res.status(200).json({
        code: 200,
        msg: 'delete, great success'
    })
})

export default router;
