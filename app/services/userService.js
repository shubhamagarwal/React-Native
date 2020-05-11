import { ApiClient } from './apiClient'

const UserService = (collection) => ({
        profileByID: (id) => ApiClient.get(`/${collection}/${id}`),
        updateProfile: (id,data) => ApiClient.axios.post(`/${collection}/${id}`, {data}),
    })

export default UserService

