

export default function Repos({userRepos}) {
    function formatDate(dateString: string) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    return (
        <div>
            <h2 className="repos-title">Repositories</h2>
            {userRepos.map((repo,i)=>(
                <div key={i} className="repos-container">
                    <p className="last-update">Last Updated: {formatDate(repo.updated_at)}</p>
                    <a href={repo.html_url}>{repo.name}</a>
                    <p>{repo.description}</p>
                    <div className="text-center">
                    <button>{repo.language}</button>

                    </div>
                </div>
            ))}
        </div>
    )
}