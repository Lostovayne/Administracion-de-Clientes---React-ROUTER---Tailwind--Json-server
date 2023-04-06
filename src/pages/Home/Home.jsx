import { useLoaderData } from 'react-router-dom'
import { Cliente } from '@/Componentes'
import { obtenerClientes } from '@/data'

function loader() {
	const clientes = obtenerClientes()
	return clientes
}

const Home = () => {
	const clientes = useLoaderData()
	return (
		<>
			<h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
			<p className='mt-3'>Administra tus clientes</p>
			{clientes.length ? (
				<table className='w-full  bg-white shadow mt-5 table-auto'>
					<thead className='bg-blue-800 text-white'>
						{/* Head */}
						<tr>
							<th className='p-2'>Clientes</th>
							<th className='p-2'>Contacto</th>
							<th className='p-2'>Acciones</th>
						</tr>
					</thead>
					{/* Body */}
					<tbody>
						{clientes.map((cliente) => (
							<Cliente cliente={cliente} key={cliente.id} />
						))}
					</tbody>
				</table>
			) : (
				<p className=' text-center mt-10'>No hay clientes aún</p>
			)}
		</>
	)
}
export { loader }
export default Home
