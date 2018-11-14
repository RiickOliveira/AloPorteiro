'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Condomino', {
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
            comment: 'Pessoa vinculada a tabela PESSOA'
        },
        endereco: {
            type: DataTypes.STRING(80),
            field: 'endereco',
            allowNull: false,
            comment: 'Senha'
        },        
    }, 
    
    {
        schema: 'public',
        tableName: 'condomino',
        timestamps: false,
        name:{
            singular:'condominos',
            plural  :'condominos'
        }
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; 
};

