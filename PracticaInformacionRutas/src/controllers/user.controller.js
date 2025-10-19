
class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async createUser(req, res, next) {
        try {
            const newUser = await this.userService.create(req.body);
            res.status(201).json({ message: "Usuario creado", data: newUser });
        } catch (error) {
            next(error);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await this.userService.findAll();
            res.json({ total: users.length, data: users });
        } catch (error) {
            next(error);
        }
    }

    async getUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await this.userService.findOne(id);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const updatedUser = await this.userService.update(id, req.body);
            if (!updatedUser) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json({ message: "Usuario actualizado", data: updatedUser });
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const deletedUser = await this.userService.delete(id);
            if (!deletedUser) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json({ message: 'Usuario eliminado', data: deletedUser });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
