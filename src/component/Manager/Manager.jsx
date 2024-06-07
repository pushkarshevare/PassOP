import React from 'react'
import './style.css'
import { useRef,useState,useEffect } from 'react'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setform] = useState({site:"",username:"",password:""})
    const [PasswordArray, setPasswordArray] = useState([]);

    useEffect(() => {
      let passwords = localStorage.getItem("passwords");
      if (passwords) {
        setPasswordArray(JSON.parse(passwords))
      }
    }, [])
    

    const ref = useRef();
    const passwordRef = useRef();

    const handleChange =(e)=>{
        setform({...form, [e.target.name]: e.target.value})
    }

    const savePass =()=>{
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3 ) {
            setPasswordArray([...PasswordArray,{...form, id: uuidv4()}])
            localStorage.setItem("passwords",JSON.stringify([...PasswordArray,{...form, id: uuidv4()}]))
            console.log([...PasswordArray,form]);
            
        }
        else{
            toast('All Fields are Required....')
        }
    }

    const handlePara =()=>{
        if (ref.current.src.includes("icons/hidden.png")) {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password";
        }
        else{
            ref.current.src ="icons/hidden.png"
            passwordRef.current.type = "text";
        }
    }

    const copyText =(text)=>{
        toast.info('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
            });
        navigator.clipboard.writeText(text)
    }
    
    const deletePass = (id) =>{
        let c = confirm("Are You Sure! You Want Delete");
        if (c) {
            setPasswordArray(PasswordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords",JSON.stringify(PasswordArray.filter(item=>item.id!==id)))
        }
    }
    
    const editPass =(id)=>{
        setform(PasswordArray.filter(item => item.id === id)[0])
        setPasswordArray(PasswordArray.filter(item=>item.id!==id))
        localStorage.setItem("passwords",JSON.stringify(PasswordArray.filter(item=>item.id!==id)))
    }




    return (
            
        <div>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition= "Bounce"
        />
        {/* Same as */}
        <ToastContainer />
            <div className='m-container'>
                <div className="logo">
                    <span>&lt;</span>
                    Pass
                    <span>OP/&gt;</span>
                </div>
                <p>Your Own Password Manager</p>
                <div className="m-content">
                    <input className='f-input' type="text" name='site' placeholder='Website' value={form.site} onChange={handleChange} />
                    <div className="m-content2">
                        <input type="text" name="username" placeholder='Username' value={form.username} onChange={handleChange} />
                        <input ref={passwordRef} type="password" name="password" placeholder='Password' value={form.password} onChange={handleChange} /> 
                        <img ref={ref} src="icons/eye.png" alt="" onClick={handlePara}/>
                    </div>
                    <button onClick={savePass}>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            >
                        </lord-icon>
                        </button>
                </div>
                <div className="passwords">
                    <h2>Your Passwords</h2>
                    {PasswordArray.length === 0 && <div>No Password to Show</div>}
                    {PasswordArray.length != 0 &&
                    <table className='table'>
                        <thead className='table-head'>
                            <tr>
                                <th>Website</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {PasswordArray.map((item,index)=>{
                            return <tr key={index}>
                                <td className='table-data'>
                                    <div className="icon">
                                        <a href={item.site} target='_blank' >{item.site}</a>
                                        <span onClick={()=>{copyText(item.site)}}>
                                         <lord-icon
                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                        trigger="hover"
                                        style={{"width":"20px","height":"20px","paddingLeft":"3px"}}>
                                        </lord-icon>    
                                            
                                        </span>
                                    </div> 
                                </td>
                                <td className='table-data'>
                                <div className="icon" onClick={()=>{copyText(item.username)}}>
                                    {item.username}
                                    <lord-icon
                                    src="https://cdn.lordicon.com/lyrrgrsl.json"
                                    trigger="hover"
                                    style={{"width":"20px","height":"20px","paddingLeft":"3px"}}>
                                    </lord-icon>    
                                </div> </td>
                                <td className='table-data'>
                                    <div className="icon" onClick={()=>{copyText(item.password)}}>
                                        {item.password}
                                        <lord-icon
                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                        trigger="hover"
                                        style={{"width":"20px","height":"20px","paddingLeft":"3px"}}>
                                        </lord-icon>    
                                    </div>
                                </td>
                                <td className='table-data'>
                                <div className="icon">
                                    <span onClick={()=>{editPass(item.id)}}>
                                        <lord-icon
                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                        trigger="hover"
                                        delay="1500"
                                        state="in-trash-empty"
                                        style={{"width":"25px","height":"20px","paddingLeft":"3px"}}>
                                        </lord-icon>      
                                    </span>
                                    <span onClick={()=>deletePass(item.id)}>
                                        <lord-icon
                                        src="https://cdn.lordicon.com/skkahier.json"
                                        trigger="hover"
                                        style={{"width":"25px","height":"20px","paddingLeft":"3px"}}>
                                        </lord-icon>      
                                    </span>
                                </div> </td>
                            </tr>
                        })}
                        </tbody>
                    </table>}
                </div>
            </div>

        </div>
    )
}

export default Manager
