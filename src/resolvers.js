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
    
        // 🔹 Actualizar empleado por ID
        updateEmpleado(_, { id, input }) {
        // si id es número en el schema: type Mutation { updateEmpleado(id: Int, ... }
        const index = empleados.findIndex(e => e._id === id);
        // si usas ID! (string) en el schema, usa: const index = empleados.findIndex(e => e._id === Number(id));

        if (index === -1) {
            throw new Error('Empleado no encontrado');
        }

        // mezclamos lo existente con lo nuevo
        const actualizado = {
            ...empleados[index],
            ...input,
            _id: empleados[index]._id // aseguramos que no cambie el id
        };

        empleados[index] = actualizado;
        return actualizado;
        },
         // 🔹 Eliminar empleado por ID
        deleteEmpleado(_, { id }) {
            const index = empleados.findIndex(e => e._id === id);
            // si usas ID! string: const index = empleados.findIndex(e => e._id === Number(id));

            if (index === -1) {
                 throw new Error('Codigo no encontrado');                
                //return false 
                //console.log("Id no existe"); // o podrías lanzar un error si prefieres
            }

            empleados.splice(index, 1);
           return true;
       }
    }
}
module.exports = { resolvers };
