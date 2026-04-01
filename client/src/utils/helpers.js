export function headerGenerator(hasJson=false, extraParams={}) {
    const token = localStorage.getItem('token');
    const header = {}
    if (token) {
        header.Authorization = `Bearer ${token}`
    }
    if (hasJson) {
        header["Content-Type"] = "application/json";
    }
    return {...header, ...extraParams};
}