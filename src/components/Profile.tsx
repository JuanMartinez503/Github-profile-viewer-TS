import { useEffect } from "react";
import Repos from "./Repos";
import Aos from "aos";
interface ProfileProps {
    query:any|null,
    userRepos:string[]
}
 const Profile:React.FC<ProfileProps>=({ query, userRepos })=> {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  function formatDate(dateString: string): string {
    const options:any = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <div className="p-2">
      <div className="profile-container " data-aos="fade-down">
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
            {query.location ? (
              <div>
                <button>Location: {query.location}</button>
              </div>
            ) : (
              <div>
                <button>Location: None</button>
              </div>
            )}
            {query.company ? (
              <button>
                {" "}
                Company:
                {query.company}
              </button>
            ) : (
              <button> Company: None</button>
            )}
            <button>Public Gist: {query.public_gists}</button>

            <button>
              {" "}
              Public Repos:
              {query.public_repos}
            </button>
          </div>
          <p>{query.bio}</p>
          <p>Joined: {formatDate(query.created_at)}</p>
          <div className="repositories-gist-bottom text-center"></div>
        </div>
      </div>
      <div>
        <Repos userRepos={userRepos} />
      </div>
    </div>
  );
}

export default Profile