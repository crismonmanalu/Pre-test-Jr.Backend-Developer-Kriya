const Sequelize = require('sequelize');
const sequelize = require('../db');

const progressBoardModel = sequelize.define('progress_board', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    task_name: Sequelize.STRING,
    type: Sequelize.STRING,
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.NOW,
        allowNull: false,
    },
    deleted_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.NOW,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = {
    progressBoardModel,
}