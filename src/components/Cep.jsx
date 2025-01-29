import axios from "axios"
import { useState } from "react"

export default function Cep() {
    const [cep, setCep] = useState();
    const [endereco, setEndereco] = useState();

    const getCep = (e) => {
        e.preventDefault();

        axios.get(`http://viacep.com.br/ws/${cep}/json/`)
            .then((res) => {
                setEndereco(res.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleCEP = (e) => {
        setCep(e.target.value);
    }

    return(
        <div className="box">
            <form onSubmit={getCep} className="form">
                <label htmlFor="CEP">Escreva o CEP desejado: </label>
                <input type="text" name="CEP" id="CEP" onChange={handleCEP}/>

                <input type="submit" value="Enviar" />
            </form>
            {endereco &&
                <p>
                    O endereço referente ao CEP {endereco.cep} é:  &nbsp;

                    {endereco.logradouro} - {endereco.bairro}, {endereco.localidade}
                </p>

            }
        </div>
    )
}