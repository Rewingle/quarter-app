async function getUsers(){
    let res = await fetch('https://jsonplaceholder.typicode.com/users')
    return res.json()
}

export default async function Users(){
    let users = await getUsers();

    return(
        <div>
            <h2>Users</h2>
            {users.map((obj)=>{
                return <li key={obj.id}>{obj.name}</li>
            })}
        </div>
    )
}