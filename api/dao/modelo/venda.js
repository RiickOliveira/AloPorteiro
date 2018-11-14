'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Venda', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Chave primaria'
        },
        pessoaId: {
            type: DataTypes.INTEGER,
            field: 'pessoa_id',
            allowNull: false,
            comment: 'Cliente da venda'
        },        
        produto: {
            type: DataTypes.STRING(40),
            field: 'produto',
            allowNull: false,
            comment: 'Nome do produto vendido'
        },
        valor: {
            type: DataTypes.DECIMAL(11,2),
            field: 'valor',
            allowNull: false,
            comment: 'Preço do produto vendido'
        }
        
    }, {
        schema: 'public',
        tableName: 'venda',
        timestamps: false,
        name:{
            singular:'venda',
            plural  :'vendas'
        }
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; 
};

