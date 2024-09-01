import React, { useEffect, useRef, useState } from 'react';
import './UserDashboard.css';
import Navbar from '../Navbar/Navbar';
import searchIcon from '../assets/SEARCH.png';
import { Card } from 'react-bootstrap';
import axios from 'axios';

const UserDashboard = () => {
    const [project, setProject] = useState([]);
    const [filteredProject, setFilteredProject] = useState([]);
    const [search, setSearch] = useState('');
    const inputRef = useRef();
    const [program, setProgram] = useState('');
    const [fromYear, setFromYear] = useState('');
    const [toYear, setToYear] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3005/api/projects')
            .then((response) => {
                setProject(response.data);
                setFilteredProject(response.data);
            })
            .catch((error) => {
                console.log(`Error fetching data ${error}`);
            });
    }, []);

    useEffect(() => {
        const filteredCapstone = project
            .filter((capstone) =>
                capstone.Title.toLowerCase().includes(search.toLowerCase()) ||
                capstone.Author.toLowerCase().includes(search.toLowerCase())
            )
            .filter((capstone) => {
                if (program === '') {
                    return true;
                } else {
                    return capstone.Program.toUpperCase() === program.toUpperCase();
                }
            })
            .filter((capstone) => {
                if (fromYear === '' && toYear === '') {
                    return true;
                } else if (fromYear === '') {
                    return capstone.PublishedYear <= parseInt(toYear);
                } else if (toYear === '') {
                    return capstone.PublishedYear >= parseInt(fromYear);
                } else {
                    return capstone.PublishedYear >= parseInt(fromYear) && capstone.PublishedYear <= parseInt(toYear);
                }
            });

        setFilteredProject(filteredCapstone);
    }, [search, project, program, fromYear, toYear]);

    return (
        <div className='user'>
            <Navbar showLogout={true}/>
            <div className='dash'>
                <h1>CAPSTONE REPOSITORY</h1>
                <div className='searchField'>
                    <input
                        type='text'
                        ref={inputRef}
                        onChange={(e) => setSearch(inputRef.current.value)}
                        className='inputsearch'
                        placeholder='Search for title, author or keywords'
                    />
                    <div className='search-button'>
                        <img src={searchIcon} alt='Search' />
                    </div>
                </div>
            </div>
            <div className='filter-section'>
                <label className='filterLabel'>From:</label>
                <input
                    type='number'
                    className='filterYear'
                    name='fromYear'
                    min='1900'
                    max='2100'
                    placeholder='2020'
                    value={fromYear}
                    onChange={(e) => setFromYear(e.target.value)}
                />
                <label className='filterLabelto'>To:</label>
                <input
                    type='number'
                    className='filterYear'
                    name='toYear'
                    min='1900'
                    max='2100'
                    placeholder='2020'
                    value={toYear}
                    onChange={(e) => setToYear(e.target.value)}
                />
                <label className='filterLabelpro'>Program:</label>
                <select id='program' name='program' className='programFilter' value={program} onChange={(e)=> setProgram(e.target.value)}>
                    <option value=''>None</option>
                    <option value='BSCPE'>BSCPE</option>
                    <option value='BSME'>BSME</option>
                    <option value='BSEE'>BSEE</option>
                </select>
            </div>
            <div className='card-container'>
                {filteredProject.map((individualProject, Id) => (
                    <div className='card' key={Id}>
                        <div className='data-container'>
                            <img src={`http://localhost:3005/images/${individualProject.Image}`} alt='img' />
                        </div>
                        <div className='data'>
                            <h3>{individualProject.Title}</h3>
                            <p>{individualProject.Program}</p>
                            <p>{individualProject.Author}</p>
                            <p>{individualProject.PublishedYear}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDashboard;
