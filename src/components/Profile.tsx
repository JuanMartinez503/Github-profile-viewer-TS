import Repos from "./Repos";

export default function Profile({ query,userRepos }) {

    function formatDate(dateString: string) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
  return (
    <div className="p-2">
      <div className="profile-container ">
        <div className="personal-info">
          <img
            src={query.avatar_url}
            alt="A Image with the avatar of the user"
          />
          <h3>{query.name}</h3>
          <h4>{query.login}</h4>
          <p>Followers: {query.followers}</p>
          <p>Following: {query.following}</p>
          <a href={query.html_url} target="_blank">
            View Profile
          </a>
        </div>
        <div className="profile-info">
        <div className="repositories-gist text-center mb-3">
            <button>Location: {query.location}</button>

            <button>
              {" "}
              Company:
              {query.company}
            </button>
            <button>Public Gist: {query.public_gists}</button>

<button>
  {" "}
  Public Repos:
  {query.public_repos}
</button>
          </div>
          <p>{query.bio}</p>
          <p>Joined: {formatDate(query.created_at)}</p>
          <div className="repositories-gist-bottom text-center">
          
          </div>
        </div>
      </div>
      <div>
        <Repos userRepos={userRepos}/>
      </div>
    </div>
  );
}
