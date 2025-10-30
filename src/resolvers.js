const empleados = require('../sample');
const resolvers = {
    Query: {
        saludar(root, { name }, context) {
            console.log(context);
            return `Hola ${name}!`;
        },
        empleados() {
            return empleados;
        },
        departamento:(nombre)=>{
            console.log(nombre);
            return '$(nombre)!';
        },
    },
    Mutation: {
        createEmpleado(_, { input }) {
            input._id = empleados.length+1;
            console.log(input);
            empleados.push(input);
            return input;
        },
    }
}
module.exports = { resolvers };
