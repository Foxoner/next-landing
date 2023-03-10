import { useEffect, useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

import styles from './Form.module.scss';

function Form({ checkForm }) {
    const [positions, setPositions] = useState([]);
    const [uploadFile, setUploadFile] = useState('Upload your photo');
    const [userData, setUserData] = useState({name:'',
                                            email: '',
                                            phone: '',
                                            position_id: '',
                                            photo: ''});
    
    const formData = new FormData();
    
    useEffect(() => {
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
            .then(res => res.json())
            .then(data => setPositions(data.positions))
            .catch(err => console.log(err))
    },[])

    const fileToLink = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })

    async function onInputImageChange() {
        let userImage = document.querySelector('input[type="file"]');
        setUploadFile(userImage.files[0].name);
        let label = document.querySelector('#label-input');
        // let userImgName = document.querySelector('.imgName');
        let userImgName = document.querySelector('[class*=imgName]');
        let imgDim = await new Promise((resolve, reject) => {
            let img = new Image()
            img.onload = function() {
            resolve ({width: img.width, height: img.height})
            }
            img.src = URL.createObjectURL(userImage.files[0])
        })
        if (userImage.files[0].size <= 5000000 && imgDim.width >= 70 && imgDim.height >= 70) {
            label.classList.remove('label-invalid');
            userImgName.classList.remove('valid', 'invalid');
            userImgName.classList.add('valid');
            document.querySelector('[class*=form-wrapper__file-input-helper]').textContent = '';
            // setUserData({...userData, photo: userImage.files[0]});
            setUserData({...userData, photo: await fileToLink(userImage.files[0])});
        } else {
            label.classList.add('label-invalid');
            userImgName.classList.remove('valid', 'invalid');
            userImgName.classList.add('invalid');
            document.querySelector('.form-wrapper__file-input-helper').textContent = 'Bad image (Need .jpeg; less then 5mb; higher 70*70px)';
        }
    }

    const onSubmit = (e) => {
        const usernameInpt = document.querySelector(`Input[name='user-name']`);
        const userEmailInpt = document.querySelector(`Input[name='user-email']`);
        const userPhoneInpt = document.querySelector(`Input[name='user-phone']`);
        const userImgInpt = document.querySelector('input[type="file"]');
        const fieldList = [usernameInpt, userEmailInpt, userPhoneInpt, userImgInpt];
        const validation = fieldList.filter(item => item.validity.valid === false );
        if (validation.length) {
            return
        } else {
            formData.append('name', userData.name); 
            formData.append('email', userData.email); 
            formData.append('phone', userData.phone); 
            formData.append('position_id', userData.position_id); 
            formData.append('photo', userData.photo);
               
            checkForm(userData)
        }   
    }


    return(
            <div className={styles.Form}>
                <h1>Register Now</h1>
                <div className={styles['form-wrapper']}>
                    <div className={styles['form-wrapper__input-item']}>
                        <Input name='user-name' onChange={(e) => setUserData({...userData, name: e.target.value})} label={'Your name'} helper={''} type='text' required minLength='2' maxLength='60'/>
                    </div>
                    <div className={styles['form-wrapper__input-item']}>
                        <Input name='user-email' onChange={(e) => setUserData({...userData, email: e.target.value})} label={'Email'} helper={''} type='text' required minLength='2' maxLength='100' 
                        />
                    </div>
                    <div className={styles['form-wrapper__input-item']}>
                        <Input name='user-phone' onChange={(e) => setUserData({...userData, phone: `+380${e.target.value}`})} label={'Phone'} helper={'+38 (0XX) XXX - XX - XX'} type='tel' required minLength='9' maxLength='9'/>
                    </div>
                    <p className={styles['form-wrapper__title']}>Select your position</p>
                    <div>
                        { !positions.length ? 
                            <div>Loading...</div> :
                            <div>
                                {positions.map( item => 
                                    <div className={styles['form-wrapper__radio-btn']} key={item.id}>
                                        <input onChange={(e) => setUserData({...userData, position_id: item.name})} type="radio" id={item.id} name="position" value={item.name} required />
                                        <label htmlFor={item.id}>{item.name}</label>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                    <div className={styles['form-wrapper__file-input']}>
                        <label id='label-input' htmlFor="image_input">Upload</label>
                        <input
                        type="file"
                        id="image_input"
                        name="image_input"
                        accept=".jpg, .jpeg"
                        onChange={onInputImageChange}
                        required/>
                        <span className={styles.imgName}>{uploadFile}</span><br/>
                    </div>
                    <div>
                        <p className={styles['form-wrapper__file-input-helper']}></p>
                    </div>
                    <div className={styles['form-wrapper__button']} onClick={onSubmit}>
                        <Button label='Sign up' />
                    </div>
                </div>
            </div>
    )
}

export default Form;