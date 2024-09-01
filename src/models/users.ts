  import { Model, DataTypes, Optional } from 'sequelize';
  import sequelize from '../lib/db'; // Pastikan path ini sesuai

  interface UserAttributes {
    id: number;
    username: string;
    password: string;
    email: string;
    role: 'user' | 'admin';
    created_at: Date;
    last_login?: Date; // Kolom ini bersifat opsional
    active?: boolean; // Kolom ini bersifat opsional
  }

  interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

  class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
    public email!: string;
    public role!: 'user' | 'admin';
    public created_at!: Date;
    public last_login?: Date;
    public active?: boolean;

    // Jika perlu, tambahkan getter dan setter di sini
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // default nonaktif
    },
  }, {
    sequelize,
    tableName: 'Users',
    timestamps: false, // Jika Anda tidak menggunakan timestamp otomatis
  });

  export default User;
