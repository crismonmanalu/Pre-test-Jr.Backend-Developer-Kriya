const config = require('../config');
const progressBoardServices = require('../services/progress_board');
const getCurrentDate = require('../helper/current-date');

const getAll = (req, res) => {
    progressBoardServices.getAll(req)
    .then(docs => {
        if (docs.data.length > 0) {
            const response = {
                data: docs.data,
                request: {
                    type: 'GET',
                    url: '/all-board/' ,
                }
            }
            res.status(200).json(response);
        } else {
            res.status(404).json({
                status: 404,
                message: `No Records Found with id: ${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}


const createProgress = (req, res) => {
    const currentDate = getCurrentDate();

    const dataInsert = {
        task_name: req.body.task_name,
        type : req.body.type,
        created_at: currentDate.dateAsiaJakarta,
    }

    progressBoardServices.createProgress(dataInsert)
    .then(() => {
        res.status(200).json({
            message: 'Successfully Create Progress',
            dataInsert: dataInsert,
            request: {
                type: "POST",
                url: "/create-progress"
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "Failed Create a Progress"
        });
    })

}

const updateProgress = (req, res) => {
    const dataUpdate = {
        id: req.body.id,
        type: req.body.type
    }

    progressBoardServices.getById(dataUpdate.id)
    .then(docs => {  
        if(docs.length > 0) {
            progressBoardServices.updateProgress(dataUpdate)
            .then(() => {
                res.status(200).json({
                    message: 'Successfully Update Progress',
                    dataUpdate: dataUpdate,
                    request: {
                        type: "POST",
                        url: "/update-progress"
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Failed Update a Progress"
                });
            })
        } else {
            res.status(404).json({
                message: `Data not found with id ${dataUpdate.id}`
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
}


const deleteProgress = (req, res) => {
    const id = req.body.id;

    progressBoardServices.getById(id)
    .then(docs => {  
        if(docs.length > 0) {
            progressBoardServices.deleteProgress(id)
            .then(() => {
                res.status(200).json({
                    message: 'Successfully Delete Progress',
                    id: id,
                    request: {
                        type: "POST",
                        url: "/delete-progress"
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Failed Delete a Progress"
                });
            })
        } else {
            res.status(404).json({
                message: `Data not found with id ${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
}

module.exports = {
    getAll,
    createProgress,
    updateProgress,
    deleteProgress
}