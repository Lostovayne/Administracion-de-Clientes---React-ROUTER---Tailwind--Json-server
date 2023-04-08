import { Layout } from '@/Componentes'
import { Home, NuevoCliente } from '@/pages'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from './Componentes'
import './index.css'
import EditarCliente, {
	action as editarClienteAction,
	loader as editarClienteLoader,
} from './pages/EditarCliente'
import { loader as clienteLoader } from './pages/Home/Home'
import { action as nuevoClienteAction } from './pages/NuevoCliente'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
				loader: clienteLoader,
				errorElement: <ErrorPage />,
			},
			{
				path: '/clientes/nuevo',
				element: <NuevoCliente />,
				action: nuevoClienteAction,
				errorElement: <ErrorPage />,
			},
			{
				path: '/clientes/:clienteId/editar',
				element: <EditarCliente />,
				loader: editarClienteLoader,
				action: editarClienteAction,
				errorElement: <ErrorPage />,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
