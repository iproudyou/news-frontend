import customAxios from '../../../config/customAxios';

export const pullNewsApi = async () => {
    try {
        return await customAxios({
            method: 'post',
            url: '/api/news',
        })
    } catch (err) {
        throw new Error();
    }
}

export const getAllNewsApi = async () => {
    try {
        return await customAxios({
            method: 'get',
            url: '/api/news',
        })
    } catch (err) {
        throw new Error();
    }
}