import { Dimensions } from "react-native"

export const colors = {
    primary: '#EABD5B',
    border: '#707070',
    line: '#505151',
    background: '#090909',
    text: '#715D31',
    heading: '#ABAEAD',
    inputbg: '#111214',
    headerbg: '#000000',
    sidebar: '#ABAEAD',
    pborder: '#131313'
}

export const { width, height } = Dimensions.get('screen')

// export const apiurl = 'http://192.168.100.6:5000/api'
// export const base_url = 'http://192.168.100.6:5000'

// test key 
// export const key = 'rzp_test_VelZScx6x93b8A'
// live key
export const key = 'rzp_live_G5LLykgrSLjqPQ'


// production
export const apiurl = 'https://api.nfbi.in/api'
export const base_url = 'https://api.nfbi.in'