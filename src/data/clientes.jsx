export async function obtenerClientes() {
	const respuesta = await fetch(import.meta.env.VITE_API_URL)
	const resultado = await respuesta.json()
	return resultado
}
