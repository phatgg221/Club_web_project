import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';


const NewTipForm= () =>{
    const router= useRouter();
    const {id}= router.query;

    const [isEditMode, setIsEditMode]= useState(false);
    const [formData, setFormData] = useState({
        tipName: '',
        tipsLink: '',
       realContent:[] 
    })

    const hanldeSubmit= async(event) =>{
        event.preventDefault();

        fetch('/api/sample_api',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response =>{
            if(!response.ok){
                throw new Error ('Network reponse was not ok');
            }

            window.location.href= '/admin/sample/view';

            return response.json();
        })
        .then(data=> console.log('Success: ', data))
        .catch(error => console.error('Error', error));
    };

    const handleInputChange= (evnet)=>{

    }
    return(
        <form onSubmit={hanldeSubmit}>
            <label>
                Tip Name: 
                <input required= {true} type= 'text' name= 'tipName' placeholder={isEditMode? formData.tipName : ''} onChange={handleInputChange}></input>
                
            </label>
            <label>
                Tip Link:
                <input required={true} type ='text' name='tipsLink' placeholder={isEditMode ? formData.tipsLink: ''} onChange={handleInputChange}/>
            </label>
        </form>
    )

   
    
}

NewTipForm.hideLayout= true;
export default NewTipForm;