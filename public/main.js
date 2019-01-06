const get = async (path) => {
    const response = await fetch(path);
    return await response.json();
}

// get('/data').then(result => console.log(result))