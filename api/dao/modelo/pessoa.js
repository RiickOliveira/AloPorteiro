'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Pessoa', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Chave primaria'
        },        
        nome: {
            type: DataTypes.STRING(40),
            field: 'nome',
            allowNull: false,
            comment: 'Nome da pessoa',
            validate: {
                len : {
                    args : [0,40],
                    msg : "Tamanho máximo de 40 caracteres excedido"
                }                
            }
        },
        idade: {
            type: DataTypes.INTEGER,
            field: 'idade',
            allowNull: true,
            comment: 'Idade da pessoa'
        }
    }, {
        schema: 'public',
        tableName: 'pessoa',
        timestamps: false,
        name:{
            singular:'pessoa',
            plural  :'pessoas'
        }
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; 
};

