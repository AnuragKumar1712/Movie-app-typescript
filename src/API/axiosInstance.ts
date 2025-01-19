import axios from "axios"

export const baseApi = axios.create({
    baseURL:"https://api.themoviedb.org",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjJhMzhjYzU2MDU5MTg1ZmQ1NDMwYTAzNGJmYWIzNCIsIm5iZiI6MTcyOTY0Njg4Mi44MTQ3ODcsInN1YiI6IjY3MTg0ZjY4MWVhMzM5MjgyOTdjYzFlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZfCUsljqJYzvJSOoa_w2lh6gzeA4u16R6UMdmvdo9ZE'
    }
})