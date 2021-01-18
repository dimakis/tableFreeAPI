import express from "express"
import Table from './tableModel.js'
import isAdmin from '../../authenticate/isAdmin.js'
const router = express.Router()

router.get('/tables', async (req, res, next) => {
    await Table.getTables().catch(next).then(tables => res.status(200).json(tables)
    )
})

router.post('/addtable', async ( req, res, next ) => {
    // this next commented out block was my attempt at adding admin user only privileges to allow the addition of tables to the database
    console.log('@ addtable, req.body' + JSON.stringify(req.headers.authorization))
    let auth = await isAdmin(req, res )
    console.log('@ addtable, auth' +auth)
    if ( !auth){
        res.status(401).json({
            code:401,
            message:'Admin access is needed for this functionality'
        })
    }else {
    await Table.create(req.body).catch(next)
    res.status(201).json({
        code: 201,
        msg: 'Successfully added new table'
    })
}
})


//start of booking table method, will just be a simple PUT method, seeing as I'm running out of time I'm focusing on some new functionality to include
// router.put('/booktable/:id', async ( req, res, next ) =>
//     {
//     const table = await Table.findByTableName(req.body.tableName)
//         await Table.
//     }
// )

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
