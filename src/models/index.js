const { User } = require('./user')

const models = {
    User
}

// creo un array con los valores del objeto "models" que sirve  Ejecutar .associate() si existe
Object.values(models).forEach((model) => {
    if (typeof model.associate === 'function') {
        model.associate(models);
    }
});

module.exports =  models 