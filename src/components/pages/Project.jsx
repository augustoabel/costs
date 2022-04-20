import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
function Project() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
        },
        }).then(resp => resp.json())
        .then((data) => {
            setProject(data)
        })
        .catch(err => console.log(err))
    }, 500)
        }, [id])

        function toogleProjectForm() {
            setShowProjectForm(!showProjectForm)
        }

/*':' é se nao, if ternario*/
    return (<>
        {project.name ? (
        <div className={styles.project_details}>
            <Container customClass="colum">
                <div className={styles.details_container}>
                    <h1>Projeto:{project.name}</h1>
                    <button className={styles.btn} onClick={toogleProjectForm}>
                        {!showProjectForm ? 'Editar Projeto' : 'Fechar'}</button>{/* se nao tiver project form sendo exibido, entao o botao vai receber 'editar projeto' */}
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado</span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <p>form</p>
                            </div>
                        )} 
                </div>
            </Container>
        </div>
        ): (
            <Loading/>
        )}
        </>
    )
}

export default Project