import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import SidebarNav from '../SidebarNav/SidebarNav'
import book from '../assets/icons8-book-30.png'
import user from '../assets/icons8-user-30.png'
import home from '../assets/icons8-book-30.png'
import lock from '../assets/icons8-lock-30.png'
import search from '../assets/SEARCH.png'
import './CapstoneManagement.css'
import axios from 'axios'

const CapstoneManagement = () => {

    const [data, setData] = useState([])
    const [searchdata, setSearchdata] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [program, setProgram] = useState("")
    const [year, setYear] = useState("")
    const [file, setFile] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:3005/api/projects')
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                alert(`Error fetching data ${error}`)
            })
    }, [])

    const handleSearch = () => {
        if (searchdata === "") {
            alert("Please fill up the search bar first")
        } else {
            const filteredSearchdata = searchdata.toLowerCase();
            const filteredFromdata = data.filter((titleData) => {
                return titleData.Title.toLowerCase().includes(filteredSearchdata)
            });
            if (filteredFromdata.length === 0) {
                alert("NO RECORDS FOUND")
            } else {
                const firstTitle = filteredFromdata[0]
                setTitle(firstTitle.Title)
                setAuthor(firstTitle.Author)
                setProgram(firstTitle.Program)
                setYear(firstTitle.PublishedYear)
                setFile(firstTitle.Image)
            }
        }
    }

    const handleUpload = () => {
        if (title === '' || author === '' || program === '' || year === '' || !file) {
            alert('FILL ALL FIELDS')
        } else {
            const formData = new FormData()
            formData.append("Title", title)
            formData.append("Program", program)
            formData.append("Author", author)
            formData.append("Year", year)
            formData.append("Image", file)
            axios.post('http://localhost:3005/api/upload', formData)
                .then(() => {
                    alert("PROJECT SUCCESSFULLY UPLOADED")
                    setSearchdata("")
                    setTitle("")
                    setAuthor("")
                    setProgram("")
                    setFile("")
                    setYear("")
                })
                .catch(error => {
                    alert(`Error uploading the project ${error}`)
                })
        }
    }

    const handleDelete = () => {
        if (searchdata === '') {
            alert("Please search title of the capstone to delete")
        }else {
            axios.delete('http://localhost:3005/api/delete-project',{
                data: { Title : title}
            })
            .then(()=>{
                setSearchdata("")
                setTitle("")
                setAuthor("")
                setProgram("")
                setFile("")
                setYear("")
            })
            .catch((error)=>{
                alert(`Error deleting project ${error}`)
            })
        }
    }

    return (
        <>
            <Navbar showLogout={true}/>
            <div className='Caps-Mngt'>
                <SidebarNav />
                <div className='caps-crudsection'>
                    <h2>PROJECT MANAGEMENT</h2>
                    <img src={book} alt='book' className='bookIcon' />
                    <input type='text' placeholder='Search project by title' className='caps-searchbar' value={searchdata} onChange={(e) => setSearchdata(e.target.value)} />
                    <div className='searchBackground'>
                        <img src={search} alt='searchIcon' className='caps-searchIcon' onClick={handleSearch} />
                    </div>
                    <div className='caps-flex'>
                        <div className='caps-inputfields'>
                            <label className='caps-label'>TITLE</label>
                            <input type='text' className='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter project title' /><span><img src={book} className='capbookicon' /></span>
                            <label className='caps-label'>AUTHOR</label>
                            <input type='text' className='title' value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='Enter project author' /><span><img src={user} className='capbookicon' /></span>
                            <div>
                                <label>PROGRAM</label>
                                <select className='caps-program' value={program} onChange={(e) => setProgram(e.target.value)}>
                                    <option unselectable=''>--select--</option>
                                    <option>BSCPE</option>
                                    <option>BSEE</option>
                                    <option>BSME</option>
                                    <option>BSECE</option>
                                    <option>BSCE</option>
                                </select>
                                <label className='labelYear'>YEAR PUBLISHED</label>
                                <input type='number' min="1990" max="2050" placeholder='2024' className='caps-year' value={year} onChange={(e) => setYear(e.target.value)} />
                            </div>
                            <label htmlFor='file-upload' className='file-upload-label'>Choose File</label>
                            <input type='file' id='file-upload' className='file-input' onChange={(e) => setFile(e.target.files[0])}  />
                            
                        </div>
                    </div>
                    <div className='caps-button'>
                        <button onClick={handleUpload}>Upload Project</button>
                        <button onClick={handleSearch}>Retrieve Project</button>
                        <button>Update Project</button>
                        <button onClick={handleDelete}>Delete Project</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CapstoneManagement
