import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'

function Project() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()    

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

        function editPost(project) {
            setMessage('')
            if(project.budget < project.cost) {
                setMessage('O orçamento não pode ser menor do que o custo do projeto!')
                setType('error')
                return false
            }

            fetch(`http://localhost:5000/projects/${project.id}`, {
                method: 'PATCH', //PATCH so muda oq foi alterado
                headers: {'Content-Type': 'application/json',}, //Headers em json para se comunicar com a api
                body: JSON.stringify(project), //Manda o projeto como texto
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMessage('Projeto atualizado!')
                setType('success')
            })
            .catch((err) => console.log(err))
        }

        function toogleProjectForm() {
            setShowProjectForm(!showProjectForm)
        }

        function toogleServiceForm() {
            setShowServiceForm(!showServiceForm)
        }

/*':' é se nao, if ternario*/
    return (<>
        {project.name ? (
        <div className={styles.project_details}>
            <Container customClass="colum">
                {message &&  <Message type={type} msg={message} />}
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
                                <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project}/>
                            </div>
                        )} 
                </div>
                <div className={styles.service_form_container}>
                    <h2>Adicione um Serviço</h2>
                    <button className={styles.btn} onClick={toogleServiceForm}>
                        {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                    </button>
                    <div className={styles.project_info}>
                    {showServiceForm && <div>Formulário do serviço</div>}
                </div> 
            </div>
                <h2>Serviços</h2>
                <Container customClass='start'>
                    <p>Itens de serviços</p>
                </Container>
                </Container>
            </div>
        ): (
            <Loading/>
        )}
        </>
    )
}

export default Project