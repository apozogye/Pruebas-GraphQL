const { makeExecutableSchema } = require('@graphql-tools/schema');
const { resolvers } = require('./resolvers');
const typeDefs = `

type Query
{
    saludar(name:String!):String
    empleados: [Empleado!]!
    departamento(nombre:String):Departamento
}
type Empleado
{
    _id: ID
    nombre: String!
    sueldo: Float
}

input EmpleadoInput
{
    nombre: String!
    sueldo: Float
}
type Mutation
{
    createEmpleado(input:EmpleadoInput):Empleado
}
type Departamento
{
    _id: ID
    nombre: String
    slogan: String
    empleados:[Empleado]
}
type Gerente
{
    _id: ID
    nombre: String
    email: String
}

`;
module.exports = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
})