import { Form, redirect, useActionData, useLoaderData, useNavigate } from 'react-router-dom'
import { Error, Formulario } from '../Componentes'
import { actualizarCliente, obtenerCliente } from '../data'

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

export async function action({ request, params }) {
	const formData = await request.formData()
	const datos = Object.fromEntries(formData)
	const errores = []
	const email = formData.get('email')

	//Validaciones
	let regex = new RegExp(
		"([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
	)
	if (!regex.test(email)) {
		errores.push('El email no es valido')
	}
	//Validando que todos los campos del objeto tengan algo
	if (Object.values(datos).includes('')) {
		errores.push('Todos los campos son obligatorios')
	}
	// Retornar errores
	if (Object.keys(errores).length) {
		return errores
	}
	//Actualizar el cliente
	await actualizarCliente(params.clienteId, datos)
	return redirect('/')
}

const EditarCliente = () => {
	const navigate = useNavigate()
	const cliente = useLoaderData()
	const errores = useActionData()
	return (
		<>
			<h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
			<p className='mt-3'>A continuacion podras modificar los datos de un cliente</p>

			<div className='flex justify-end'>
				<button
					className='bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded'
					onClick={() => navigate('/')}>
					Volver
				</button>
			</div>
			<div className='bg-white shadow rounded-md  md:w-3/4  mx-auto px-5 py-10 mt-2 '>
				{errores?.length && errores.map((error, i) => <Error key={i}> {error} </Error>)}

				<Form method='POST' noValidate>
					<Formulario cliente={cliente} />
					<input
						type='submit'
						className='w-full mt-5 p-3  uppercase bg-blue-800 font-bold text-white text-lg'
						value='Editar cliente'
					/>
				</Form>
			</div>
		</>
	)
}
export default EditarCliente
