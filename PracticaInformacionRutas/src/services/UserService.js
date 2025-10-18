// services/UserService.js

const sequelize = require('../db/sequelize');
const { User } = sequelize.models; // Accede al modelo inicializado

class UserService {
    
    async findAll() {
        return User.findAll();
    }

    async findOne(id) {
        // findByPk = Find by Primary Key
        return User.findByPk(id); 
    }

    async create(data) {
        return User.create(data);
    }

    async update(id, changes) {
        const user = await this.findOne(id);
        if (!user) {
            return null; 
        }
        return user.update(changes); 
    }
    
    async delete(id) {
        const user = await this.findOne(id);
        if (!user) {
            return null;
        }
        await user.destroy(); 
        return user; 
    }
}

module.exports = UserService;
