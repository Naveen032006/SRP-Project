import Color from '../Color';
import { Header } from '../Basic/heading';
import './subcomp.css'
import { Subissue } from './subissues';
import { useState } from "react";
import axios from "axios";

const locationData = {
  Villupuram: {
    Gingee: ["Ward 1", "Ward 2"],
    Tindivanam: ["Ward A", "Ward B"]
  },
  Chennai: {
    Egmore: ["Ward 10", "Ward 11"],
    Guindy: ["Ward 20", "Ward 21"]
  }
};




const SubComplain=()=>{
    const [formData, setFormData] = useState({
    issueTitle: "",
    category: "",
    district: "",
    taluk: "",
    ward: "",
    description: ""
  });
    const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "district" && { taluk: "", ward: "" }),
      ...(name === "taluk" && { ward: "" })
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    issueTitle: formData.issueTitle,
    category: formData.category,
    description: formData.description,
    location: {
      district: formData.district,
      taluk: formData.taluk,
      ward: formData.ward
    }
  };

  await axios.post(
    "http://localhost:3000/complaint/createusingorm",
    payload,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  alert("Complaint submitted successfully");
};


    const sStyle={maxHeight:"82vh",overflowY:"scroll"}
    return (
  <form style={sStyle} onSubmit={handleSubmit}>

    <Header
      title="Submit Complaints"
      subtitle="Report an Issue in your Community"
      showicon={false}
    />

    <div id="subcol">

      {/* Recent issues */}
      <div id="reccomp" style={{ backgroundColor: Color.primary, border: "2px solid black" }}>
        <h3 >Recent community Issues</h3>
        <Subissue />
      </div>

      {/* Complaint input */}
      <div id="complaintinput" style={{ backgroundColor: Color.primary, border: "2px solid black" }}>

        <h3 style={{Color:"#000000ff"}}>Issue details</h3>

        <h4 style={{Color:"#000000ff"}}>Issue title*</h4>
        <input
          name="issueTitle"
          type="text"
          placeholder="Brief title"
          value={formData.issueTitle}
          onChange={handleChange}
          required
        />

        <h4 style={{Color:"black"}}>Select a Category*</h4>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select category --</option>
          <option value="Water Supply">Water Supply</option>
          <option value="Electricity">Electricity</option>
          <option value="Roads">Roads</option>
        </select>

        <h4 style={{Color:"black"}}>District*</h4>
        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
        >
          <option value="">Select District</option>
          {Object.keys(locationData).map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <h4 style={{Color:"black"}}>Taluk*</h4>
        <select
          name="taluk"
          value={formData.taluk}
          onChange={handleChange}
          disabled={!formData.district}
          required
        >
          <option value="">Select Taluk</option>
          {formData.district &&
            Object.keys(locationData[formData.district]).map(t => (
              <option key={t} value={t}>{t}</option>
            ))
          }
        </select>

        <h4 style={{Color:"black"}}>Ward*</h4>
        <select
          name="ward"
          value={formData.ward}
          onChange={handleChange}
          disabled={!formData.taluk}
          required
        >
          <option value="">Select Ward</option>
          {formData.district && formData.taluk &&
            locationData[formData.district][formData.taluk].map(w => (
              <option key={w} value={w}>{w}</option>
            ))
          }
        </select>

        <h3 style={{Color:"black"}}>Description</h3>
        <textarea
          name="description"
          rows="5"
          placeholder="Brief description here"
          value={formData.description}
          onChange={handleChange}
          required
        />

      </div>

      {/* Image upload (still inside SAME form) */}
      <div id="imageupl" style={{ backgroundColor: Color.primary, borderRadius: "20px", border: "2px solid black" }}>
        <h3 style={{Color:"black"}}>Photo Upload</h3>
        <input type="file" accept="image/*" />
      </div>

      {/* Instructions for image & issue (added) */}
      <div id="uploadInstructions" style={{ backgroundColor: Color.primary, borderRadius: "12px", border: "1px solid black", padding: "12px", marginTop: "10px" }}>
        <h4 style={{ margin: "0 0 6px 0" }}>How to upload</h4>
        <p style={{ margin: 0 }}>• Attach a clear photo showing the issue (JPEG/PNG).<br/>
           • Max file size: 5MB.<br/>
           • In the description, include exact location details, time, and any relevant landmarks.</p>
      </div>

    </div>

    <button
      id="submitComplaint"
      type="submit"
      style={{ backgroundColor: Color.primary, color: Color.secondary }}
    >
      Submit Complaint
    </button>

  </form>
);

}
export default SubComplain;