'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Porteiro', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Chave primaria'
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            field: 'usuario_id',
            allowNull: false,
            comment: 'tipo do usuario'
        },        
        pessoa_id: {
            type: DataTypes.INTEGER,
            field: 'pessoa_id',
            allowNull: false,
            comment: 'Pessoa vinculada a liberação'
        }        
    }, {
        schema: 'public',
        tableName: 'Porteiro',
        timestamps: false,
        name:{
            singular:'porteiro',
            plural  :'porteiros'
        }
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; 
};

