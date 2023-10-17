import Aos from 'aos'
import { useEffect } from 'react';

interface ReposProps{
    userRepos:any
}
const Repos:React.FC<ReposProps>=({userRepos})=> {
    useEffect(()=>{
        Aos.init({duration:300})
    },[])
    function formatDate(dateString: string) {
        const options:any = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    return (
        <div className=' overflow-hidden'>
            {userRepos.length>0 ? (
                <div>
                        <h2 className="repos-title">Repositories</h2>
            {userRepos.map((repo:any,i:any)=>(
                <div key={i} className="repos-container" data-aos="zoom-out">
                    <p className="last-update">Last Updated: {formatDate(repo.updated_at)}</p>
                    <a href={repo.html_url} target='_blank'>{repo.name}</a>
                    {repo.description ? (
                        <div>
                    <p>Description: {repo.description}</p>

                        </div>
                    ):(
                        <p>
                            Description: none
                        </p>
                    )}
                    <div className="text-center">
                        {repo.language ?(
                    <button>{repo.language}</button>

                        ):(
                    <button>None</button>

                        )}

                    </div>
                </div>
            ))}
                </div>
            ):(
                <h2 className="repos-title">No Repositories</h2>

            )}
        
        </div>
    )
}
export default Repos