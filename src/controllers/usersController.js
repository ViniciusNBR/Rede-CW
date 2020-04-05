const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const users = await connection('users').select('*')

        return response.json(users)
    },

    async indexFilter(request, response){
        const {id} = request.params
        
        const users = await connection('users').where('id', id)

        return response.json(users)
    },

    async create(request, response){
        const {name, email, password, sex} = request.body
        const newUser = request.body

        const user = await connection('users').where('email', newUser.email).select('*').first()

        console.log(user)

        if (user !== undefined){

            if(newUser.email === user.email){
            
                return response.status(409).json({error: 'E-mail já cadastrado.'})
            }
        }
        
        const [id] = await connection('users').insert({
            name,
            email,
            password,
            sex,
        })
        
        return response.json({id})
        
    },

    async delete(request, response){
        const {id} = request.params

        await connection('users').where('id', id).delete()

        return response.status(204).send()
    }
}