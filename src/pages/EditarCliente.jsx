import { obtenerCliente } from '../data'

export async function loader({ params }) {
	const cliente = await obtenerCliente(params.clienteId)

	if (Object.values(cliente).length === 0) {
		throw new Response('', {
			status: 404,
			statusText: 'Not Found',
		})
	}
	return cliente
}

const EditarCliente = () => {
	return <div>EditarCliente</div>
}
export default EditarCliente
