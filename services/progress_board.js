const { QueryTypes } = require('sequelize');
const sequelize = require("../db");
const progressBoardModel = require('../models/progress_board').progressBoardModel;
const getCurrentDate = require('../helper/current-date');

const getAll = (req) => {
    const query = `SELECT * FROM progress_board where deleted_at is NULL`;
    return progressBoardModel.sequelize.query(query, {
        type: QueryTypes.SELECT,
    })
    .then(data => {
        return {
            data: data
        }
    })
    .catch(error => {
        console.log(error);
    })
}

const getById = (id) => {
    return progressBoardModel.findAll({
        where: {
            id: id 
        }
      }).then(docs => {
        return docs;
    });
}

const createProgress = (dataInsert) => {    
    return progressBoardModel.create(dataInsert)
    .then(docs => {
        return {
            docs: docs,
        }
    })
    .catch(error => {
        console.log(error);
    })
}


const updateProgress = (dataInsert) => {
    const currentDate = getCurrentDate();

    return progressBoardModel.update({
        type: dataInsert.type,
        updated_at: currentDate.dateAsiaJakarta
    }, {
        where: { id: dataInsert.id }
    }).then(docs => {
        return {
            docs: docs,
        }
    }).catch(error => {
        console.log(error)
    })
}


const deleteProgress = (id) => {
    const currentDate = getCurrentDate();

    return progressBoardModel.update({
        deleted_at: currentDate.dateAsiaJakarta
    }, {
        where: { id: id }
    }).then(docs => {
        return {
            docs: docs,
        }
    }).catch(error => {
        console.log(error)
    })
}

module.exports = {
    getAll,
    getById,
    createProgress,
    updateProgress,
    deleteProgress
}