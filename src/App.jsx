import  { useState } from 'react'
import './App.css';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PiBuildingsFill } from 'react-icons/pi';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';

const App = () => {

  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      console.log(response.data)
      setProfile(response.data);
      setError(null);
    } catch (error) {
      setProfile(null);
      setError("User Not Found");
    }
  }

  // console.log(username);

  return (

    <div className="container flex items-center justify-center flex-col gap-[30px] ">

      <div className="main-heading text-center text-[30px] mt-[25px]">
        <h1>Github Profile Finder</h1>
      </div>

      <form className='search-form flex items-center justify-center' onSubmit={formSubmit} onDragEnter={formSubmit} >

        <input type="text" placeholder='Enter GitHub Username....' className='search-input w-[500px] pt-[12px] pb-[28px] border-none text-[20px] border-r-[20px] outline-none bg-[#2b3d65] text-[#fefefe]' value={username} onChange={(e) => setUsername(e.target.value)} />

        <button type='submit' className='search-btn text-[20px] py-3 px-5 rounded-[17px] text-center border-none outline-none cursor-pointer font-semibold bg-[#20428a] text-[#fefefe] transition-all duration-500'>
          Search
        </button>

      </form>

      {error && <p className='error-msg text-[25px] text-red-500'>{error}</p>}

      {profile && (
        <div className='profile-container w-[720px] h-auto mx-auto p-[30px] bg-[#111828] rounded-[20px] border border-[rgba(255,255,255 0.1)] text-[15px] transition-all duration-400 ease-linear'>

          <div className='profile-content flex gap-[25px] justify-start'>

            <div className='profile-img'>
              <img src={profile.avatar_url} alt="Avatar" className='profile-avatar w-[140px] rounded-full border-3 border-[rgba(0,200,255,0.4)]' />
            </div>

            <div className='profile-details flex flex-col'>

              <div className='profile-desc w-[500px] flex items-center justify-around gap-[100px]'>

                <h2 className='profile-name text-[30px] font-[800]'>{profile.name}</h2>
                <p>Joined: {new Date(profile.created_at).toLocaleDateString()}</p>

              </div>

              <a href={profile.html_url} target='blank' className='profile-username text-[#fefefe] decoration-none mt-[10px] ml-[13px]'>@{profile.login}</a>

              <p className='profile-bio text-[#b1a7a7] mt-[40px] mr-[20px] mb-[20px] ml-[10px] leading-[1.5rem]'>{profile.bio}</p>

              <div className='profile-stats flex justify-evenly items-center mt-[20px] text-[17px] h-[100px] font-medium bg-[#141d2f] rounded-[20px] leading-[2.4rem] text-center'>

                <p className='profile-repos'>Repositories <br /><span className='stats text-[#1b47a4] text-[30px] font-[800]'>{profile.public_repos}</span></p>

                <p className='profile-followers'>Followers <br /><span className='stats text-[#1b47a4] text-[30px] font-[800]'>{profile.followers}</span></p>
                
                <p className='profile-following'>Following <br /><span className='stats text-[#1b47a4] text-[30px] font-[800]'>{profile.following}</span></p>

              </div>

              <div className='profile-info flex justify-start mt-[20px] ml-[30px] gap-[80px]'>

                <p className='profile-location flex items-center gap-[5px]'><FaMapMarkerAlt /> {profile.location}</p>
                <p className='profile-company flex items-center gap-[5px]'><PiBuildingsFill /> {profile.company}</p>

              </div>

              <div className='profile-links flex flex-col justify-start items-start mt-[30px] ml-[70px] gap-[20px]'>

                <a href={`https://twitter.com/${profile.twitter_username}`} target='_blank' className='twitter-link bg-[#141d2f] w-[300px] flex gap-[10px] justify-center items-center px-[20px] py-[10px] text-[#fefefe] no-underline rounded-[20px]'><FaXTwitter />{profile.twitter_username}</a>

                <a href={profile.html_url} target='_blank' className='profile-url bg-[#141d2f] w-[300px] flex gap-[10px] justify-center items-center px-[20px] py-[10px] text-[#fefefe] no-underline rounded-[20px]'><FaGithub />View Profile</a>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default App