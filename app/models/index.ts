import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";

export const TableauEmbedV1 = sequelize.define("t_tableau_embed_v1",{
    n_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    j_employee_id: {
        type: DataTypes.JSONB
    },
    j_employee_nik: {
        type: DataTypes.JSONB
    },
    c_embed: {
        type: DataTypes.STRING
    },
    d_created_at: {
        type: DataTypes.DATEONLY
    },
    d_updated_at: {
        type: DataTypes.DATEONLY
    }
},{
    freezeTableName: true,
    timestamps: false,
})
export const TableauEmbedV2 = sequelize.define("t_tableau_embed_v2",{
    n_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    n_employee_id: {
        type: DataTypes.INTEGER
    },
    c_employee_nik: {
        type: DataTypes.STRING
    },
    j_embed: {
        type: DataTypes.JSONB
    },
    d_created_at: {
        type: DataTypes.DATEONLY
    },
    d_updated_at: {
        type: DataTypes.DATEONLY
    }
},{
    freezeTableName: true,
    timestamps: false,
})
export const TableauEmbedV3 = sequelize.define("t_tableau_embed_v3",{
    n_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    n_employee_id: {
        type: DataTypes.INTEGER
    },
    c_employee_nik: {
        type: DataTypes.STRING
    },
    j_embed_id: {
        type: DataTypes.JSONB
    },
    d_created_at: {
        type: DataTypes.DATEONLY
    },
    d_updated_at: {
        type: DataTypes.DATEONLY
    }
},{
    freezeTableName: true,
    timestamps: false,
})
export const TableauEmbedMaster = sequelize.define("t_tableau_embed_master",{
    n_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    c_title: {
        type: DataTypes.STRING
    },
    c_group: {
        type: DataTypes.STRING
    },
    c_embed: {
        type: DataTypes.STRING
    },
    d_created_at: {
        type: DataTypes.DATEONLY
    },
    d_updated_at: {
        type: DataTypes.DATEONLY
    }
},{
    freezeTableName: true,
    timestamps: false,
})