import { useState } from "react";
import Profile from "./Profile";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [userNotFound, setUserNotFound] = useState('')

  const handleSearchQuery = async (e:React.FormEvent)  =>  {
    e.preventDefault();
    try {
        const res = await fetch(`https://api.github.com/users/${query}`)
        if(res.ok){

        const data = await res.json()
        console.log(data);
            setQuery(data)
        
        } else {
            setUserNotFound("UserName was not Found")
            setTimeout(()=>{
                setUserNotFound("")
            },3000)
        }
        
    } catch (err) {
        console.log(err);
        
    }
  

  };
  return (
    <div>
      <header>
        <div className="title-cont">
          <img src="/githublogo.png" alt="A logo for github" />
          <h2>Search for a profile</h2>
        </div>
        <form className="search" onSubmit={handleSearchQuery}>
          <input type="text" placeholder="Username..." value={query} onChange={(e)=>setQuery(e.target.value)} />
          <button type="submit">Search</button>
        </form>
        {userNotFound &&(
            <p className="alert alert-danger text-center">{userNotFound}</p>
        )}
      </header>
      <Profile query={query}/>
    </div>
  );
}
