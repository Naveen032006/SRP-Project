import { Box } from '@mui/material';
import Color from '../Color';
import { Header } from '../Basic/heading';
import './Mycomplain.css';
import { Mycomplainwrap } from './Mycomplaintwrap';
import { useState } from 'react';

const Mycomplain = () => {
    const mStyle = { maxHeight: "550px", overflowY: "scroll" };

    // ✅ Added state for all 4 filter fields
    const [filter, setFilter] = useState({
        id: "",
        category: "",
        status: "",
        order: ""
    });

    const handleFilter = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div style={mStyle}>
            <Header title="My Complaints" subtitle="Track your Submitted Issue" showicon={true} />

            {/* ✅ Changed from <form> to <div> — no submission needed here */}
            <div
                className="sbar"
                style={{
                    backgroundColor: "#dcf6eeff",
                    height: "50px",
                    display: "flex",
                    borderRadius: "20px",
                    justifyContent: "center",
                    maxWidth: "90%",
                    overflowX: "auto",
                    margin: "20px auto",
                    border: "2px solid black"
                }}
            >
                {/* ✅ name + value + onChange added to every input */}
                <input
                    name="id"
                    placeholder='Enter complaint id'
                    value={filter.id}
                    onChange={handleFilter}
                />

                <select name="category" value={filter.category} onChange={handleFilter}>
                    <option value="">--Select a category--</option>
                    <option value="Water Supply">Water Supply</option>
                    <option value="Road">Road</option>
                </select>

                <select name="status" value={filter.status} onChange={handleFilter}>
                    <option value="">--Select status--</option>
                    <option value="in progress">In progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <select name="order" value={filter.order} onChange={handleFilter}>
                    <option value="">--Select order--</option>
                    <option value="Newest First">Newest First</option>
                    <option value="Oldest First">Oldest First</option>
                </select>
            </div>

            <Box sx={{ overflowY: "auto" }}>
                {/* ✅ Pass filter down so Mycomplainwrap can filter the list */}
                <Mycomplainwrap filter={filter} />
            </Box>
        </div>
    );
};

export default Mycomplain;