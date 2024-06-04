export default function User_profile({user}) {
    return (
        <>
            <div>
                <img src={user.image} alt={user.name}/>
                <h1>{user.name}</h1>
                <h2>{user.email}</h2>
            </div>
        </>
    );
}