import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '@/Componentes'
import { NuevoCliente, Home } from '@/pages'
import { loader as clienteLoader } from './pages/Home/Home'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
				loader: clienteLoader,
			},

			{
				path: '/clientes/nuevo',
				element: <NuevoCliente />,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
