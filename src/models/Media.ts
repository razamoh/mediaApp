import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Index, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class Media extends Model<Media> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Index // Index  up queries based on media_id
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    media_id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    bucket!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    key!: string;

    @CreatedAt 
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    createdAt!: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    updatedAt!: Date;
}
