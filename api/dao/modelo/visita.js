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
        condomino_id: {
            type: DataTypes.INTEGER,
            field: 'condomino_id',
            allowNull: false,
        },        
        pessoa_id: {
            type: DataTypes.INTEGER,
            field: 'pessoa_id',
            allowNull: false,
        },
        data_hora_reserva: {
            type: DataTypes.DATE,
            field: 'data_hora_reserva',
            allowNull: false,
            comment: 'Dta nascimento'
        },                
        nome_convidado: {
            type: DataTypes.STRING(60),
            field: 'nome_convidado',
            allowNull: false,
            comment: 'Nome da pessoa convidado',
            validate: {
                len : {
                    args : [0,80],
                    msg : "Tamanho máximo de 80 caracteres excedido"
                }                
            }
        },
        condomino_observacao: {
            type: DataTypes.STRING(120),
            field: 'condomino_observacao',
            allowNull: false,
            validate: {
                len : {
                    args : [0,120],
                    msg : "Tamanho máximo de 120 caracteres excedido"
                }                
            }
        },
        data_hora_expiracao: {
            type: DataTypes.DATE,
            field: 'data_hora_expiracao',
            allowNull: false,
        },                
        situacao: {
            type: DataTypes.INTEGER,
            field: 'situacao',
            allowNull: false,
        },
        portaria_data_hora_chegada: {
            type: DataTypes.DATE,
            field: 'portaria_data_hora_chegada',
            allowNull: false,
        },
        porteiro_id: {
            type: DataTypes.INTEGER,
            field: 'porteiro_id',
            allowNull: false,
        },              
        portaria_observacao: {
            type: DataTypes.STRING(120),
            field: 'portaria_observacao',
            allowNull: false,
            validate: {
                len : {
                    args : [0,120],
                    msg : "Tamanho máximo de 120 caracteres excedido"
                }                
            }
        }
    }, 
    {
        schema: 'public',
        tableName: 'visita',
        timestamps: false,
        name:{
            singular:'visita',
            plural  :'visitas'
        }
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; 
};

