
import  { useState, useEffect } from "react";
import Aos from "aos";
import Profile from "./Profile";
import "aos/dist/aos.css";

export default function Navbar() {
  const [query, setQuery] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [userNotFound, setUserNotFound] = useState<string>("");
  const [userRepos, setUserRepos] = useState<string[]>([]);
  const [pastSearches, setPastSearches] = useState<string[]>([]);
  const [showPastSearches, setShowPastSearches] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<string>("");
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const storedSearches = localStorage.getItem("pastSearches");
    if (storedSearches) {
      setPastSearches(JSON.parse(storedSearches));
    }
    Aos.init({ duration: 500, delay: 100 });
  }, []);

  const handleSearchQuery = async (searchQuery: string) => {
    setLoading(true); // Set loading to true
    try {
      const res: Response = await fetch(`https://api.github.com/users/${searchQuery}`);
      if (res.ok) {
        const data = await res.json();

        const username = data.login;

        if (!pastSearches.includes(username)) {
          setPastSearches((prevSearches) => [username, ...prevSearches]);
          localStorage.setItem("pastSearches", JSON.stringify([username, ...pastSearches]));
        }

        const resRepos: Response = await fetch(`https://api.github.com/users/${username}/repos`);
        const returnedRepos = await resRepos.json();
        setUserRepos(returnedRepos);
        setUserInfo(data);
        setUserNotFound("");
      } else {
        setUserInfo(null);
        setUserNotFound("Username was not found");
        setTimeout(() => {
          setUserNotFound("");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  const deletePastSearch = (index: number) => {
    const updatedSearches: string[] = [...pastSearches];
    updatedSearches.splice(index, 1);
    setPastSearches(updatedSearches);
    localStorage.setItem("pastSearches", JSON.stringify(updatedSearches));
    setDeleteMessage("Delete was successful");
    setTimeout(() => {
      setDeleteMessage("");
    }, 1000);
  };

  const toggleShowPastSearches = () => {
    setShowPastSearches((prevShowPastSearches) => !prevShowPastSearches);
  };

  const performPastSearch = (searchValue: string) => {
    setQuery(searchValue);
    handleSearchQuery(searchValue);
  };

  return (
    <div>
      <header>
        <div className="title-cont">
          <img src="/githublogo.png" alt="A logo for GitHub" />
        </div>
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchQuery(query);
          }}
        >
          <input
            type="text"
            placeholder="Search for github username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        {userNotFound && (
          <p className="alert alert-danger text-center">{userNotFound}</p>
        )}
        {pastSearches.length > 0 && (
          <div className="past-searches">
            <h3>Past Searches</h3>
            <button className="btn toggle-search" onClick={toggleShowPastSearches}>
              {showPastSearches ? "Hide Past Searches" : "Show Past Searches"}
            </button>
            {showPastSearches && (
              <ul data-aos="zoom-in">
                {pastSearches.map((search, index) => (
                  <li className="li-past-cont" key={index}>
                    <div className="past-btn-cont">
                      <button
                        className="btn past-search-btn"
                        onClick={() => performPastSearch(search)}
                      >
                        {search}
                      </button>
                    </div>
                    <div className="past-del-cont">
                      <button
                        className="btn delete-past"
                        onClick={() => deletePastSearch(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
                {deleteMessage && (
                  <p className="alert alert-primary mt-3">{deleteMessage}</p>
                )}
              </ul>
            )}
          </div>
        )}
      </header>
      {loading ? ( // Display a loading message when loading is true
        <p className="text-center">Loading...</p>
      ) : (
        userInfo && <Profile query={userInfo} userRepos={userRepos} />
      )}
    </div>
  );
}
