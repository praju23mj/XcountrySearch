import React,{useState,useEffect} from "react";
import './App.css';

function App() {

  const[countries,setCountries]=useState([]);
  const[search,setSearch]=useState('');


  useEffect(()=>{
    fetch("https://restcountries.com/v3.1/all")
    .then(response=> {
      if (!response.ok) {
        throw new Error('Failed to fetch countries data');
      }
       return response.json()})
    .then(data=>setCountries(data))
    .catch(err=>console.error("Error fetching data: ",err))

  },[])

  const handleSearch=(e)=>{
    setSearch(e.target.value)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );


  const containerStyle={
    display:"flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  }
  const countryCard={
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    border:"1px solid black",
    borderRadius:"10px",
    borderColor:"grey",
    margin:"10px",
    padding:"10px",
    width:"200px"
  }

  const input={
    width:"500px",
  }
  const inp={
    display:"flex",
    justifyContent:"center",
    margin:"5px",
  }

  return (
    <div >
      <div style={inp} >
      <input type="text"  placeholder="Search for countries..." value={search} onChange={handleSearch} style={input}/>
      </div>
      <div style={containerStyle}>
      {filteredCountries.map(country=>(
        <div key={country.name.common} style={countryCard}>
          <img src ={country.flags.png}
          alt={country.name.common}
          height="100px"
          width="100px"
          />
          <h3>{country.name.common}</h3>
        </div>
      ))
      
      }
       {filteredCountries.length === 0 && ""}
      </div>
     
    </div>
  );
}

export default App;
