import axios from "axios";
import { useEffect, useState } from "react"



export default function Noticia() {
    const [noticias, setNoticias] = useState([]);
    const [novaNoticia, setNovaNoticia] = useState({
        titulo: '',
        descricao: ''
    });

    const getNoticias = () => {
        axios.get('http://localhost:3000/noticia')
            .then((res) => {
                setNoticias(res.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const postNoticias = (e) => {
        e.preventDefault();
        if (novaNoticia?.id) {
            axios.put(`http://localhost:3000/noticia/${novaNoticia.id}`, novaNoticia)
                .then((res) => {
                    getNoticias()
                    clearForm()
                })
                .catch((error) => {
                    console.error(error);
                })
        }
        else {
            axios.post('http://localhost:3000/noticia', novaNoticia)
                .then((res) => {
                    getNoticias()
                    clearForm()
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }

    useEffect(() => {
        getNoticias();
    }, [])

    const handleNovaNoticia = (e) => {
        setNovaNoticia({
            ...novaNoticia,
            [e.target.name]: e.target.value
        })
    }

    const clearForm = () => {
        setNovaNoticia({
            titulo: '',
            descricao: ''
        })
    }

    const deletarNoticia = (id) => {
        axios.delete(`http://localhost:3000/noticia/${id}`)
            .then((res) => {
                getNoticias()
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <>
            <form onSubmit={postNoticias}>
                <label htmlFor="titulo">Escreva o Titulo</label>
                <input type="text" name="titulo" id="titulo" required onChange={handleNovaNoticia} value={novaNoticia?.titulo} />

                <label htmlFor="descricao">Escreva a Descrição</label>
                <textarea name="descricao" id="descricao" cols="30" rows="10" required onChange={handleNovaNoticia} value={novaNoticia?.descricao}></textarea>

                <input type="submit" value="Enviar" />
            </form>

            {Array.isArray(noticias) &&
                <ul>
                    {noticias.map((item, key) => (
                        <li key={key}>
                            Titulo: {item.titulo}
                            Descrição: {item.descricao}

                            <input type="button" value="excluir" onClick={() => deletarNoticia(item.id)} />
                            <input type="button" value="editar" onClick={() => setNovaNoticia(item)} />
                        </li>
                    ))}
                </ul>

            }
        </>
    )
}