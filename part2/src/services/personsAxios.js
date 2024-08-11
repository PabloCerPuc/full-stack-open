import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = nameObject => {
    return axios.post(baseUrl, nameObject)
}

const getAll = () => {
    return axios.get(baseUrl)
}

const deletePerson = (id) => {
    const urlId = baseUrl.concat('/',id)
    return axios.delete(urlId)
}

const updatePhone = (id, changePerson) => {
    const urlId = baseUrl.concat('/',id)
    return axios.put(urlId, changePerson)
}

export default {create, getAll, deletePerson, updatePhone}