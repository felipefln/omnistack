import React, {useState, useMemo } from 'react';

import api from '../../services/api'
import camera from '../../assets/camera.svg'
import './styles.css'


export default function New({ history }) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState([])
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState(null)

    const preview = useMemo(() =>
    thumbnail
      ? URL.createObjectURL(thumbnail)
      : null
    , [thumbnail])
    

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail)
        data.append('company', company)
        data.append('techs', techs)
        data.append('price', price)

        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard')

    }
    return (
        <form onSubmit={handleSubmit}>
        <label id='thumbnail' style={{backgroundImage: `url(${preview})`}}>
            <input type="file"  onChange={event => setThumbnail(event.target.files[0])}/>
            <img src={camera} alt="img-thun"/>
            
        </label>
            <label htmlFor="company">Empresa *</label>
            <input 
                id='company'
                placeholder='Sua empresa incrível'
                value={company}
                onChange={event => setCompany(event.target.value)}
            />
            <label htmlFor="techs">Tecnologias * <span>(separadas por vírgula)</span></label>
            <input 
                id='techs'
                value={techs}
                placeholder='Quais tecnologias usam?'
                onChange={event => setTechs(event.target.value)}
            />
            <label htmlFor="price">Valor da Diária * <span>(em branco para GRATUITO)</span></label>
            <input 
                id='price'
                value={price}
                placeholder='Valor cobrado por dia'
                onChange={event => setPrice(event.target.value)}
            />

            <button className='btn'>Cadastrar</button>
        </form>
    )
}