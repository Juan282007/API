async function fetchData(url, options = {}) {
    const res = await fetch(url, options);
    if (res.status === 200 || res.status === 201) {
        return res.json();
    }
    return res;
}