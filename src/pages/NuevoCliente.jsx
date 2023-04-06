import { Form, useNavigate } from 'react-router-dom'
import { Error, Formulario } from '../Componentes'
import { useActionData } from 'react-router-dom'

export async function action({ request }) {
	const formData = await request.formData()
	const datos = Object.fromEntries(formData)
	const errores = []
	const email = formData.get('email')

	let regex = new RegExp(
		"([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
	)
	if (!regex.test(email)) {
		errores.push('El email no es valido')
	}

	//Validando que todos los camops del objeto tengan algo
	if (Object.values(datos).includes('')) {
		errores.push('Todos los campos son obligatorios')
	}
	// Retornar errores
	if (Object.keys(errores).length) {
		return errores
	}
	return null
}

const NuevoCliente = () => {
	const errores = useActionData()
	const navigate = useNavigate()
	return (
		<>
			<h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
			<p className='mt-3'>Llena todos los campos para registrar a un nuevo cliente </p>

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
					<Formulario />
					<input
						type='submit'
						className='w-full mt-5 p-3  uppercase bg-blue-800 font-bold text-white text-lg'
						value='Registrar nuevo cliente'
					/>
				</Form>
			</div>
		</>
	)
}
export default NuevoCliente
