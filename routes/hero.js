const express = require('express')
const router = express.Router()

// import database
const koneksi = require('../config/database')

// insert data & validasi
const {body, validationResult} =require('express-validator')


// membaca data
router.get('/', function(req,res){
    koneksi.query('SELECT * FROM hero ORDER BY id desc',
    function(error,rows){
        if(error){
            return res.status(500).json({
                status: false,
                message: 'database ngga nyambung',
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'Menampilkan data table hero',
                data:rows
            })
        }    
    })
})

//insert data
router.post('/ml',
    [
        body('nama').notEmpty(),
        body('role').notEmpty(),
        body('tipe').notEmpty(),
        body('spell').notEmpty(),
        body('deskripsi').notEmpty(),
    ],(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()})
        }

        //mendefinisikan formData
        let formData = {
            nama: req.body.nama,
            role: req.body.role,
            tipe: req.body.tipe,
            spell: req.body.spell,
            deskripsi: req.body.deskripsi,
        }

        //masukkan data / query
        koneksi.query('INSERT INTO hero SET ?', formData,
            function(err,rows){
                if(err){
                    return res.status(500).json({
                        status: false,
                        message: 'Server mu error',
                    })
                }else{
                    return res.status(201).json({
                        status: true,
                        message: 'Berhasil input data',
                        data: rows[0]
                    })
                }
            }
        )
    })

//Detail
router.get('/:id', function(req,res){
    let id = req.params.id

    koneksi.query(`SELECT * FROM hero WHERE ID=${id}`,
        function(error, rows){
            if(error){
                return res.status(500).json({
                    status:false,
                    message:'Server Error'
                })
            }

            //pencarian hero
            if(rows.length <= 0){
                return res.status(404).json({
                    status: false,
                    message: 'Data tidak ada'
                })
            } else {
                return res.status(200).json({
                    status: true,
                    message: 'menampilkan data hero',
                    data: rows[0],
                })
            }
        }
     )

})

// Update
router.patch('/update/:id',[
    //validasi
    body('nama').notEmpty(),
    body('role').notEmpty(),
    body('tipe').notEmpty(),
    body('spell').notEmpty(),
    body('deskripsi').notEmpty(),
],(req,res)=>{
    const errors = validationResult (req)
    if(!errors.isEmpty()){
        return res.status(442).json({
            errors:errors.array()
        })
    }

    //id
    let id = req.params.id

    //data post
    let formData={
        nama: req.body.nama,
        role: req.body.role,
        tipe: req.body.tipe,
        spell: req.body.spell,
        deskripsi: req.body.deskripsi,
    }

    // update query
    koneksi.query(`UPDATE hero set ? WHERE id=${id}`,
       formData,function(error,rows){
        if(error){
            return res.status(500).json({
                status: false,
                message: 'server error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Berhasil update data'
            })
        }
       } 
    )
})

//Delete
router.delete('/delete/(:id)',
    function(req,res){
        let id = req.params.id

        koneksi.query(`DELETE FROM hero WHERE id=${id}`,
            function(error,rows){
                if(error) {
                    return res.status(500).json({
                        status: false,
                        message: 'Server error'
                    })
                } else {
                    return res.status(200).json({
                        status: true,
                        message: 'data sudah dihapus'
                    })
                }
            }
        )
    })

module.exports = router