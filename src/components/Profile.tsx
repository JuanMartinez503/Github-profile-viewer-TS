

export default function Profile({query}){

    return (
        <div className="p-2">
            <div className="profile-container">
            <div className="personal-info">
                <img src={query.avatar_url} alt="A Image with the avatar of the user" />
                <h3>{query.name}</h3>
                <h4>{query.login}</h4>
                <p>Followers: {query.followers}</p>
                <p>Following: {query.following}</p>
                <a href={query.html_url} target="_blank">View Profile</a>
            </div>
            </div>
        </div>
    )
}