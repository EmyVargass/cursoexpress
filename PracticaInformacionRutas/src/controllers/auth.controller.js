class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await this.authService.getUser(email, password);
            const tokenData = this.authService.signToken(user);
            res.json(tokenData);
        } catch (error) {
            // For authentication errors, it's better to send a 401 Unauthorized status
            res.status(401).json({ error: error.message });
        }
    }
}

module.exports = AuthController;
