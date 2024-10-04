import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Index, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
    timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class Token extends Model<Token> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Index // Add index for efficient querying by media_id
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    media_id!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    line_no!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    text!: string;

    @Column({
        type: DataType.FLOAT, // Using FLOAT for time since it may not always be an integer
        allowNull: false,
    })
    start_time!: number;

    @Column({
        type: DataType.FLOAT, // Same for end_time, using FLOAT for flexibility
        allowNull: false,
    })
    end_time!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 1, // Optional default version value
    })
    version!: number;

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
