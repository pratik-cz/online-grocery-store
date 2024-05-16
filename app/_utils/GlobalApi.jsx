const { default: axios } = require("axios")
const axiosClient = axios.create({
    baseURL: 'https://online-grocery-store-backend-strapi.onrender.com/api/'
})

const getCategory = () => axiosClient.get('/categories?populate=*')
const getSlider = () => axiosClient.get('/sliders?populate=*').then(res => {
    return res.data.data;
})
const getCategoryList = () => axiosClient.get('/categories?populate=*').then(res => {
    return res.data.data;
})
const getProductList = () => axiosClient.get('/products?populate=*').then(res => {
    return res.data.data;
})
const getProductsByCategory = (category) => axiosClient.get(`/products?filters[categories][name][$in]=${category}&populate=*`).then(res => {
    return res.data.data;
})
const registerUser = (username, email, password) => axiosClient.post('/auth/local/register', {
    username: username,
    email: email,
    password: password
})
const signinUser = (email, password) => axiosClient.post('/auth/local', {
    identifier: email,
    password: password
})
const addToCart = (data, jwt) => axiosClient.post('/user-carts', data, {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
})
const getCartItems = (userId, jwt) => axiosClient.get('user-carts?filters[userId][$eq]=' + userId + '&[populate][products][populate][images][populate][0]=url', {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
}).then(resp => {
    const data = resp.data.data;
    console.log(resp)
    const cartItemList = data.map((item, index) => ({
        name: item.attributes.products?.data[0].attributes.name,
        quantity: item.attributes.quantity,
        amount: item.attributes.amount,
        image: item.attributes.products?.data[0]?.attributes?.images?.data?.attributes?.formats?.thumbnail?.url,
        actualPrice: item.attributes.products?.data[0].attributes.mrp,
        id: item.id
    }))
    return cartItemList;
});

const deleteCartItem = (id, jwt) => axiosClient.delete('/user-carts/' + id, {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
})
export default { getCategory, getSlider, getCategoryList, getProductList, getProductsByCategory, registerUser, signinUser, addToCart, getCartItems,deleteCartItem }