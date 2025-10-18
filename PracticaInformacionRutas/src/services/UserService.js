// services/UserService.js

const bcrypt = require('bcrypt');

class UserService {
    constructor(models) {
        this.User = models.User;
    }
    
    async findAll() {
        return this.User.findAll();
    }

    async findOne(id) {
        return this.User.findByPk(id); 
    }

    async findByEmail(email) {
        return this.User.findOne({ where: { email } });
    }

    async create(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newData = {
            ...data,
            password: hashedPassword
        };
        return this.User.create(newData);
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
