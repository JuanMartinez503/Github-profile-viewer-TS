import React, { useState, useEffect } from "react";
import Profile from "./Profile";

export default function Navbar() {
  const [query, setQuery] = useState<string | null>(null);
  const [userInfo, setUserInfo]=useState('')
  const [userNotFound, setUserNotFound] = useState("");
  const [userRepos, setUserRepos] = useState([]);
  const [pastSearches, setPastSearches] = useState<string[]>([]);
  const [showPastSearches, setShowPastSearches] = useState(false);

  // Load past searches from local storage when the component mounts
  useEffect(() => {
    const storedSearches = localStorage.getItem("pastSearches");
    if (storedSearches) {
      setPastSearches(JSON.parse(storedSearches));
    }
  }, []);

  // Function to handle search
  const handleSearchQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://api.github.com/users/${query}`);
      if (res.ok) {
        const data = await res.json();
        const username = data.login; // Get the username

        // Set the query state to the username
        setUserInfo(data)
        setQuery(username);

        // Check if the query is unique
        if (!pastSearches.includes(username)) {
          // Save the username to past searches if it's unique
          setPastSearches((prevSearches) => [username, ...prevSearches]);
          localStorage.setItem(
            "pastSearches",
            JSON.stringify([username, ...pastSearches])
          );
        }

        const resRepos = await fetch(`https://api.github.com/users/${username}/repos`);
        const returnedRepos = await resRepos.json();
        setUserRepos(returnedRepos);
      } else {
        setUserNotFound("Username was not found");
        setTimeout(() => {
          setUserNotFound("");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to delete a past search
  const deletePastSearch = (index: number) => {
    const updatedSearches = [...pastSearches];
    updatedSearches.splice(index, 1);
    setPastSearches(updatedSearches);
    localStorage.setItem("pastSearches", JSON.stringify(updatedSearches));
  };

  return (
    <div>
      <header>
        <div className="title-cont">
          <img src="/githublogo.png" alt="A logo for GitHub" />
          <h2>Search for a profile</h2>
        </div>
        <form className="search" onSubmit={handleSearchQuery}>
          <input
            type="text"
            placeholder="Username..."
            value={query || ""} // Display the query if it's not null
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {userNotFound && (
          <p className="alert alert-danger text-center">{userNotFound}</p>
        )}
        {pastSearches.length > 0 && (
          <div>
            <h3>Past Searches</h3>
            <button onClick={() => setShowPastSearches(!showPastSearches)}>
              {showPastSearches ? "Hide Past Searches" : "Show Past Searches"}
            </button>
            {showPastSearches && (
              <ul>
                {pastSearches.map((search, index) => (
                  <li key={index}>
                    {search}{" "}
                    <button onClick={() => deletePastSearch(index)}>Delete</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </header>
      {userInfo && <Profile query={userInfo} userRepos={userRepos} />}
    </div>
  );
}
