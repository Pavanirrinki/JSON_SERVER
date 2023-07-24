
import './App.css';
import {useEffect,useState} from "react";
import axios from "axios"
import logo from "./pngwing.com.png"
function App() {
  const [data,setData] = useState([])
  const [selectedDeparture, setSelectedDeparture] = useState("");
  const [selectedArrival, setSelectedArrival] = useState("");
  const [fligtsData,setFlightsData] = useState(null)
  const Dispature = []
  const Arrival =  []
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/posts");
        setData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
  
    fetchData();
  }, []);
  
 data.forEach((item) => {
      if (!Dispature.includes(item.Dispature)) {
        Dispature.push(item.Dispature);
        console.log(Dispature)
      }
    });
  
    data.forEach((item) => {
      if (!Arrival.includes(item.arrival)) {
        Arrival.push(item.arrival);
       
      }
    });

    const handleDepartureChange = (event) => {
      
      setSelectedDeparture(event.target.value);
      }
   
const handleArrivalChange =(event)=>{

  setSelectedArrival(event.target.value)

}
const handleFetchData=(event)=>{
  event.preventDefault()
  console.log(selectedArrival,selectedDeparture)
  if (selectedArrival.length>=1 || selectedDeparture.length>=1){
  axios.get(`http://localhost:3000/posts?Dispature=${selectedDeparture}&arrival=${selectedArrival}`).
  then((res)=>setFlightsData(res.data)).catch((error)=>console.log(error.message))
  }else{
    alert("please select correct Depature or Arrival")
  }
}
  return (
    <div>
      <div className='background_container'>
  <div style={{display:'flex',flexDirection:"column",width:"30%",margin:"10px",}}>
       <label htmlFor="dropdown" style={{fontWeight:"bold",fontSize:"18px"}}>From:</label>
      <select id="dropdown" value={selectedDeparture} onChange={handleDepartureChange} style={{border:"none",padding:"10px",borderRadius:"30px"}}>
        <option value =''>DISPATURE</option>
 {Dispature?.map((area,index)=>(
 <option key={index} value={area}>
 {area}
</option>

 ))}
 </select>

 </div>

 <img src={logo} alt="two-way-symbol"/>


 <div style={{display:'flex',flexDirection:"column",margin:"10px",width:"30%"}}>
 <label htmlFor="dropdown" style={{fontWeight:"bold",fontSize:"18px"}}>To:</label>
      <select id="dropdown" value={selectedArrival} onChange={handleArrivalChange} style={{border:"none",padding:"10px",borderRadius:"30px"}}>
        <option value =''>ARRIVAL</option>
 {Arrival && Arrival?.map((area,index)=>(
 <option key={index} value={area}>
 {area}
</option>

 ))}
 </select>
 </div>
 <div style={{display:"flex",height:"40px",margin:"30px"}}>
 <button onClick={handleFetchData} style={{padding:"10px 80px",border:"none",borderRadius:"30px",
 backgroundColor:"#ff6666",fontWeight:"bold",fontSize:"18px",color:"white"}}>Search</button>
 </div>
    </div>
    <div style={{display:"flex",flexDirection:'column',alignItems:"center"}}>
      {fligtsData.length>=1 ? fligtsData.map((data)=>(
  <div className='card_container'style={{display:"flex",justifyContent:"space-around"}}>
<div >
  <h5>{data.start}</h5>
  <span>{data.Dispature}</span>
</div>

<div >
  <h5>{data.landed}</h5>
  <span>{data.arrival}</span>
</div>

<div>
  <h5>Fare</h5>
 <p>Rs.4,500</p>
</div>
<div style={{marginTop:"3%"}}>
<button style={{padding:"10px 15px",border:"none",borderRadius:"10px",background:"orange",color:"white",fontWeight:"bold"}}>Book Now</button>
</div>
  </div>)):<h1 style={{textAlign:"center"}}>No Flights At this Route</h1>}
  </div>
    </div>
  );
}

export default App;
