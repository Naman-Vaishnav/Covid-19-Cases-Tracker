import axiox from 'axios';

const url = 'https://api.covid19india.org/data.json';


export const fetchData = async () => {
    //console.log("fetch");
    try {
        const response = await axiox.get(url);

        return response.data;

    }
    catch(error){

    }

}

