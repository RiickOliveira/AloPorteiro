'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Chave primaria'
        },        
        email: {
            type: DataTypes.STRING(80),
            field: 'email',
            allowNull: false,
            comment: 'Email da pessoa',
            validate: {
                len : {
                    args : [0,80],
                    msg : "Tamanho máximo de 80 caracteres excedido"
                }                
            }
        },
        tipo: {
            type: DataTypes.SMALLINT,
            field: 'tipo',
            allowNull: false,
            comment: 'Tipo da pessoa'
        },
        senha: {
            type: DataTypes.STRING(32),
            field: 'senha',
            allowNull: false,
            comment: 'Senha'
        },
        desativado: {
            type: DataTypes.BOOLEAN,
            field: 'tipo',
            allowNull: false,
            comment: 'Tipo da pessoa'
        },
        criacao: {
            type: DataTypes.DATE,
            field: 'tipo',
            allowNull: false,
            comment: 'Tipo da pessoa'
        }

    }, 
    {
        schema: 'public',
        tableName: 'usuario',
        timestamps: false,
        name:{
            singular:'usuario',
            plural  :'usuarios'
        }
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; 
};

