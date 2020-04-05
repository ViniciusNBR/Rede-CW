const connection = require('../database/connection')

module.exports = {
    async create(request, response){
        const informedEmail = request.body
        const informedPass = request.body

        const user = await connection('users').where('email', informedEmail.email).select('*').first()

        if(user === undefined){
            return response.status(400).json({error: 'E-mail não cadastrado'})
        }else if(informedPass.password !== user.password){
            return response.status(401).json({error: 'E-mail ou senha incorretos'})
        }

        return response.json(user)
    }
}