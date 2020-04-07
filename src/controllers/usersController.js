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
        const {name, email, password} = request.body
        const newUser = request.body
        const error = 'O e-mail informado já foi cadastrado'
        const ok = 'Cadastro realizado com sucesso!'

        const user = await connection('users').where('email', newUser.email).select('*').first()

        console.log(user)

        if (user !== undefined){

            if(newUser.email === user.email){
            
                return response.status(409).json({error})
            }
        }
        
        const [id] = await connection('users').insert({
            name,
            email,
            password,
        })
        
        return response.json({ok})
        
    },

    async delete(request, response){
        const {id} = request.params

        await connection('users').where('id', id).delete()

        return response.status(204).send()
    }
}