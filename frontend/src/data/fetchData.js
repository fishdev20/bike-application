import { default as axios } from "axios"
import React from 'react';
import {useGlobal} from 'reactn';

export async function fetchData(setState, url) {
    try {
        const response = await axios.get(url)
        setState(response.data)
    } catch (e) {
        throw new Error(e)
    }
}


